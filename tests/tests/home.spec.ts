import { test, expect, Page } from "@playwright/test";

test.beforeEach(async ({ page, baseURL }) => {
  await page.goto(baseURL);
});

test.describe("Home Module", () => {
  test("should navigate to home", async ({ page, baseURL }) => {
    debugger;
    await page.waitForURL(baseURL + "/home");
  });
});
