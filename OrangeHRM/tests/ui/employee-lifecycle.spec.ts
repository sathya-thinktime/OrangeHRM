import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { EmployeePage } from '../../pages/EmployeePage';
import employeeData from '../../test-data/employee.json';
import { EmployeeListPage } from '../../pages/EmployeeListPage';
import loginData from '../../test-data/loginData.json';

test('Employee Lifecycle Management', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const employeePage = new EmployeePage(page);
  const employeeListPage = new EmployeeListPage(page);
  const employeeId = `${Math.floor(1000 + Math.random() * 9000)}`;

  // 1. Login
  await page.goto('/');

  await loginPage.login(loginData.validUser.username, loginData.validUser.password);
  await loginPage.verifyLoginSuccessful();

  // 2. Add Employee
  await employeePage.navigateToAddEmployee();
  await employeePage.addEmployee(employeeData.firstName, employeeData.lastName, employeeId);
  await employeePage.verifyEmployeeCreated();
  
  console.log('Employee ID: ',employeeId);

  // 3. Search Employee
  await employeeListPage.navigateToEmployeeList();
  await employeeListPage.searchEmployee(employeeId);
  await employeeListPage.verifyEmployeeDisplayed(employeeData.firstName, employeeData.lastName);

  //4. Open Employee
  await employeeListPage.openEmployee(employeeData.firstName,employeeData.lastName);

  // 5. Update Job Details
  await employeePage.navigateToJob();
  await employeePage.updateJobDetails();

  // 7. Verify Job Details
  await employeePage.verifyJobDetails();

  // 8. Delete Employee
  await employeeListPage.navigateToEmployeeList();
  await employeeListPage.searchEmployee(employeeId);
  await employeeListPage.searchAndDeleteEmployee(employeeId,employeeData.firstName,employeeData.lastName);
  await employeeListPage.verifyEmployeeDeleted(employeeData.firstName,employeeData.lastName);
  
  // 9. Logout
  await loginPage.logout();
});