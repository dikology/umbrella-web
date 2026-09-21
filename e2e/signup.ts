import { expect, type Page } from "@playwright/test";

/** Registers a fresh Learner through the real form and waits for their Library. */
export async function signUp(page: Page) {
  const email = `e2e-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@example.com`;

  await page.goto("/signup");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill("correct-horse-battery");
  await page.getByLabel("Date of birth").fill("1990-01-01");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Sign up" }).click();

  await expect(page).toHaveURL(/\/space$/);
}
