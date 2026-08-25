import { test, expect } from '@playwright/test';


// Verifies that a guest user can reach the login page from the home page.
test("guest can navigate from home page to login page", async ({ page }) => {
  await page.goto("/");
  

  // Confirms that the home page hero heading is visible before interacting with it.
  await expect(page.getByRole("heading", { name: /how many amazing movies have you forgotten\?/i })).toBeVisible();
  

  // Clicks the main call-to-action button that should redirect guests to login.
  await page.getByRole("button", {name: /get started - it's free!/i}).click();

    
  // Checks that the browser navigated to the login page and that the login form is displayed.
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole("heading", {name: "Log in"})).toBeVisible();
  await expect(page.getByLabel("email")).toBeVisible();
  await expect(page.getByLabel("password")).toBeVisible();
  await expect(page.getByRole("button", {name: /sign in/i})).toBeVisible();
});



