import { Page, Locator, expect } from '@playwright/test';

export class EmployeeListPage {
  readonly page: Page;
  readonly pimMenu: Locator;
  readonly employeeListMenu: Locator;
  readonly employeeIdSearchInput: Locator;
  readonly searchButton: Locator;
  readonly deleteButton: Locator;
  readonly deleteIcon: Locator;
  readonly confirmDeleteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pimMenu = page.getByText('PIM', { exact: true });
    this.employeeListMenu = page.getByText('Employee List', { exact: true });
    this.employeeIdSearchInput = page.locator('label:has-text("Employee Id")').locator('xpath=following::input[1]');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.deleteButton = page.getByRole('button', { name: 'Delete' });
    this.deleteIcon = page.locator('i.bi-trash');
    this.confirmDeleteButton = page.getByRole('button', { name: 'Yes, Delete' });
  }

  async navigateToEmployeeList(): Promise<void> {
    await this.employeeListMenu.click();
    await this.page.waitForURL('**/pim/viewEmployeeList');
  }

  async searchEmployee(employeeId: string): Promise<void> {
    await this.employeeIdSearchInput.fill(employeeId);
    await this.searchButton.click();
  }
  async searchAndDeleteEmployee(employeeId: string, firstName: string, lastName: string): Promise<void> {
    await this.employeeIdSearchInput.fill(employeeId);
    await this.searchButton.click();
    const employeeRow = this.page.locator('.oxd-table-row').filter({hasText: `${firstName} ${lastName}`});
    // await employeeRow.getByRole('checkbox').check();
    await this.page.waitForLoadState('networkidle');
    await this.deleteIcon.click();
    await this.confirmDeleteButton.click();
  }

  async verifyEmployeeDisplayed(firstName: string,lastName: string): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await expect(this.page.getByText(firstName, { exact: true }),'Created employee should be displayed in search results').toBeVisible();
    await expect(this.page.getByText(lastName, { exact: true }),'Created employee last name should be displayed in search results').toBeVisible();
  }
  async openEmployee(firstName: string,lastName: string): Promise<void> {
    await this.page.getByText(firstName, { exact: true }).click();
  }

async verifyEmployeeDeleted(firstName: string,lastName: string): Promise<void> {
  await expect(this.page.getByText(firstName, { exact: true })).not.toBeVisible();
  await expect(this.page.getByText(lastName, { exact: true })).not.toBeVisible();
}
}