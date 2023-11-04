import { test } from '@playwright/test';

import { LoginInPage } from '../pages/login.pom';
import { InventoryPage } from '../pages/inventory.pom';
import { CartPage } from '../pages/cart.pom';
import { CheckoutInitPage } from '../pages/checkout-init.pom';
import { CheckoutOverviewPage } from '../pages/checkout-overview.pom';
import { CheckoutCompletePage } from '../pages/checkout-complete.pom';
import { Logout } from '../pages/logout.pom';

test.describe('Test case to check complete functionality', () => {
    test("to check standerd E2E flow", async ({ page }) => {
        /**
         * Creating the instance of a class
         */
        const rootUrl = 'https://www.saucedemo.com/'
        const logInPage = new LoginInPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutInitPage = new CheckoutInitPage(page);
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        const checkoutCompletePage = new CheckoutCompletePage(page);
        const logout = new Logout(page);

        /**
         * Login as a Standerd User
        */
        await page.goto(rootUrl);
        await logInPage.standerdUserLogin();
        await page.waitForTimeout(500);

        /**
         * Successfull Login checking the navigated screen inventory.html
        */
        page.url().includes('inventory.html');
        await page.waitForTimeout(1000);
        // Adding a product to the cart
        await inventoryPage.addProductToCart('#add-to-cart-sauce-labs-backpack');
        await page.waitForTimeout(500);
        // Navigating to the cart page
        await inventoryPage.gotoShoppingCart();
        
        /**
         * Checking navigation to Cart page and velidating the item in the cart
         */
        page.url().includes('cart.html');
        await page.waitForTimeout(500);
        await cartPage.verifyPageTitle();
        await cartPage.verifyItemInCart("Sauce Labs Backpack");
        /**
         * After varifing the item navigating to the Checkout page
         */
        await cartPage.gotoCheckout();
        await page.waitForTimeout(1000);
        await checkoutInitPage.verifyPageTitle();
        // filling details in the checkout form
        const userInfo = {
            "firstname":"Shruti",
            "lastname":"Jain",
            "postalCode":"1234"
        };
        await checkoutInitPage.checkoutInfoFillup(userInfo.firstname, userInfo.lastname, userInfo.postalCode);
        await page.waitForTimeout(500);
        /**
         * Click on Continue button to Checkout Overview page
        */
        await checkoutInitPage.clickContinue();

        page.url().includes('checkout-step-two.html');
        await page.waitForTimeout(500);
        await checkoutOverviewPage.verifyPageTitle();
        await checkoutOverviewPage.verifyItemInCart("Sauce Labs Backpack");
        // finish the checkout process
        await checkoutOverviewPage.clickFinish();

        /**
         * Verify Checkout Complete Page
         */
        page.url().includes('checkout-complete.html');
        await page.waitForTimeout(500);
        await checkoutCompletePage.verifyPageTitle();
        await checkoutCompletePage.verifySuccessHeader();
        await checkoutCompletePage.verifySuccessMessage();
        // After complete the checkout process click on "Back Home" button
        await checkoutCompletePage.clickBackHome();
        /**
         * Verifing Inventory page
         */
        page.url().includes('inventory.html');
        await inventoryPage.verifyPageTitle();
        /**
         * Clicking on Hemburger Icon to open the menu list
        */
        await logout.clickMenuIcon();
        await page.waitForTimeout(500);
        /**
         * Clicking on logout option
        */
        await logout.clickLogout();
        /**
         * Verifing after click on logout, user should be in Login page
         */
        page.url().includes(rootUrl);
        await logInPage.verifyPageTitle();
    })
});