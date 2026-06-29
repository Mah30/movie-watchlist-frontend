import { test, expect } from '@playwright/test';

test("guest can navigate from home page to login page", async ({ page }) => {
  await page.goto("/");
  
  //
  await expect(page.getByRole("heading", { name: /how many amazing movies have you forgotten\?/i })).toBeVisible();
  
  //
  await page.getByRole("button", {name: /get started - it's free!/i}).click();

  //
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole("heading", {name: "Log in"})).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("password")).toBeVisible();
  
  await page.getByRole("button", {name: "Sign in"}).click();
});




