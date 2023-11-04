import { test, expect } from '@playwright/test';

import { LoginInPage } from '../pages/login.pom';
import { InventoryPage } from '../pages/inventory.pom';


test.describe('Test case to check Inventory Page Functionality', () => {
    test("to check sorting options", async ({ page }) => {
        const logInPage = new LoginInPage(page);
        const inventoryPage = new InventoryPage(page);
        await page.goto('https://www.saucedemo.com/');
        await logInPage.userLogin('standard_user', 'secret_sauce');
        await page.waitForTimeout(500);
        page.url().includes('inventory.html');
        await page.waitForTimeout(1000);
            /**
             * Inventory page title verification
            */
            await inventoryPage.verifyPageTitle();
            /**
             * Inventory page sort functionality
            */
            const selectElement = await page.$('.product_sort_container');
            if (selectElement) {
                const options = await selectElement.$$('option');
                // Extract the text content of each option
                const optionTexts = await Promise.all(options.map(option => option.textContent()));
                // loop the array of the options text and call sortProducts function
                for (const optionText of optionTexts) {
                    await inventoryPage.sortProducts(optionText);
                    await page.waitForTimeout(1500);
                }
            } else {
                    console.error('Select element not found');
            }
            /**
             * Inventory page Products list
            */

            // getting all the products in an array
            const productListElements = await page.$$("div.inventory_list div.inventory_item");

            for(const product of productListElements){
                // getting product Images element
                const productImgElement = await product.$("div[class*=inventory_item] img");
                // expecting Alt, src attributes not to be null;
                const altTextContentOfProduct = await productImgElement?.getAttribute("alt");
                await expect(altTextContentOfProduct).not.toBeNull();

                const srcOfImage = await productImgElement?.getAttribute("src");
                await expect(srcOfImage).not.toBeNull();

                // to check product Anchor element
                const anchorTagForProductName = await product.$("div[class*=inventory_item] a");
                if(anchorTagForProductName){
                    const hrefTagOfProductName = await anchorTagForProductName.getAttribute("href");
                    expect(hrefTagOfProductName).not.toBeNull();
                    // to check  product title
                    const divElementOfAnchor = await product.$('div[class*=inventory_item] a div') //await ProductSectionDetailDivElement?.$("a div.inventory_item_name");
                    if(divElementOfAnchor){
                        const textContentOfProductName = await divElementOfAnchor?.textContent();
                        expect(textContentOfProductName).not.toBeNull();
                    }
                }
                // to check product description
                const dealDescDivElement = await product.$("div.inventory_item_desc");
                const textContentOfDesc = await dealDescDivElement?.textContent();
                // console.log(textContentOfDesc);
                expect(textContentOfDesc).not.toBeNull();

                // to check product Price
                const priceBarDivElement = await product.$("div.pricebar")
                const priceTab = await priceBarDivElement?.$("div.inventory_item_price");
                const textContentOfPrice = await priceTab?.textContent();
                // console.log(textContentOfPrice);
                expect(textContentOfPrice).not.toBeNull();

                /* 
                    * to click on "Add to cart" button for each product
                */

                // accessing button element
                const addToCartButtonElement = await priceBarDivElement?.$("button");
                if(addToCartButtonElement){
                    const buttonText = await addToCartButtonElement.innerText();
                    expect(buttonText).not.toBeNull();
                    const isAddToCartButtonEnabled = await addToCartButtonElement.isEnabled();
                    if(isAddToCartButtonEnabled){
                        // adding product into cart
                        await addToCartButtonElement.click();
                        await page.waitForTimeout(1000);
                    }
                }
            }
        
            /**
             * Validating all products added in to the cart or not
             * for validation; comparing the productListElements length with Shopping Cart count
            */
            const shoppingCartDivElement = await page.$("div[class*= shopping_cart] a span")
            // console.log(shoppingCartDivElement);
            const textContentOfShoppingCart = await shoppingCartDivElement?.textContent();
            // console.log(textContentOfShoppingCart);
            await expect(textContentOfShoppingCart).toEqual(productListElements.length?.toString());

            /**
             * After validating items in cart count; checking navigation to cart page
            */
            await inventoryPage.gotoShoppingCart();
        });
})