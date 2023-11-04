import { Page } from '@playwright/test';
import assert from 'assert';

export class CheckoutInitPage {
  page: Page;
  getPageTitle: import('@playwright/test').Locator;
  getFirstnameField: import('@playwright/test').Locator;
  getLastnameField: import('@playwright/test').Locator;
  getPostalCodeField: import('@playwright/test').Locator;
  getContinueButton: import('@playwright/test').Locator;
  
  
  constructor(page: Page) {
    this.page = page;
    this.getPageTitle = page.locator('.title');
    this.getFirstnameField = page.locator('#first-name');
    this.getLastnameField = page.locator('#last-name');
    this.getPostalCodeField = page.locator('#postal-code');
    this.getContinueButton = page.locator('#continue');
  }

  async verifyPageTitle() { 
    const pageTitleText = await this.getPageTitle.innerText();
    assert(pageTitleText.includes("Checkout: Your Information"));
  }

  async setFirstname(firstname: string) { 
    await this.getFirstnameField.clear();
    await this.getFirstnameField.fill(firstname);
  }

  async setLastname(lastname: string) { 
    await this.getLastnameField.clear();
    await this.getLastnameField.fill(lastname);
  }

  async setPostalCode(postalCode: string) { 
    await this.getPostalCodeField.clear();
    await this.getPostalCodeField.fill(postalCode); 
  }

  async clickContinue() { 
    await this.getContinueButton.click();
  }

  async checkoutInfoFillup(firstname: string, lastname: string, postalCode:string) { 
    await this.setFirstname(firstname);
    await this.setLastname(lastname);
    await this.setPostalCode(postalCode);
  }

}
