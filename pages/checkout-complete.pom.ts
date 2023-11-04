import { Page } from '@playwright/test';
import assert from 'assert';

export class CheckoutCompletePage {
  page: Page;
  getPageTitle: import('@playwright/test').Locator;
  getSuccessImage: import('@playwright/test').Locator;
  getSuccessHeader: import('@playwright/test').Locator;
  getSuccessMessage: import('@playwright/test').Locator;
  getBackHomeButton: import('@playwright/test').Locator;
  
  
  constructor(page: Page) {
    this.page = page;
    this.getPageTitle = page.locator('.title');
    this.getSuccessImage = page.locator('.pony_express');
    this.getSuccessHeader = page.locator('.complete-header');
    this.getSuccessMessage = page.locator('.complete-text');
    this.getBackHomeButton = page.locator('#back-to-products');
  }

  async verifyPageTitle() { 
    const pageTitleText = await this.getPageTitle.innerText();
    assert(pageTitleText.includes("Checkout: Complete!"));
  }

  async verifySuccessHeader() { 
    const pageSuccessHeaderText = await this.getSuccessHeader.innerText();
    assert(pageSuccessHeaderText.includes("Thank you for your order!"));
  }

  async verifySuccessMessage() { 
    const pageSuccessMessageText = await this.getSuccessMessage.innerText();
    assert(pageSuccessMessageText.includes("Your order has been dispatched, and will arrive just as fast as the pony can get there!"));
  }

  async clickBackHome() { 
    await this.getBackHomeButton.click();
  }


}
