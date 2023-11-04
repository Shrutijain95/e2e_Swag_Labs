import { Page } from '@playwright/test';
import assert from 'assert';

export class InventoryPage {
  page: Page;
  getPageTitle: import('@playwright/test').Locator;
  getShoppingCartLink: import('@playwright/test').Locator;

  constructor(page: Page) {
    this.page = page;
    this.getPageTitle = page.locator('.title');
    this.getShoppingCartLink = page.locator('.shopping_cart_link');
  }

  async verifyPageTitle(): Promise<void> {
    const pageTitleText = await this.getPageTitle.innerText();
    assert(pageTitleText.includes('Products'));
  }

  async sortProducts(sortValue: any): Promise<void> {
    await this.page.selectOption('select.product_sort_container', sortValue);
  }

  async gotoShoppingCart(): Promise<void> {
    await this.getShoppingCartLink.click();
  }

  async addProductToCart(elementId: string): Promise<void> {
    await this.page.locator(elementId).click();
  }
}
