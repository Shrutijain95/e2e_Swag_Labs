import { test, expect } from '@playwright/test';
import assert from 'assert';

import { LoginInPage } from '../pages/login.pom';

test.describe('Swag Labs Login Functionality', () => {
    /*
        Test case to check login page has Swag Labs logo
    */
    test ("has login page logo", async({page})=>{
        await page.goto("https://www.saucedemo.com/");
        const divElement = await page.$('div.login_logo');
        const innerTextOfLogo = await divElement?.textContent();
        assert(innerTextOfLogo?.includes("Swag Labs"));
        expect(innerTextOfLogo).toBe("Swag Labs");
    });
    /*
        Test case to check login functionality for "locked_out_user"
        after login expect error message
    */
    test("to validate locked_out_user login ", async ({ page }) => {
        const logInPage = new LoginInPage(page);
        await page.goto('https://www.saucedemo.com/');
        await logInPage.verifyPageTitle();
        await logInPage.userLogin('locked_out_user', 'secret_sauce');
        const errorMessageElement = await page.$('div.error-message-container h3');
        await expect(errorMessageElement).not.toBeNull();
        if(errorMessageElement) {
           const textContentOfListElement = await errorMessageElement.textContent();
           await expect(textContentOfListElement).toContain('Epic sadface: Sorry, this user has been locked out.');
        }
    })
    /*
        Test case to check login functionality for "standard_user"
        after login expect user navigate to new page which includes "inventory.html" in page URL
    */
    test("to validate standard_user login ", async ({ page }) => {
        const logInPage = new LoginInPage(page);
        await page.goto('https://www.saucedemo.com/');
        await logInPage.verifyPageTitle();
        await logInPage.userLogin('standard_user', 'secret_sauce');
        page.url().includes('inventory.html');
    })

    
    
})