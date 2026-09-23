import { expect, test, type BrowserContext } from "@playwright/test";
import { fontFamily, leadsWith } from "./fonts";
import { signUp } from "./signup";

test("a new Learner's Library is empty and leads to adding a first Text", async ({ page }) => {
  await signUp(page);

  await expect(page.getByRole("heading", { name: "Library", level: 1 })).toBeVisible();
  await page.getByRole("link", { name: "Add your first Text" }).click();

  await expect(page).toHaveURL(/\/space\/texts\/new$/);
  await expect(page.getByRole("heading", { name: "Add a Text", level: 1 })).toBeVisible();
});

const POEM = "春眠不觉晓，\n处处闻啼鸟。\n夜来风雨声，\n花落知多少。";

test("adding a Text lands in it, and the Library lists it", async ({ page }) => {
  await signUp(page);
  await page.goto("/space/texts/new");

  // The paste is set as the Reader will set it, not in the UI sans.
  const box = page.getByLabel("Chinese text");
  expect(await fontFamily(box)).toMatch(leadsWith("Source Serif 4"));

  await page.getByLabel("Title").fill("春晓");
  await box.fill(POEM);
  await page.getByRole("button", { name: "Add to Library" }).click();

  await expect(page).toHaveURL(/\/space\/texts\/[0-9a-f-]{36}$/);
  await expect(page.getByRole("heading", { name: "春晓", level: 1 })).toBeVisible();
  await expect(page.getByText("处处闻啼鸟。")).toBeVisible();

  await page.getByRole("main").getByRole("link", { name: "Library" }).click();
  await expect(page).toHaveURL(/\/space$/);
  await expect(page.getByRole("link", { name: /春晓/ })).toBeVisible();
});

// These two share a Learner, to keep the suite under the API's limit of 10 signups
// a minute. The first adds nothing, so the second still starts from an empty Library.
test.describe("with one Learner", () => {
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

  test("a Text with no Chinese in it is refused before it is sent", async ({ page }) => {
    await page.goto("/space/texts/new");

    let posted = false;
    page.on("request", (request) => {
      if (request.method() === "POST" && request.url().endsWith("/api/v1/texts")) posted = true;
    });

    await page.getByLabel("Chinese text").fill("Just some English.");
    await page.getByRole("button", { name: "Add to Library" }).click();

    await expect(page.getByText("A Text needs a title.")).toBeVisible();
    await expect(page.getByText("A Text needs at least one Chinese character to read.")).toBeVisible();
    await expect(page.getByLabel("Chinese text")).toHaveAttribute("aria-invalid", "true");
    await expect(page).toHaveURL(/\/space\/texts\/new$/);
    expect(posted).toBe(false);
  });

  test("deleting a Text asks first, and says the Marked Words stay", async ({ page }) => {
    await page.goto("/space/texts/new");
    await page.getByLabel("Title").fill("春晓");
    await page.getByLabel("Chinese text").fill(POEM);
    await page.getByRole("button", { name: "Add to Library" }).click();
    await expect(page).toHaveURL(/\/space\/texts\/[0-9a-f-]{36}$/);
    await page.goto("/space");

    const deleteButton = page.getByRole("button", { name: "Delete “春晓”" });
    await deleteButton.click();
    const dialog = page.getByRole("dialog", { name: "Delete “春晓”?" });
    await expect(dialog).toContainText("Your Marked Words stay");

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(deleteButton).toBeFocused();

    await deleteButton.click();
    await dialog.getByRole("button", { name: "Delete Text" }).click();
    await expect(dialog).toBeHidden();
    await expect(page.getByRole("link", { name: "Add your first Text" })).toBeVisible();

    await page.reload();
    await expect(page.getByRole("link", { name: "Add your first Text" })).toBeVisible();
  });
});
