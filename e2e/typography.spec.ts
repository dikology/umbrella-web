import { expect, test } from "@playwright/test";
import { fontFamily, leadsWith } from "./fonts";

test.describe("the landing page sets the DESIGN.md typefaces", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("the font tokens resolve at the document root", async ({ page }) => {
    const tokens = await page.evaluate(() =>
      ["--font-display", "--font-body", "--font-ui", "--font-han"].map((token) =>
        getComputedStyle(document.documentElement).getPropertyValue(token).trim(),
      ),
    );
    for (const value of tokens) expect(value).not.toBe("");
  });

  test("headlines are Crimson Pro, body copy Source Serif 4, and buttons Inter", async ({ page }) => {
    const hero = page.locator("#hero");

    expect(await fontFamily(hero.locator("h1"))).toMatch(leadsWith("Crimson Pro"));
    expect(await fontFamily(hero.locator("p").first())).toMatch(leadsWith("Source Serif 4"));
    expect(await fontFamily(hero.getByRole("button", { name: "View Features" }))).toMatch(leadsWith("Inter"));
  });

  test("a control that asks for another face keeps it", async ({ page }) => {
    // The wordmark is a <button>, but it is set in the display face.
    const wordmark = page.getByRole("navigation").getByRole("button", { name: "Umbrella" });
    expect(await fontFamily(wordmark)).toMatch(leadsWith("Crimson Pro"));
  });
});
