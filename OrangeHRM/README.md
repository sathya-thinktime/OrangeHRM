# QA Automation Assessment

An end-to-end **QA Automation Framework** built using **Playwright, TypeScript, and Page Object Model (POM)**. The framework covers both **UI automation** and **API testing**, with a focus on maintainability, reusability, clean project structure, externalized test data, and environment-based configuration.

---

## 📌 Project Overview

This project demonstrates a scalable automation framework for validating application workflows through:

* UI End-to-End (E2E) automation
* REST API automation
* Page Object Model (POM)
* Externalized test data
* Environment-based configuration
* Reusable page and API components
* Playwright HTML reporting

The framework is designed to demonstrate practical QA automation practices suitable for real-world projects.

---

## 🎯 Scenario Selection

### Employee Lifecycle Management

The primary UI automation scenario covers a complete employee lifecycle:

1. User login
2. Add a new employee
3. Search for the created employee
4. Verify employee details
5. Delete the employee
6. Logout

This scenario was selected because it covers multiple real-world user interactions and demonstrates how the **Page Object Model** can be used to create maintainable and reusable automation components.

API automation is also included to complement the UI automation and demonstrate backend validation capabilities.

---

## 🛠️ Technology Stack

| Technology            | Purpose                           |
| --------------------- | --------------------------------- |
| **Playwright**        | UI and API automation             |
| **TypeScript**        | Programming language              |
| **Node.js**           | Runtime environment               |
| **npm**               | Package and dependency management |
| **Page Object Model** | Framework design pattern          |
| **JSON**              | External test data management     |
| **dotenv**            | Environment configuration         |
| **Git**               | Version control                   |
| **GitHub**            | Source code repository            |

---

## 🏗️ Framework Architecture

The framework follows the **Page Object Model (POM)** design pattern to separate test logic from page-specific implementation.

### Key Design Principles

* Page classes encapsulate UI locators and actions.
* Test files contain the actual test scenarios and validations.
* Test data is maintained separately in JSON files.
* Environment-specific URLs are managed using `.env`.
* API request logic is separated from API test cases.
* Common functionality is implemented through reusable components.
* UI and API tests are organized into separate test suites.

---

## 📂 Project Structure

```text
qa-automation/
│
├── api/                           # API request handlers and reusable API helpers
│   ├── auth.api.ts
│   ├── users.api.ts
│   ├── ReqResApi.ts
│
├── pages/                         # Page Object Model classes
│   ├── EmployeeListPage.ts
│   ├── EmployeePage.ts
│   └── LoginPage.ts
│
├── test-data/                     # Externalized test data
│   ├── employee.json
│   └── loginData.json
│
├── tests/                         # Test suites
│   ├── api/                       # API test cases
│   └── ui/                        # UI E2E test cases
│
├── playwright-report/             # Generated Playwright HTML report
├── test-results/                  # Screenshots, traces and test artifacts
│
├── .env                           # Environment variables
├── requirements.txt               # Includes modules to be installed for the test script
├── .gitignore                     # Git ignore configuration
├── package.json                   # Project dependencies and scripts
├── playwright.config.ts           # Playwright configuration
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # Project documentation
```

---

# 🧪 Test Coverage

## UI Automation

The UI automation covers the complete Employee Lifecycle Management workflow.

### Authentication

* User login
* Login validation
* Secure credential handling through externalized test data
* User logout

### Employee Management

* Add a new employee
* Generate/use dynamic employee data
* Search for an employee
* Validate employee profile information
* Delete an employee
* Verify successful deletion

### Framework Validation

* Reusable Page Objects
* Locator abstraction
* Assertions
* Synchronization and auto-waiting
* Test data separation
* End-to-end workflow validation

---

## 🔌 API Testing

The framework also includes REST API automation.

### API Coverage

* REST API endpoint validation
* GET requests
* POST requests
* PUT/PATCH requests
* DELETE requests
* HTTP status code validation
* Response payload validation
* Request payload validation
* CRUD workflow validation

API tests are maintained separately from UI tests to keep the framework modular and maintainable.

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone <repository-url>
cd qa-automation
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Install Playwright Browsers

```bash
npx playwright install
```

---

# 🔐 Environment Configuration

Create a `.env` file in the root directory:

```env
BASE_URL=https://your-target-application.com
API_BASE_URL=https://your-api-url.com
```

Environment variables are loaded through the Playwright configuration and can be used across the framework.

> **Note:** Do not commit sensitive credentials or secrets to GitHub. Add `.env` to `.gitignore`.

Example:

```gitignore
.env
node_modules/
playwright-report/
test-results/
```

---

# 📊 Test Data Management

Test data is maintained separately from the test scripts using JSON files.

Example:

```text
test-data/
├── employee.json
└── loginData.json
```

This approach helps to:

* Avoid hard-coded test data
* Improve test maintainability
* Support data-driven testing
* Reuse test data across multiple scenarios
* Keep test logic clean and readable

---

# ▶️ Test Execution

## Run All Tests

```bash
npx playwright test
```

---

## Run Tests in UI Mode

```bash
npx playwright test --ui
```

Playwright UI Mode provides an interactive interface for exploring and debugging test execution.

---

## Run UI Tests

```bash
npx playwright test tests/ui/
```

---

## Run API Tests

```bash
npx playwright test tests/api/
```

---

## Run a Specific Test File

```bash
npx playwright test tests/ui/employee.spec.ts
```

---

## Run Tests in Headed Mode

```bash
npx playwright test --headed
```

---

## Run a Specific Browser

```bash
npx playwright test --project=chromium
```

---

# 📑 Reporting

Playwright generates an HTML report after test execution.

To open the report:

```bash
npx playwright show-report
```

The report provides:

* Test execution summary
* Passed and failed test cases
* Execution duration
* Failure details
* Error messages
* Stack traces
* Screenshots
* Test execution artifacts

---

# 🧩 Framework Highlights

* **Playwright Test Runner**
* **TypeScript** for type safety
* **Page Object Model (POM)**
* Reusable page components
* Reusable API components
* Environment-based configuration
* Externalized JSON test data
* Separate UI and API test suites
* Async/await architecture
* Built-in Playwright auto-waiting
* Screenshot and trace support
* HTML test reporting
* Clean and modular folder structure

---

# 📋 Assumptions

The following assumptions are made for executing the automation suite:

* Node.js and npm are installed.
* A stable internet connection is available.
* The target application environment is accessible.
* Valid test credentials are available.
* Required API endpoints are available.
* Playwright browser binaries are installed.
* Test data is compatible with the target environment.

---

# 🚀 Future Improvements

The framework can be extended with the following enhancements:

* Cross-browser execution using Chromium, Firefox, and WebKit
* Parallel test execution optimization
* GitHub Actions CI/CD integration
* Allure reporting
* Docker support
* Advanced data-driven testing
* API schema validation
* Authentication/token management
* Retry strategy for selected scenarios
* Test tagging and selective execution
* Environment-specific configuration files
* Centralized test data management

---

# 👤 Author

**QA Automation Assessment**

Built using:

**Playwright | TypeScript | API Testing | Page Object Model | Node.js**

---