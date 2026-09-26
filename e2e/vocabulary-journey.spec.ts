import { expect, test, type Page } from "@playwright/test";
import { signUp } from "./signup";

// The Known Words loop, through the UI alone: declare, read, mark, finish, unmark.
// Every Word here has a Dictionary Entry in umbrella-api's CEDICT fixture, which CI
// loads, so all 6 running Words (我 在 銀行 我 喜欢 上海) count toward Coverage. With
// HSK 1 declared, 我 在 喜欢 are Known; 银行 is HSK 2 and 上海 is in no HSK Level.
const TITLE = "去上海";
const BODY = "我在銀行。我喜欢上海。";

// This file's one signup counts toward the API's limit of 10 a minute, which the
// suite as a whole must stay under: it makes 10.

const nav = (page: Page) => page.getByRole("navigation", { name: "Learner Space" });
const vocabulary = (page: Page) => page.getByRole("region", { name: "Vocabulary" });
const level = (page: Page, name: string) =>
  page.getByRole("list", { name: "HSK Levels" }).getByRole("listitem").filter({ hasText: name });
const count = (n: number) => n.toLocaleString("en");

test("declare HSK 1, read a Text, mark a Word, finish it, and watch the Vocabulary grow", async ({ page }) => {
  await signUp(page);

  // 1. Declaring HSK 1 makes every HSK 1 Word Known, and nothing more.
  await page
    .getByRole("region", { name: "Roughly which HSK Level have you reached?" })
    .getByRole("button", { name: "HSK 1" })
    .click();
  await expect(page.getByText("Declared Level: HSK 1")).toBeVisible();

  await nav(page).getByRole("link", { name: "Progress" }).click();
  await expect(page.getByRole("list", { name: "HSK Levels" })).toBeVisible();
  // Each level's size is the syllabus's, whichever one the API loaded.
  const { hsk_levels } = await (await page.request.get("/api/v1/progress")).json();
  const [hsk1, hsk2] = hsk_levels.map((l: { size: number }) => l.size);
  await expect(vocabulary(page)).toContainText(`${count(hsk1)} Known Words`);
  await expect(vocabulary(page)).toContainText(`${count(hsk1)} of them declared`);
  await expect(level(page, "HSK 1")).toContainText(`${count(hsk1)} of ${count(hsk1)} Known`);
  await expect(level(page, "HSK 2")).toContainText(`0 of ${count(hsk2)} Known`);

  // 2. A pasted Text shows its Coverage in the Library: 4 of 6 running Words.
  await nav(page).getByRole("link", { name: "Library" }).click();
  await page.getByRole("link", { name: "Add your first Text" }).click();
  await page.getByLabel("Title").fill(TITLE);
  await page.getByLabel("Chinese text").fill(BODY);
  await page.getByRole("button", { name: "Add to Library" }).click();
  await expect(page).toHaveURL(/\/space\/texts\/[0-9a-f-]{36}$/);

  await nav(page).getByRole("link", { name: "Library" }).click();
  const listed = page.getByRole("listitem").filter({ hasText: TITLE });
  await expect(listed).toContainText("66% Coverage · too hard");
  await expect(listed).not.toContainText("Finished");

  // 3. Marking a declared Word takes it out of the Known: 3 of 6.
  await listed.getByRole("link", { name: new RegExp(TITLE) }).click();
  const text = page.locator('[lang="zh"]').filter({ hasText: "上海" });
  const word = (surface: string) => text.getByRole("button", { name: surface, exact: true });
  const coverage = page.locator("article header").getByRole("status");
  await expect(coverage).toHaveText("66% Coverage · too hard");

  await word("喜欢").click();
  await page.getByRole("dialog", { name: "喜欢" }).getByRole("button", { name: "Mark" }).click();
  await expect(word("喜欢")).toHaveAccessibleDescription("Marked Word");
  await expect(coverage).toHaveText("50% Coverage · too hard");
  await page.keyboard.press("Escape");

  // 4. Finishing makes the two Words not yet Known Known, and leaves 喜欢 marked: 5 of 6.
  const finishing = page.getByRole("region", { name: "Finish this Text" });
  await finishing.getByRole("button", { name: "Finish", exact: true }).click();
  await expect(finishing.getByRole("status")).toHaveText("Finished. 2 Words became Known.");
  await expect(coverage).toHaveText("83% Coverage · too hard");

  await nav(page).getByRole("link", { name: "Library" }).click();
  await expect(listed).toContainText("83% Coverage · too hard");
  await expect(listed).toContainText(/Finished \w+/);

  // 5. The Vocabulary grew by what was read, less what was marked.
  await nav(page).getByRole("link", { name: "Progress" }).click();
  await expect(vocabulary(page)).toContainText(`${count(hsk1 + 1)} Known Words`);
  await expect(vocabulary(page)).toContainText(`${count(hsk1 - 1)} of them declared`);
  await expect(level(page, "HSK 1")).toContainText(`${count(hsk1 - 1)} of ${count(hsk1)} Known`);
  await expect(level(page, "HSK 2")).toContainText(`1 of ${count(hsk2)} Known`);
  await expect(page.getByText("1 Text finished")).toBeVisible();
  await expect(page.getByText("1 Word marked")).toBeVisible();

  // 6. Unmarking 喜欢 makes it Known again, read rather than declared.
  await nav(page).getByRole("link", { name: "Marked Words" }).click();
  await page.getByRole("button", { name: "Unmark 喜欢" }).click();
  await expect(page.getByRole("button", { name: "Undo" })).toHaveAccessibleDescription(
    "Unmarked 喜欢. It’s a Known Word now.",
  );

  // The unmark is held until the Learner leaves, and races Progress's first read.
  const unmarked = page.waitForResponse(
    (response) => response.request().method() === "DELETE" && response.url().includes("/marked-words/"),
  );
  await nav(page).getByRole("link", { name: "Progress" }).click();
  expect((await unmarked).ok()).toBe(true);
  await page.reload();

  await expect(vocabulary(page)).toContainText(`${count(hsk1 + 2)} Known Words`);
  await expect(level(page, "HSK 1")).toContainText(`${count(hsk1)} of ${count(hsk1)} Known`);
  await expect(page.getByText("0 Words marked")).toBeVisible();
});
