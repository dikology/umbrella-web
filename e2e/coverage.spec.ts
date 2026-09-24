import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import { signUp } from "./signup";

// Every Word here has a Dictionary Entry in umbrella-api's CEDICT fixture and in the
// full dictionary alike, and an HSK Level of 1, so the counts hold wherever the API
// runs: 6 running Words (我 喜欢 北京 你 喜欢 北京), 4 distinct.
const BODY = "我喜欢北京。你喜欢北京。";

// One Learner for the whole file: signups are rate-limited, and the suite is at the
// API's limit of 10 a minute. Each test adds its own Text, but Known Words belong to
// the Learner, so the tests run in order. The Progress page is tested here too, on
// the same Learner: empty before anything is finished, and against the API after.
test.describe.configure({ mode: "serial" });

let cookies: Awaited<ReturnType<BrowserContext["cookies"]>>;

test.beforeAll(async ({ browser }) => {
  const page = await browser.newPage();
  await signUp(page);
  cookies = await page.context().cookies();
  await page.close();
});

test.beforeEach(async ({ page }) => {
  await page.context().addCookies(cookies);
});

async function openNewText(page: Page, title: string) {
  const added = await page.request.post("/api/v1/texts", { data: { title, body: BODY } });
  expect(added.ok()).toBe(true);
  const { id } = await added.json();
  await page.goto(`/space/texts/${id}`);
  await expect(text(page)).toBeVisible();
  return id as string;
}

const text = (page: Page) => page.locator('[lang="zh"]').filter({ hasText: "你喜欢" });
const word = (page: Page, surface: string) => text(page).getByRole("button", { name: surface, exact: true });
// The live Coverage in the Reader's header; the one by the Finish button repeats it quietly.
const coverage = (page: Page) => page.locator("article header").getByRole("status");
const finishing = (page: Page) => page.getByRole("region", { name: "Finish this Text" });

const nav = (page: Page) => page.getByRole("navigation", { name: "Learner Space" });

test("before anything is declared or finished, Progress points the Learner to the Library", async ({ page }) => {
  await page.goto("/space");
  await nav(page).getByRole("link", { name: "Progress" }).click();

  await expect(page).toHaveURL(/\/space\/progress$/);
  await expect(page.getByRole("heading", { name: "Progress", level: 1 })).toBeVisible();
  await expect(nav(page).getByRole("link", { name: "Progress" })).toHaveAttribute("aria-current", "page");
  await expect(page.getByRole("heading", { name: "Your Vocabulary starts with your first Text." })).toBeVisible();

  await page.getByRole("link", { name: "Go to your Library" }).click();
  await expect(page).toHaveURL(/\/space$/);
});

test("a Word's HSK Level shows in its popover", async ({ page }) => {
  await openNewText(page, "HSK");
  await word(page, "喜欢").first().click();
  await expect(page.getByRole("dialog", { name: "喜欢" })).toContainText("HSK 1");
});

test("finishing a Text makes its Words Known, says how many, and remembers when", async ({ page }) => {
  await openNewText(page, "第一次");
  await expect(coverage(page)).toHaveText("0% Coverage · too hard");
  await expect(finishing(page)).toContainText("Every Word you haven’t Marked becomes Known.");
  await expect(finishing(page)).not.toContainText("Last finished");

  await finishing(page).getByRole("button", { name: "Finish", exact: true }).click();

  await expect(finishing(page).getByRole("status")).toHaveText("Finished. 4 Words became Known.");
  await expect(coverage(page)).toHaveText("100% Coverage · comfortable");
  await expect(finishing(page)).toContainText("Last finished");
  await expect(finishing(page).getByRole("button", { name: "Finish again" })).toBeVisible();

  await page.reload();
  await expect(coverage(page)).toHaveText("100% Coverage · comfortable");
  await expect(finishing(page)).toContainText("Last finished");
});

test("Coverage follows each mark and unmark at once, without asking the API", async ({ page }) => {
  // The Words were made Known by the last test's finish.
  await openNewText(page, "第二次");
  await expect(coverage(page)).toHaveText("100% Coverage · comfortable");

  const reads: string[] = [];
  page.on("request", (request) => {
    if (request.method() === "GET" && request.url().includes("/api/v1/")) reads.push(request.url());
  });

  // 北京 runs twice of 6: 4 of 6 is 66%, not rounded up to 67%.
  // Coverage changes before the API answers; the answer is awaited only so the
  // next test starts from the marks this one leaves behind.
  const answered = (method: string) =>
    page.waitForResponse((response) => response.request().method() === method && response.url().includes("/marked-words"));

  await word(page, "北京").first().click();
  const marking = answered("POST");
  await page.getByRole("dialog", { name: "北京" }).getByRole("button", { name: "Mark" }).click();
  await expect(coverage(page)).toHaveText("66% Coverage · too hard");
  await marking;

  const unmarking = answered("DELETE");
  await page.getByRole("dialog", { name: "北京" }).getByRole("button", { name: "Unmark" }).click();
  await expect(coverage(page)).toHaveText("100% Coverage · comfortable");
  await unmarking;
  expect(reads).toEqual([]);
});

test("a finish the API refuses says so, and changes nothing", async ({ page }) => {
  await openNewText(page, "第三次");
  await page.route("**/api/v1/texts/*/finishings", (route) => route.fulfill({ status: 503, body: "" }));

  await finishing(page).getByRole("button", { name: "Finish", exact: true }).click();

  await expect(finishing(page).getByRole("alert")).toHaveText("Couldn’t finish this Text. Please try again.");
  await expect(finishing(page)).not.toContainText("Last finished");
});

test("the Library shows each Text's Coverage, and when it was finished", async ({ page }) => {
  await page.goto("/space");

  const finished = page.getByRole("listitem").filter({ hasText: "第一次" });
  await expect(finished).toContainText("100% Coverage · comfortable");
  await expect(finished).toContainText(/Finished \w+/);

  const unfinished = page.getByRole("listitem").filter({ hasText: "第三次" });
  await expect(unfinished).toContainText("100% Coverage · comfortable");
  await expect(unfinished).not.toContainText("Finished");
});

test("Marked Words show their HSK Level, and unmarking says the Word becomes Known", async ({ page }) => {
  await openNewText(page, "第四次");
  await word(page, "北京").first().click();
  await page.getByRole("dialog", { name: "北京" }).getByRole("button", { name: "Mark" }).click();
  await expect(word(page, "北京").first()).toHaveAccessibleDescription("Marked Word");

  await page.goto("/space/words");
  const row = page.getByRole("list", { name: "Marked Words" }).getByRole("listitem").first();
  await expect(row).toContainText("北京");
  await expect(row).toContainText("HSK 1");

  await page.getByRole("button", { name: "Unmark 北京" }).click();
  await expect(page.getByRole("button", { name: "Undo" })).toHaveAccessibleDescription(
    "Unmarked 北京. It’s a Known Word now.",
  );
});

test("Progress reads each HSK Level as Known against its size, beside what was finished and marked", async ({ page }) => {
  expect((await page.request.put("/api/v1/me/declared-level", { data: { level: 1 } })).ok()).toBe(true);
  await page.goto("/space/progress");

  // Everything became Known today, and one day is not a line yet.
  const vocabulary = page.getByRole("region", { name: "Vocabulary" });
  await expect(vocabulary).toContainText("of them declared");
  await expect(vocabulary).toContainText("Your Vocabulary’s line starts today.");
  await expect(vocabulary.getByRole("figure")).toHaveCount(0);

  const { hsk_levels, texts_finished, words_marked } = await (await page.request.get("/api/v1/progress")).json();
  const levels = page.getByRole("list", { name: "HSK Levels" }).getByRole("listitem");
  await expect(levels).toHaveCount(7);
  const names = ["HSK 1", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6", "Advanced"];
  for (const [i, { known, size }] of hsk_levels.entries()) {
    await expect(levels.nth(i)).toContainText(names[i]);
    await expect(levels.nth(i)).toContainText(`${known.toLocaleString("en")} of ${size.toLocaleString("en")} Known`);
  }

  expect(texts_finished).toBeGreaterThan(0);
  await expect(page.getByText(`${texts_finished} ${texts_finished === 1 ? "Text" : "Texts"} finished`)).toBeVisible();
  await expect(page.getByText(`${words_marked} ${words_marked === 1 ? "Word" : "Words"} marked`)).toBeVisible();
  // Known against each level's size, never a verdict on the Learner.
  await expect(page.getByText(/You are HSK/i)).toHaveCount(0);
});

// For the Progress page, a history no new Learner has yet, standing in for the API's
// answer: HSK 1 declared on the first day, raised to HSK 3 on the fourth, and reading
// throughout.
const history = {
  vocabulary: [
    { date: "2026-09-01", known: 300, declared: 300 },
    { date: "2026-09-02", known: 300, declared: 300 },
    { date: "2026-09-03", known: 342, declared: 300 },
    { date: "2026-09-04", known: 1240, declared: 812 },
    { date: "2026-09-05", known: 1310, declared: 812 },
  ],
  hsk_levels: [
    { level: 1, known: 300, size: 300 },
    { level: 2, known: 200, size: 200 },
    { level: 3, known: 312, size: 500 },
    { level: 4, known: 0, size: 1000 },
    { level: 5, known: 0, size: 1071 },
    { level: 6, known: 0, size: 1140 },
    { level: "advanced", known: 0, size: 5636 },
  ],
  texts_finished: 3,
  words_marked: 41,
};

test("the Vocabulary is drawn over time, with its declared part set apart from reading", async ({ page }) => {
  let asked: URL | undefined;
  await page.route(/\/api\/v1\/progress\?/, (route) => {
    asked = new URL(route.request().url());
    return route.fulfill({ json: history });
  });
  await page.goto("/space/progress");

  const vocabulary = page.getByRole("region", { name: "Vocabulary" });
  await expect(vocabulary).toContainText("1,310 Known Words");
  await expect(vocabulary).toContainText("812 of them declared");
  // Days are counted where the Learner is.
  expect(asked?.searchParams.get("tz")).toBe(await page.evaluate(() => Intl.DateTimeFormat().resolvedOptions().timeZone));

  const chart = vocabulary.getByRole("figure");
  await expect(chart.locator("svg.recharts-surface")).toBeVisible();
  // Identity never rests on color alone: both parts are named beside their marks.
  await expect(chart).toContainText("Known Words");
  await expect(chart).toContainText("Declared");
  // And the band names itself where it lies, not only in the legend.
  await expect(chart.locator("svg.recharts-surface")).toContainText("Declared");

  // Every day is reachable without hovering.
  await chart.getByText("Show as a table").click();
  const rows = chart.getByRole("table").getByRole("row");
  await expect(rows).toHaveCount(history.vocabulary.length + 1);
  await expect(rows.last()).toContainText("1,310");
  await expect(rows.last()).toContainText("812");

  // Hovering a day reads its values out.
  const plot = chart.locator("svg.recharts-surface");
  const box = (await plot.boundingBox())!;
  await page.mouse.move(box.x + box.width - 20, box.y + box.height / 2);
  await expect(chart.locator(".recharts-tooltip-wrapper")).toContainText("1,310");
});

test("a Progress that doesn't load says so, and tries again", async ({ page }) => {
  let failing = true;
  await page.route(/\/api\/v1\/progress\?/, (route) =>
    failing ? route.fulfill({ status: 503, body: "" }) : route.fulfill({ json: history }),
  );
  await page.goto("/space/progress");

  await expect(page.getByRole("alert").filter({ hasText: "Your Progress didn’t load" })).toBeVisible();
  failing = false;
  await page.getByRole("button", { name: "Try again" }).click();
  await expect(page.getByRole("region", { name: "Vocabulary" })).toContainText("1,310 Known Words");
});

test("a Learner who finished Texts but marked every Word sees an empty Vocabulary, not a line about to start", async ({ page }) => {
  await page.route(/\/api\/v1\/progress\?/, (route) =>
    route.fulfill({ json: { ...history, vocabulary: [], texts_finished: 2, words_marked: 9 } }),
  );
  await page.goto("/space/progress");

  const vocabulary = page.getByRole("region", { name: "Vocabulary" });
  await expect(vocabulary).toContainText("0 Known Words");
  await expect(vocabulary).not.toContainText("starts today");
  await expect(vocabulary.getByRole("figure")).toHaveCount(0);
  await expect(page.getByText("2 Texts finished")).toBeVisible();
  await expect(page.getByText("9 Words marked")).toBeVisible();
});
