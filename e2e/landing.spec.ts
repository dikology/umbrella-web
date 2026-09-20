import { expect, test } from "@playwright/test";

// Pure landing-page navigation: unlike auth.spec.ts this never posts to the
// API, so it runs against Next alone.
test.describe("landing page CTAs", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("the hero's primary CTA goes to signup", async ({ page }) => {
    await page
      .locator("#hero")
      .getByRole("link", { name: "Create your account" })
      .click();

    await expect(page).toHaveURL(/\/signup$/);
  });

  test("the closing CTA section's primary CTA goes to signup", async ({ page }) => {
    await page
      .locator("#cta")
      .getByRole("link", { name: "Create your account" })
      .click();

    await expect(page).toHaveURL(/\/signup$/);
  });

  test("the nav CTA goes to signup", async ({ page }) => {
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Sign up" })
      .click();

    await expect(page).toHaveURL(/\/signup$/);
  });

  test("no CTA is a dead stub", async ({ page }) => {
    // Every remaining call to action either navigates or scrolls. An alert()
    // would hang the click, and href="#" goes nowhere.
    page.on("dialog", (dialog) => {
      throw new Error(`CTA opened a dialog: ${dialog.message()}`);
    });

    const deadLinks = page.locator('a[href="#"], a[href=""]');
    await expect(deadLinks).toHaveCount(0);

    for (const name of ["Create your account", "Sign up"]) {
      await expect(page.getByRole("link", { name }).first()).toBeVisible();
    }
  });

  test("the waitlist is gone from every surface", async ({ page }) => {
    // Nav and footer links live outside <main>, so assert over the whole body.
    await expect(page.locator("body")).not.toContainText(/wait ?list|waiting list/i);
  });

  test("the TestFlight CTA is hidden while no invite URL is configured", async ({ page }) => {
    test.skip(
      Boolean(process.env.NEXT_PUBLIC_TESTFLIGHT_URL),
      "a TestFlight URL is configured, so the CTA is expected to show",
    );

    await expect(page.getByRole("link", { name: /TestFlight/i })).toHaveCount(0);
  });

  // Opt-in: skipped in the default run (and so in CI) because no invite link
  // exists yet. Exercise the show path with
  //   NEXT_PUBLIC_TESTFLIGHT_URL=https://testflight.apple.com/join/xxx npm run test:e2e
  // The variable is inlined at build time, so it has to be set for the whole
  // command — Playwright's webServer inherits it and rebuilds.
  test("the TestFlight CTA appears once an invite URL is configured", async ({ page }) => {
    const url = process.env.NEXT_PUBLIC_TESTFLIGHT_URL;
    test.skip(!url, "no TestFlight URL configured, so the CTA is expected to hide");

    const cta = page.locator("#cta").getByRole("link", { name: /TestFlight/i });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", url!);
    await expect(cta).toHaveAttribute("rel", /noopener/);
  });

  test("the hero claims no testers we cannot evidence", async ({ page }) => {
    await expect(page.locator("#hero")).not.toContainText(/testers/i);
  });
});
