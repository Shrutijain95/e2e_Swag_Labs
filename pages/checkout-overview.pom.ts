import { Page } from '@playwright/test';
import assert from 'assert';

export class CheckoutOverviewPage {
  page: Page;
  getPageTitle: import('@playwright/test').Locator;
  getCartList: import('@playwright/test').Locator;
  getFinishButton: import('@playwright/test').Locator;
  
  
  constructor(page: Page) {
    this.page = page;
    this.getPageTitle = page.locator('.title');
    this.getCartList = page.locator('.cart_list');
    this.getFinishButton = page.locator('#finish');
  }

  async verifyPageTitle() { 
    const pageTitleText = await this.getPageTitle.innerText();
    assert(pageTitleText.includes("Checkout: Overview"));
  }

  async clickFinish() { 
    await this.getFinishButton.click();
  }

  async verifyItemInCart(item: string) { 
    const cartListText = await this.getCartList.innerText();
    assert(cartListText.includes(item));
  }
}
