import { Page, Locator, expect } from '@playwright/test';
import path from 'path';

export class EmployeePage {
  readonly page: Page;
  readonly pimMenu: Locator;
  readonly addEmployeeMenu: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly saveButton: Locator;
  readonly jobTab: Locator;
  readonly jobTitleDropdown: Locator;
  readonly employmentStatusDropdown: Locator;
  readonly profilePicture: Locator;
  readonly jobSaveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pimMenu = page.getByText('PIM', { exact: true });
    this.addEmployeeMenu = page.getByText('Add Employee', { exact: true });
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.employeeIdInput = page.locator('label:has-text("Employee Id")').locator('xpath=following::input[1]');
    this.jobTab = page.getByRole('link', { name: 'Job' });
    this.jobTitleDropdown = page.getByText('-- Select --').first();
    this.employmentStatusDropdown = page.getByText('-- Select --').nth(3);
    this.profilePicture = page.locator('input[type="file"]');
    this.jobSaveButton = page.getByRole('button', { name: 'Save' });
  }

  async navigateToAddEmployee(): Promise<void> {
    await this.pimMenu.click();
    await expect(this.addEmployeeMenu,'Add Employee menu should be visible after opening PIM').toBeVisible({ timeout: 10000 });
    await this.addEmployeeMenu.click();
  }
  async addEmployee(firstName: string, lastName: string, employeeId: string): Promise<void> {
    const profile_pic = path.join(process.cwd(),'test-data','Profile_pic.jpg');
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.employeeIdInput.fill(employeeId);
    // await this.page.waitForTimeout(3000);
    await this.profilePicture.setInputFiles(profile_pic);
    await this.saveButton.click();
    await this.page.waitForLoadState('networkidle');
    await expect(this.page,'Employee should be redirected to Personal Details after saving').toHaveURL(/\/pim\/viewPersonalDetails\/empNumber\/\d+/, {timeout: 15000});
  }
  async verifyEmployeeCreated(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await expect(this.page,'Employee should be created and Personal Details page should be displayed').toHaveURL(/\/pim\/viewPersonalDetails\/empNumber\/\d+/);
  }
   async navigateToJob(): Promise<void> {
    await this.jobTab.click();
    await this.page.waitForLoadState('networkidle');
    await expect(this.page.getByText('Job Details'),'Job Details section should be visible').toBeVisible({ timeout: 10000 });
  }
  async updateJobDetails(): Promise<void> {
    // Job Title
    await this.jobTitleDropdown.click();
    const qaEngineerOption = this.page.getByText('Account Assistant', { exact: true });
    // await this.page.getByText('QA Engineer', { exact: true }).click();
    await qaEngineerOption.scrollIntoViewIfNeeded();
    await qaEngineerOption.click();
    // Employment Status
    await this.employmentStatusDropdown.click();
    await this.page.getByText('Freelance', { exact: true }).click();
    await this.jobSaveButton.click();
  }

  async verifyJobDetails(): Promise<void> {
    await expect(this.page.getByText('Freelance', { exact: true })).toBeVisible();
    // await expect(this.page.getByText('Account Assistant', { exact: true })).toHaveText('Account Assistant');
}
}