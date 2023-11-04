import { test } from '@playwright/test';

import { LoginInPage } from '../pages/login.pom';
import { InventoryPage } from '../pages/inventory.pom';
import { CartPage } from '../pages/cart.pom';

test.describe('Test case to check Cart Page Functionality', () => {
    test("to check standerd cart flow", async ({ page }) => {
        const loginInPage = new LoginInPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        await page.goto('https://www.saucedemo.com/');
        await loginInPage.standerdUserLogin();
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
        await cartPage.gotoContinueShopping();
        page.url().includes('inventory.html');
        await inventoryPage.verifyPageTitle();
        await page.waitForTimeout(500);
        await inventoryPage.gotoShoppingCart();
        page.url().includes('cart.html');
        await cartPage.verifyPageTitle();
        await cartPage.verifyItemInCart("Sauce Labs Backpack");
        await cartPage.gotoCheckout();
        await page.waitForTimeout(1000);
    })
});