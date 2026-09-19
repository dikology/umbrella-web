import { expect, test } from "@playwright/test";

test("register, reach /space, log out, and get bounced back to /login", async ({ page }) => {
  const email = `e2e-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@example.com`;

  await page.goto("/signup");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill("correct-horse-battery");
  await page.getByLabel("Date of birth").fill("1990-01-01");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Sign up" }).click();

  await expect(page).toHaveURL(/\/space$/);

  await page.getByRole("button", { name: "Log out" }).click();
  await expect(page).toHaveURL(/\/login$/);

  await page.goto("/space");
  await expect(page).toHaveURL(/\/login$/);
});
