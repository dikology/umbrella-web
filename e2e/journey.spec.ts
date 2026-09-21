import { expect, test } from "@playwright/test";
import { signUp } from "./signup";

// The whole Phase 1 loop, through the UI alone. CEDICT has entries for 喜欢 and 北京,
// 銀行 is written in traditional script (the Marked Word is 银行), and jieba keeps
// 今天天气 whole though CEDICT doesn't know it. Every entry asserted here is in
// umbrella-api's CEDICT fixture, which CI loads.
const TITLE = "在银行";
const BODY = "我在銀行。\n今天天气很好，我喜欢北京。";

// This file's one signup counts toward the API's limit of 10 a minute, which the
// suite as a whole must stay under: it makes 8.

test("paste a Text, tap a Word for its Dictionary Entries, mark it, and keep it after the Text is gone", async ({ page }) => {
  await signUp(page);

  await page.getByRole("link", { name: "Add your first Text" }).click();
  await page.getByLabel("Title").fill(TITLE);
  await page.getByLabel("Chinese text").fill(BODY);
  await page.getByRole("button", { name: "Add to Library" }).click();
  await expect(page).toHaveURL(/\/space\/texts\/[0-9a-f-]{36}$/);

  const text = page.locator('[lang="zh"]').filter({ hasText: "北京" });
  const word = (surface: string) => text.getByRole("button", { name: surface, exact: true });
  await expect(text).toHaveText(BODY);

  await word("喜欢").click();
  await expect(page.getByRole("dialog", { name: "喜欢" })).toContainText("to like; to be fond of");

  await word("今天天气").click();
  await expect(page.getByRole("dialog", { name: "今天天气" })).toContainText("Not in the dictionary as a whole");

  await word("銀行").click();
  const card = page.getByRole("dialog", { name: "銀行" });
  await expect(card).toContainText("yín háng");
  await expect(card).toContainText("bank");
  await card.getByRole("button", { name: "Mark" }).click();
  await expect(word("銀行")).toHaveAccessibleDescription("Marked Word");

  await page.reload();
  await expect(word("銀行")).toHaveAccessibleDescription("Marked Word");
  await expect(word("喜欢")).not.toHaveAccessibleDescription("Marked Word");

  await page.getByRole("navigation").getByRole("link", { name: "Marked Words" }).click();
  await expect(page).toHaveURL(/\/space\/words$/);
  const toggleName = { name: /^银行/ };
  const row = page
    .getByRole("list", { name: "Marked Words" })
    .getByRole("listitem")
    .filter({ has: page.getByRole("button", toggleName) });
  const toggle = row.getByRole("button", toggleName);
  await expect(row).toContainText("yín háng");
  await toggle.click();
  const sighting = row.getByRole("listitem").first();
  await expect(sighting).toContainText("我在銀行。");
  await expect(sighting.locator("mark")).toHaveText("銀行");
  await expect(sighting.getByRole("link", { name: TITLE })).toBeVisible();

  await page.getByRole("navigation").getByRole("link", { name: "Library" }).click();
  await page.getByRole("button", { name: `Delete “${TITLE}”` }).click();
  await page.getByRole("dialog", { name: `Delete “${TITLE}”?` }).getByRole("button", { name: "Delete Text" }).click();
  await expect(page.getByRole("link", { name: "Add your first Text" })).toBeVisible();

  await page.getByRole("navigation").getByRole("link", { name: "Marked Words" }).click();
  await toggle.click();
  await expect(sighting).toContainText("我在銀行。");
  await expect(sighting).toContainText("From a deleted Text");
  await expect(sighting.getByRole("link")).toHaveCount(0);
});
