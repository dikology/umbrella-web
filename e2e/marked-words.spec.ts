import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import { signUp } from "./signup";

// One Learner for the whole file, like the Reader's: signups are rate-limited. The
// tests run in order and each marks Words no other test marks, except where noted.
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

/** Adds a Text through the API and marks the named Words in it, in that order. */
async function markIn(page: Page, title: string, body: string, words: string[]) {
  const added = await page.request.post("/api/v1/texts", { data: { title, body } });
  expect(added.ok()).toBe(true);
  const { id } = await added.json();
  const opened = await (await page.request.get(`/api/v1/texts/${id}`)).json();
  for (const word of words) {
    const segment = opened.segments.find((s: { simplified: string | null }) => s.simplified === word);
    const marked = await page.request.post("/api/v1/marked-words", { data: { segment_id: segment.id } });
    expect(marked.ok()).toBe(true);
  }
  return id as string;
}

const row = (page: Page, word: string) =>
  page.getByRole("listitem").filter({ has: page.getByRole("button", { name: new RegExp(`^${word}`) }) });

test("with nothing marked, the page points back to the Library and the Reader", async ({ page }) => {
  await page.goto("/space");
  await page.getByRole("navigation").getByRole("link", { name: "Marked Words" }).click();

  await expect(page).toHaveURL(/\/space\/words$/);
  await expect(page.getByRole("heading", { name: "Marked Words", level: 1 })).toBeVisible();
  await expect(page.getByRole("navigation").getByRole("link", { name: "Marked Words" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await page.getByRole("link", { name: "Go to your Library" }).click();
  await expect(page).toHaveURL(/\/space$/);
});

test("Marked Words are listed newest first, and open onto their Sightings", async ({ page }) => {
  const id = await markIn(page, "北京", "我爱北京。北京很大。", ["北京"]);
  await markIn(page, "喜欢", "我喜欢看书。", ["喜欢"]);
  await page.goto("/space/words");

  const words = page.getByRole("list", { name: "Marked Words" }).getByRole("listitem");
  await expect(words.first()).toContainText("喜欢");
  await expect(words.first()).toContainText("xǐ huan");
  await expect(words.first()).toContainText("to like; to be fond of");
  await expect(words.nth(1)).toContainText("北京");

  const toggle = row(page, "北京").getByRole("button", { name: /^北京/ });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");

  const sighting = row(page, "北京").getByRole("listitem").first();
  await expect(sighting).toContainText("我爱北京。");
  await expect(sighting.locator("mark")).toHaveText("北京");
  await sighting.getByRole("link", { name: "北京" }).click();
  await expect(page).toHaveURL(new RegExp(`/space/texts/${id}$`));
});

test("a Sighting outlives its Text, and says the Text is gone", async ({ page }) => {
  const id = await markIn(page, "学生", "他是学生。", ["学生"]);
  expect((await page.request.delete(`/api/v1/texts/${id}`)).ok()).toBe(true);
  await page.goto("/space/words");

  await row(page, "学生").getByRole("button", { name: /^学生/ }).click();
  const sighting = row(page, "学生").getByRole("listitem").first();
  await expect(sighting).toContainText("他是学生。");
  await expect(sighting).toContainText("From a deleted Text");
  await expect(sighting.getByRole("link")).toHaveCount(0);
});

async function markedOnServer(page: Page) {
  const { marked_words } = await (await page.request.get("/api/v1/marked-words")).json();
  return marked_words.map((w: { simplified: string }) => w.simplified) as string[];
}

test("unmarking can be undone, and is sent once the Learner moves on", async ({ page }) => {
  await markIn(page, "天气", "我们去公园吧。天气很好。", ["天气", "公园"]);
  await page.goto("/space/words");

  await row(page, "天气").getByRole("button", { name: "Unmark 天气" }).click();
  await expect(page.getByRole("button", { name: "Undo" })).toBeFocused();
  await expect(page.getByRole("button", { name: "Undo" })).toHaveAccessibleDescription("Unmarked 天气");
  await page.getByRole("button", { name: "Undo" }).click();
  await expect(row(page, "天气").getByRole("button", { name: "Unmark 天气" })).toBeFocused();
  expect(await markedOnServer(page)).toContain("天气");

  // Unmarking a second Word sends the first.
  await row(page, "天气").getByRole("button", { name: "Unmark 天气" }).click();
  await row(page, "公园").getByRole("button", { name: "Unmark 公园" }).click();
  await expect.poll(() => markedOnServer(page)).not.toContain("天气");
  expect(await markedOnServer(page)).toContain("公园");

  // Leaving the page sends the one still held.
  await page.getByRole("navigation").getByRole("link", { name: "Library" }).click();
  await expect(page).toHaveURL(/\/space$/);
  await expect.poll(() => markedOnServer(page)).not.toContain("公园");
});

test("an unmark still held lands before a Sighting's Text opens in the Reader", async ({ page }) => {
  await markIn(page, "学校", "我们的学校很大。大家都很友好。", ["友好", "学校"]);
  await page.goto("/space/words");

  await row(page, "友好").getByRole("button", { name: "Unmark 友好" }).click();
  await row(page, "学校").getByRole("button", { name: /^学校/ }).click();
  await row(page, "学校").getByRole("link", { name: "学校" }).click();

  await expect(page).toHaveURL(/\/space\/texts\/[0-9a-f-]{36}$/);
  const text = page.locator('[lang="zh"]').filter({ hasText: "友好" });
  await expect(text.getByRole("button", { name: "学校", exact: true })).toHaveAccessibleDescription("Marked Word");
  await expect(text.getByRole("button", { name: "友好", exact: true })).not.toHaveAccessibleDescription("Marked Word");
});

test("an unmark the API refuses brings the Word back, and says so", async ({ page }) => {
  await markIn(page, "朋友", "我的朋友很好。老师来了。", ["朋友", "老师"]);
  await page.goto("/space/words");
  await page.route("**/api/v1/marked-words/*", (route) => route.fulfill({ status: 503, body: "" }));

  await row(page, "朋友").getByRole("button", { name: "Unmark 朋友" }).click();
  await row(page, "老师").getByRole("button", { name: "Unmark 老师" }).click();

  await expect(row(page, "朋友").getByRole("alert")).toContainText("Couldn’t unmark this Word");
  await expect(row(page, "朋友").getByRole("button", { name: "Unmark 朋友" })).toBeVisible();
});
