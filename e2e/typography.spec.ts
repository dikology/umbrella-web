import { expect, test, type Locator } from "@playwright/test";

// The DESIGN.md faces resolve by name. This checks the declared family chain,
// not glyph metrics, so it holds whether or not the webfont has finished loading.
const family = (locator: Locator) => locator.evaluate((el) => getComputedStyle(el).fontFamily);

test.describe("the landing page sets the DESIGN.md typefaces", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("the font tokens resolve at the document root", async ({ page }) => {
    const body = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue("--font-body").trim(),
    );
    expect(body).not.toBe("");
  });

  test("headlines are Crimson Pro, body copy Source Serif 4, and buttons Inter", async ({ page }) => {
    const hero = page.locator("#hero");

    expect(await family(hero.locator("h1"))).toMatch(/^"?Crimson Pro"?,/);
    expect(await family(hero.locator("p").first())).toMatch(/^"?Source Serif 4"?,/);
    expect(await family(hero.getByRole("button", { name: "View Features" }))).toMatch(/^"?Inter"?,/);
  });

  test("a control that asks for another face keeps it", async ({ page }) => {
    // The wordmark is a <button>, but it is set in the display face.
    const wordmark = page.getByRole("navigation").getByRole("button", { name: "Umbrella" });
    expect(await family(wordmark)).toMatch(/^"?Crimson Pro"?,/);
  });
});
