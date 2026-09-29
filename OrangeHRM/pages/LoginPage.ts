import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly dashboardHeading: Locator;
  readonly userDropdown: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
    this.userDropdown = page.locator('.oxd-userdropdown-tab');
    this.logoutButton = page.getByText('Logout', { exact: true });
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifyLoginSuccessful(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await expect(this.page,'Dashboard should be visible after successful login').toHaveURL(/\/dashboard\/index/);
  }
  async logout(): Promise<void> {
    await this.userDropdown.click();
    await this.logoutButton.click();
    await this.page.waitForLoadState('networkidle');
    await expect(this.page).toHaveURL(/\/auth\/login/);
}
}