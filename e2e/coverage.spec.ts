import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import { signUp } from "./signup";

// Every Word here has a Dictionary Entry in umbrella-api's CEDICT fixture and in the
// full dictionary alike, and an HSK Level of 1, so the counts hold wherever the API
// runs: 6 running Words (我 喜欢 北京 你 喜欢 北京), 4 distinct.
const BODY = "我喜欢北京。你喜欢北京。";

// One Learner for the whole file: signups are rate-limited. Each test adds its own
// Text, but Known Words belong to the Learner, so the tests run in order.
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
