import { Page } from '@playwright/test';
import assert from 'assert';

export class CartPage {
  page: Page;
  getPageTitle: import('@playwright/test').Locator;
  getCartList: import('@playwright/test').Locator;
  getContinueShoppingButton: import('@playwright/test').Locator;
  getCheckoutButton: import('@playwright/test').Locator;

  
  
  constructor(page: Page) {
    this.page = page;
    this.getPageTitle = page.locator('.title');
    this.getCartList = page.locator('.cart_list');
    this.getContinueShoppingButton = page.locator('#continue-shopping');
    this.getCheckoutButton = page.locator('#checkout');
  }

  async verifyPageTitle() { 
    const pageTitleText = await this.getPageTitle.innerText();
    assert(pageTitleText.includes("Your Cart"));
  }

  async verifyItemInCart(itemName: any) { 
    const cartListText = await this.getCartList.innerText();
    assert(cartListText.includes(itemName));
  }

  async gotoContinueShopping() { 
    await this.getContinueShoppingButton.click();
  }

  async gotoCheckout() {
    await this.getCheckoutButton.click();
  }
}
