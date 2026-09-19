import { defineConfig } from "@playwright/test";

// Runs against the full stack: the umbrella-api compose services (db + api)
// must already be up on :8000 with migrations applied. Next is started here.
export default defineConfig({
  testDir: "./e2e",
  reporter: process.env.CI ? "github" : "list",
  use: { baseURL: "http://localhost:3000" },
  webServer: {
    command: process.env.CI ? "npm run build && npm run start" : "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
