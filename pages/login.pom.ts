import { Page } from '@playwright/test';
import assert from 'assert';

export class LoginInPage {
  page: Page;
  getPageTitle: import('@playwright/test').Locator;
  getUsernameField: import('@playwright/test').Locator;
  getPasswordField: import('@playwright/test').Locator;
  getLoginButton: import('@playwright/test').Locator;

  constructor(page: Page) {
    this.page = page;
    this.getPageTitle = page.locator(".login_logo");
    this.getUsernameField = page.locator("#user-name");
    this.getPasswordField = page.locator("#password");
    this.getLoginButton = page.locator('#login-button');
  }

  async verifyPageTitle(): Promise<void> {
    const pageTitleText = await this.getPageTitle.innerText();
    assert(pageTitleText.includes("Swag Labs"));
  }

  async fillUsername(username: string): Promise<void> {
    await this.getUsernameField.clear();
    await this.getUsernameField.fill(username);
  }

  async fillPassword(password: string): Promise<void> {
    await this.getPasswordField.clear();
    await this.getPasswordField.fill(password);
  }

  async onClickLoginButton(): Promise<void> {
    await this.getLoginButton.click();
  }

  async userLogin(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.onClickLoginButton();
  }

  async standerdUserLogin(): Promise<void> {
    await this.fillUsername('standard_user');
    await this.fillPassword('secret_sauce');
    await this.onClickLoginButton();
  }
}
