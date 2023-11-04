import { test } from '@playwright/test';

import { LoginInPage } from '../pages/login.pom';
import { InventoryPage } from '../pages/inventory.pom';
import { CartPage } from '../pages/cart.pom';
import { CheckoutInitPage } from '../pages/checkout-init.pom';
import { CheckoutOverviewPage } from '../pages/checkout-overview.pom';
import { CheckoutCompletePage } from '../pages/checkout-complete.pom';

test.describe('Test case to check checkout functionality', () => {
    test("to check standerd checkout flow", async ({ page }) => {
        const logInPage = new LoginInPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutInitPage = new CheckoutInitPage(page);
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        const checkoutCompletePage = new CheckoutCompletePage(page);

        await page.goto('https://www.saucedemo.com/');
        await logInPage.standerdUserLogin();
        await page.waitForTimeout(500);
        page.url().includes('inventory.html');
        await page.waitForTimeout(1000);
        await inventoryPage.addProductToCart('#add-to-cart-sauce-labs-backpack');
        await page.waitForTimeout(500);
        await inventoryPage.gotoShoppingCart();
        page.url().includes('cart.html');
        await page.waitForTimeout(500);
        await cartPage.verifyPageTitle();
        await cartPage.verifyItemInCart("Sauce Labs Backpack");
        await cartPage.gotoCheckout();
        await page.waitForTimeout(1000);
        await checkoutInitPage.verifyPageTitle();
        const userInfo = {
            "firstname":"Shruti",
            "lastname":"Jain",
            "postalCode":"1234"
        };
        await checkoutInitPage.checkoutInfoFillup(userInfo.firstname, userInfo.lastname, userInfo.postalCode);
        await page.waitForTimeout(500);
        await checkoutInitPage.clickContinue();

        page.url().includes('checkout-step-two.html');
        await page.waitForTimeout(500);
        await checkoutOverviewPage.verifyPageTitle();
        await checkoutOverviewPage.verifyItemInCart("Sauce Labs Backpack");
        await checkoutOverviewPage.clickFinish();

        page.url().includes('checkout-complete.html');
        await page.waitForTimeout(500);
        await checkoutCompletePage.verifyPageTitle();
        await checkoutCompletePage.verifySuccessHeader();
        await checkoutCompletePage.verifySuccessMessage();
        await checkoutCompletePage.clickBackHome();
    })
});