import { expect, test } from "@playwright/test";

test.describe("auth navigation", () => {
  test("guest can navigate from home page to login page", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        name: /how many amazing movies have you forgotten\?/i,
      }),
    ).toBeVisible();

    await page.getByRole("button", { name: /get started - it's free!/i }).click();

    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole("heading", { name: "Log In" })).toBeVisible();
    await expect(page.getByLabel("email")).toBeVisible();
    await expect(page.getByLabel("password")).toBeVisible();
    await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
  });

  test("guest can navigate from login page to sign up page", async ({ page }) => {
    await page.goto("/login");

    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole("heading", { name: "Log In" })).toBeVisible();
    await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();

    await expect(
      page.getByRole("link", { name: /create an account/i }),
    ).toBeVisible();
    await page.getByRole("link", { name: /create an account/i }).click();

    await expect(page).toHaveURL(/\/signup$/);
    await expect(page.getByRole("heading", { name: "Sign Up" })).toBeVisible();
    await expect(page.getByLabel("First Name")).toBeVisible();
    await expect(page.getByLabel("Last Name")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Create Account" }),
    ).toBeVisible();
  });

  test("guest can navigate from signup page back to login page", async ({
    page,
  }) => {
    await page.goto("/signup");

    await expect(page).toHaveURL(/\/signup$/);
    await expect(page.getByRole("heading", { name: "Sign Up" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Create Account" }),
    ).toBeVisible();

    await expect(
      page.getByRole("link", { name: /already have an account\? log in/i }),
    ).toBeVisible();
    await page
      .getByRole("link", { name: /already have an account\? log in/i })
      .click();

    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole("heading", { name: "Log In" })).toBeVisible();
  });
});
