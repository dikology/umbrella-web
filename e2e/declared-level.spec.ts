import { expect, type Page, test } from "@playwright/test";
import { signUp } from "./signup";

// Two journeys, one signup each: the API rate-limits registration, so every
// fresh Learner here is one fewer for the rest of the suite.

const question = (page: Page) =>
  page.getByRole("region", { name: "Roughly which HSK Level have you reached?" });

test("a new Learner is asked their HSK Level once, and lowering it says what happens first", async ({
  page,
}) => {
  await signUp(page);

  const card = question(page);
  await expect(card).toContainText("makes those Words Known");
  await expect(card).toContainText("Marking any of them later still works");
  // The question sits beside the way in, never in front of it.
  await expect(page.getByRole("link", { name: "Add your first Text" })).toBeVisible();

  // A Declared Level that doesn't save says so, and the same tap tries again.
  let failing = true;
  await page.route("**/api/v1/me/declared-level", (route) =>
    failing ? route.fulfill({ status: 503, body: "" }) : route.fallback(),
  );
  await card.getByRole("button", { name: "HSK 4" }).click();
  await expect(card.getByRole("alert")).toContainText("Your Declared Level wasn’t saved");
  await expect(card).toBeVisible();

  failing = false;
  await card.getByRole("button", { name: "HSK 4" }).click();
  await expect(page.getByRole("status")).toContainText("HSK 4 declared");
  await expect(card).toBeHidden();
  await expect(page.getByText("Declared Level: HSK 4")).toBeVisible();

  await page.reload();
  await expect(page.getByText("Declared Level: HSK 4")).toBeVisible();
  await expect(question(page)).toBeHidden();

  const change = page.getByRole("button", { name: "Change Declared Level" });
  await change.click();
  const dialog = page.getByRole("dialog", { name: "Change your Declared Level" });
  await expect(dialog.getByRole("radio", { name: "HSK 4" })).toBeChecked();
  await expect(dialog.getByRole("button", { name: "Save" })).toBeDisabled();

  await dialog.getByRole("radio", { name: "HSK 2" }).check();
  await expect(dialog).toContainText("Only the declared Words above HSK 2 stop being Known");
  await expect(dialog).toContainText("Words you’ve read stay Known");

  // Escape leaves the level as it was.
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(change).toBeFocused();
  await expect(page.getByText("Declared Level: HSK 4")).toBeVisible();

  await change.click();
  await dialog.getByRole("radio", { name: "HSK 2" }).check();
  await dialog.getByRole("button", { name: "Lower to HSK 2" }).click();
  await expect(dialog).toBeHidden();
  await expect(page.getByText("Declared Level: HSK 2")).toBeVisible();

  await page.reload();
  await expect(page.getByText("Declared Level: HSK 2")).toBeVisible();
});

test("skipping the question is an answer, and raising from none says Marked Words stay marked", async ({
  page,
}) => {
  await signUp(page);

  await question(page).getByRole("button", { name: "Just starting / skip" }).click();
  await expect(question(page)).toBeHidden();

  await page.reload();
  await expect(page.getByRole("heading", { name: "Library", level: 1 })).toBeVisible();
  await expect(page.getByText("No Declared Level")).toBeVisible();
  await expect(question(page)).toBeHidden();

  await page.getByRole("button", { name: "Change Declared Level" }).click();
  const dialog = page.getByRole("dialog", { name: "Change your Declared Level" });
  await expect(dialog.getByRole("radio", { name: "None" })).toBeChecked();

  await dialog.getByRole("radio", { name: "Advanced" }).check();
  await expect(dialog).toContainText("except the ones you’ve Marked");
  await dialog.getByRole("button", { name: "Save" }).click();

  await expect(dialog).toBeHidden();
  await expect(page.getByText("Declared Level: Advanced")).toBeVisible();

  // A Declared Level that doesn't load leaves the Library standing, and asks nothing.
  await page.route("**/api/v1/me", (route) => route.fulfill({ status: 503, body: "" }));
  await page.reload();
  await expect(page.getByRole("link", { name: "Add your first Text" })).toBeVisible();
  await expect(page.getByRole("main").getByRole("alert")).toBeHidden();
  await expect(page.getByRole("button", { name: "Change Declared Level" })).toBeHidden();
  await expect(question(page)).toBeHidden();
});
