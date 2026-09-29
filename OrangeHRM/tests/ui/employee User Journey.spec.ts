import { test } from '@playwright/test';
import { LoginPage } from '../../POM Pages/LoginPage';
import { EmployeePage } from '../../POM Pages/EmployeePage';
import { EmployeeListPage } from '../../POM Pages/EmployeeListPage';

import employeeData from '../../test-data/employee.json';
import loginData from '../../test-data/loginData.json';

test('Employee User Journey Management', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const employeePage = new EmployeePage(page);
  const employeeListPage = new EmployeeListPage(page);

  // Generate unique Employee ID
  const employeeId = Date.now().toString().slice(-6);

  // 1. Login
  await test.step('Login to the application', async () => {

    await page.goto('/');

    await loginPage.login(
      loginData.validUser.username,
      loginData.validUser.password
    );

    await loginPage.verifyLoginSuccessful();
  });


  // 2. Add Employee
  await test.step('Add a new employee', async () => {

    await employeePage.navigateToAddEmployee();

    await employeePage.addEmployee(
      employeeData.firstName,
      employeeData.lastName,
      employeeId
    );

    await employeePage.verifyEmployeeCreated();

    console.log('Employee ID:', employeeId);
  });


  // 3. Search Employee
  await test.step('Search for the created employee', async () => {

    await employeeListPage.navigateToEmployeeList();

    await employeeListPage.searchEmployee(employeeId);

    await employeeListPage.verifyEmployeeDisplayed(
      employeeData.firstName,
      employeeData.lastName
    );
  });


  // 4. Open Employee
  await test.step('Open employee details', async () => {

    await employeeListPage.openEmployee(
      employeeData.firstName,
      employeeData.lastName
    );
  });


  // 5. Update Job Details
  await test.step('Update employee job details', async () => {

    await employeePage.navigateToJob();

    await employeePage.updateJobDetails();
  });


  // 6. Verify Job Details
  await test.step('Verify updated job details', async () => {

    await employeePage.verifyJobDetails();
  });


  // 7. Delete Employee
  await test.step('Delete the employee', async () => {

    await employeeListPage.navigateToEmployeeList();

    await employeeListPage.searchEmployee(employeeId);

    await employeeListPage.searchAndDeleteEmployee(
      employeeId,
      employeeData.firstName,
      employeeData.lastName
    );

    await employeeListPage.verifyEmployeeDeleted(
      employeeData.firstName,
      employeeData.lastName
    );
  });


  // 8. Logout
  await test.step('Logout from the application', async () => {

    await loginPage.logout();
  });

});