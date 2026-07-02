//Dado que - Quando - Entao
//Given-When-Then)

//Dado que o usuário esta na pagina de login mas nao possui uma conta de login.
//Quando clica em Create an account
//Entao será levado para a pagina Signup


import { expect, test } from '@playwright/test';


test( "gest can navigate from login page to sign up page", async({ page }) => {
    await page.goto("/login")
    await expect(page).toHaveURL(/\/login$/);


    await expect(page.getByRole("heading" , { name: "Log In"})).toBeVisible()
    await expect(page.getByRole("button", {name: /sign in/i})).toBeVisible();

    await expect(page.getByRole("link", {name: /create an account/i })).toBeVisible()
    await page.getByRole("link", {name: /create an account/i }).click();

    await expect(page).toHaveURL(/\/signup$/);
   
   


    await expect(page.getByRole("heading", { name: "Sign Up" })).toBeVisible();
    await expect(page.getByLabel("First Name")).toBeVisible();
    await expect(page.getByLabel("Last Name")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();

    await expect(page.getByRole("button", {name: "Create Account"})).toBeVisible();
   


})