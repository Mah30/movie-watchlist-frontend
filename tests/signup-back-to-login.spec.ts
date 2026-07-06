
import { expect, test } from '@playwright/test';

test( "guest can navigate from signup page back to login page", async({ page }) => {
    await page.goto("/signup");
    await expect(page).toHaveURL(/\/signup$/)


    await expect(page.getByRole("heading", {name: "Sign Up"})).toBeVisible();
    await expect(page.getByRole("button", {name: "Create Account"})).toBeVisible();

    await expect(page.getByRole("link", {name: /already have an account\? log in/i })).toBeVisible()
    await page.getByRole("link", {name: /already have an account\? log in/i }).click();


    
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole("heading", { name: "Log In" })).toBeVisible();


})