import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import { signUp } from "./signup";

// 春天 appears twice, so a mark has two places to show. 春眠 is a Word CEDICT
// doesn't know as a whole, so it comes with its parts' entries instead.
const BODY = "春天来了。\n北京大学生喜欢春天。春眠不觉晓。";

// One Learner for the whole file: signups are rate-limited, and the suite as a
// whole must stay under the API's limit. Each test adds its own Text, and no two
// tests mark the same Word, so sharing the Learner shares no state that matters.
let cookies: Awaited<ReturnType<BrowserContext["cookies"]>>;

test.beforeAll(async ({ browser }) => {
  const page = await browser.newPage();
  await signUp(page);
  cookies = await page.context().cookies();
  await page.close();
});

async function openNewText(page: Page) {
  await page.context().addCookies(cookies);
  await page.goto("/space/texts/new");
  await page.getByLabel("Title").fill("春天");
  await page.getByLabel("Chinese text").fill(BODY);
  await page.getByRole("button", { name: "Add to Library" }).click();
  await expect(page).toHaveURL(/\/space\/texts\/[0-9a-f-]{36}$/);
}

const text = (page: Page) => page.locator('[lang="zh"]').filter({ hasText: "北京" });
const word = (page: Page, surface: string) => text(page).getByRole("button", { name: surface, exact: true });

test("the Reader sets the Text as written, with its Words tappable and nothing else", async ({ page }) => {
  await openNewText(page);

  await expect(text(page)).toHaveText(BODY);
  await expect(word(page, "北京")).toBeVisible();
  await expect(word(page, "春天")).toHaveCount(2);
  await expect(text(page).getByRole("button", { name: "。" })).toHaveCount(0);
  await expect(page.getByText(/CC-CEDICT/)).toBeVisible();
});

test("tapping a Word shows its Dictionary Entries without asking the API, and never marks it", async ({ page }) => {
  await openNewText(page);

  const calls: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("/api/v1/")) calls.push(`${request.method()} ${request.url()}`);
  });

  await word(page, "喜欢").click();
  const card = page.getByRole("dialog", { name: "喜欢" });
  await expect(card).toContainText("xǐ huan");
  await expect(card).toContainText("to like; to be fond of");
  await expect(card).toContainText("喜歡");

  await word(page, "春眠").click();
  const parts = page.getByRole("dialog", { name: "春眠" });
  await expect(parts).toContainText("Not in the dictionary as a whole");
  await expect(parts).toContainText("眠");

  expect(calls).toEqual([]);
  await page.reload();
  await expect(word(page, "喜欢")).not.toHaveAccessibleDescription("Marked Word");
});

test("marking a Word highlights it everywhere at once, keeps it marked, and unmarking undoes it", async ({ page }) => {
  await openNewText(page);

  await word(page, "春天").first().click();
  await page.getByRole("dialog", { name: "春天" }).getByRole("button", { name: "Mark" }).click();
  for (const instance of await word(page, "春天").all()) {
    await expect(instance).toHaveAccessibleDescription("Marked Word");
  }
  await expect(page.getByRole("dialog", { name: "春天" }).getByRole("button", { name: "Unmark" })).toBeVisible();

  await page.reload();
  await expect(word(page, "春天").last()).toHaveAccessibleDescription("Marked Word");

  await word(page, "春天").last().click();
  await page.getByRole("dialog", { name: "春天" }).getByRole("button", { name: "Unmark" }).click();
  await expect(word(page, "春天").first()).not.toHaveAccessibleDescription("Marked Word");

  await page.reload();
  await expect(word(page, "春天").first()).not.toHaveAccessibleDescription("Marked Word");
});

test("Words are reachable by keyboard: Enter opens, Escape closes and returns focus", async ({ page }) => {
  await openNewText(page);

  await word(page, "北京").focus();
  await page.keyboard.press("Enter");
  const card = page.getByRole("dialog", { name: "北京" });
  await expect(card).toBeFocused();
  await expect(word(page, "北京")).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Tab");
  await expect(card.getByRole("button", { name: "Mark" })).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(card).toBeHidden();
  await expect(word(page, "北京")).toBeFocused();

  // Tabbing out of an open card closes it, even onto another Word.
  await page.keyboard.press("Enter");
  await expect(card).toBeVisible();
  await page.keyboard.press("Shift+Tab");
  await expect(card).toBeHidden();
  await expect(word(page, "北京")).toHaveAttribute("aria-expanded", "false");
});

test("on a phone, a Word's Dictionary Entries open as a sheet across the bottom", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openNewText(page);

  await word(page, "北京").click();
  const sheet = page.getByRole("dialog", { name: "北京" });
  // Polled, because the sheet rises into place.
  await expect.poll(async () => {
    const box = await sheet.boundingBox();
    return box && { width: Math.round(box.width), bottom: Math.round(box.y + box.height) };
  }).toEqual({ width: 390, bottom: 844 });
});

test("a mark the API refuses is taken back, and the card says so", async ({ page }) => {
  await openNewText(page);
  await page.route("**/api/v1/marked-words", (route) => route.fulfill({ status: 503, body: "" }));

  await word(page, "北京").click();
  const card = page.getByRole("dialog", { name: "北京" });
  await card.getByRole("button", { name: "Mark" }).click();

  await expect(card.getByRole("alert")).toHaveText("Couldn’t mark this Word. Please try again.");
  await expect(word(page, "北京")).not.toHaveAccessibleDescription("Marked Word");
  await expect(card.getByRole("button", { name: "Mark" })).toBeVisible();
});
