import { Page } from '@playwright/test';

export class Logout {
  page: Page;
  getMenuButton: import('@playwright/test').Locator;
  getLogoutOption: import('@playwright/test').Locator;
  
  
  constructor(page: Page) {
    this.page = page;
    this.getMenuButton = page.locator('#react-burger-menu-btn');
    this.getLogoutOption = page.locator('#logout_sidebar_link');
  }

  async clickMenuIcon() { 
    await this.getMenuButton.click();
  }

  async clickLogout() { 
    await this.getLogoutOption.click();
  }
}
