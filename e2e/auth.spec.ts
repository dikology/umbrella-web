import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import { signUp } from "./signup";

const BODY = "春天来了。\n北京大学生喜欢春天。今天天气很好。";

// One Learner and one browser for the whole file, in order, from registering to
// logging out: signups are rate-limited, and every refresh rotates the session's
// cookies, so a copy of them taken earlier would be a reused token by the time a
// later test ran.
test.describe.configure({ mode: "serial" });

let context: BrowserContext;
let page: Page;
let readerUrl: string;

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
});

test.afterAll(async () => {
  await context.close();
});

const text = () => page.locator('[lang="zh"]').filter({ hasText: "北京" });
const word = (surface: string) => text().getByRole("button", { name: surface, exact: true });

// What the browser does by itself 15 minutes after the last refresh.
const expireAccessToken = () => context.clearCookies({ name: "ub_access" });

async function cookieValue(name: string) {
  return (await context.cookies()).find((cookie) => cookie.name === name)?.value;
}

async function mark(surface: string) {
  await word(surface).first().click();
  await page.getByRole("dialog", { name: surface }).getByRole("button", { name: "Mark" }).click();
}

test("registering reaches /space", async () => {
  await signUp(page);
  await expect(page.getByRole("button", { name: "Log out" })).toBeVisible();
});

test("a Learner whose access token has expired navigates within /space and is still in", async () => {
  const firstRefreshToken = await cookieValue("ub_refresh");
  await expireAccessToken();

  await page.goto("/space/words");
  await expect(page).toHaveURL(/\/space\/words$/);
  await expect(page.getByRole("button", { name: "Log out" })).toBeVisible();

  // The browser was handed the rotated pair, not only the server render.
  expect(await cookieValue("ub_access")).toBeTruthy();
  expect(await cookieValue("ub_refresh")).not.toBe(firstRefreshToken);
});

test("a Word marked from a Reader left open past the access token's life is marked", async () => {
  await page.goto("/space/texts/new");
  await page.getByLabel("Title").fill("春天");
  await page.getByLabel("Chinese text").fill(BODY);
  await page.getByRole("button", { name: "Add to Library" }).click();
  await expect(page).toHaveURL(/\/space\/texts\/[0-9a-f-]{36}$/);
  await expect(text()).toBeVisible();
  readerUrl = page.url();

  await expireAccessToken();
  const refreshes: string[] = [];
  page.on("request", (request) => {
    if (request.url().endsWith("/api/v1/auth/refresh")) refreshes.push(request.method());
  });

  await mark("春天");
  await expect(word("春天").first()).toHaveAccessibleDescription("Marked Word");
  // The mark shows before the API has answered, so the refresh is waited for.
  await expect.poll(() => refreshes).toEqual(["POST"]);

  await page.reload();
  await expect(word("春天").first()).toHaveAccessibleDescription("Marked Word");
});

test("a logged-in visitor to /login or /signup is sent to /space", async () => {
  await page.goto("/login");
  await expect(page).toHaveURL(/\/space$/);

  await expireAccessToken();
  await page.goto("/signup");
  await expect(page).toHaveURL(/\/space$/);
});

test("once the refresh token is no good either, the Learner lands on /login", async () => {
  const session = (await context.cookies()).filter((cookie) => cookie.name.startsWith("ub_"));
  const { domain, path } = session.find((cookie) => cookie.name === "ub_refresh")!;
  const loseSession = async () => {
    await expireAccessToken();
    await context.addCookies([{ name: "ub_refresh", value: "not-a-refresh-token", domain, path }]);
  };

  // In-page: the mark's 401 can't be refreshed away.
  await page.goto(readerUrl);
  await expect(text()).toBeVisible();
  await loseSession();
  await mark("喜欢");
  await expect(page).toHaveURL(/\/login$/);

  // Navigation: the proxy can't refresh either.
  await loseSession();
  await page.goto("/space");
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole("button", { name: "Log in" })).toBeVisible();

  // The API never saw the real refresh token turned down: hand the session back.
  await context.addCookies(session);
});

test("logging out lands on /login, and /space bounces back to it", async () => {
  await page.goto("/space");
  await page.getByRole("button", { name: "Log out" }).click();
  await expect(page).toHaveURL(/\/login$/);

  await page.goto("/space");
  await expect(page).toHaveURL(/\/login$/);
});
