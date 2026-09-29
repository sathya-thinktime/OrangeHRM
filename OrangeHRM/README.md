# OrangeHRM Playwright Automation

A TypeScript-based test automation project using
[Playwright](https://playwright.dev/) for UI and API testing. The
project is organized around reusable Page Object Model (POM) classes,
API client helpers, test data, and Playwright's test runner and reports.

## Table of Contents

-   [Overview](#overview)
-   [Tech Stack](#tech-stack)
-   [Project Structure](#project-structure)
-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Configuration](#configuration)
-   [Running Tests](#running-tests)
-   [Reports and Test Artifacts](#reports-and-test-artifacts)
-   [Test Organization](#test-organization)
-   [Troubleshooting](#troubleshooting)
-   [Good Practices](#good-practices)

## Overview

This repository is intended to keep UI and API automation in one
Playwright project.

-   **UI automation:** Validate application workflows through the
    browser.
-   **API automation:** Send requests and verify response status codes,
    response bodies, and CRUD operations.
-   **Page Object Model:** Keep page locators and actions reusable and
    separate from test assertions.
-   **Reusable API clients:** Centralize API request logic in helper
    classes.
-   **Test data:** Store reusable input data separately from test code.
-   **Playwright reports:** Review test results and investigate
    failures.

The main application URL used for the OrangeHRM demo is:

`https://opensource-demo.orangehrmlive.com/`

> This is a public demo environment. Test data and availability may
> change, and tests that create or modify records can be affected by
> existing demo data.

## Tech Stack

-   TypeScript
-   Node.js and npm
-   Playwright Test
-   Playwright browser automation
-   Playwright API testing (`APIRequestContext`)
-   Page Object Model (POM)

## Project Structure

``` text
orangeqa/
└── OrangeHRM/
    ├── api/
    │   ├── ObjectsApi.ts       # Reusable API operations for the Objects API
    │   └── RestfulApi.ts       # Reusable REST API helper methods
    ├── POM Pages/              # Page Object Model classes for UI pages
    ├── recording/              # Supporting recordings or recorded artifacts, if used
    ├── test-data/              # Reusable test data and fixtures
    ├── test-results/           # Results and artifacts generated during test runs
    ├── tests/                  # UI and API test specifications
    ├── playwright-report/      # HTML report output
    ├── .env                    # Local environment variables (do not commit secrets)
    ├── .gitignore
    ├── package.json            # Dependencies and npm scripts
    ├── package-lock.json
    ├── playwright.config.ts    # Playwright test configuration
    ├── README.md
    ├── requirements.txt        # Keep only if this project uses Python dependencies
    └── tsconfig.json           # TypeScript compiler configuration
```

The exact files inside `tests/`, `POM Pages/`, and `test-data/` may
change as the project grows.

## Prerequisites

Install the following before running the tests:

1.  **Node.js** --- use a supported LTS version where possible.
2.  **npm** --- included with Node.js.
3.  **Visual Studio Code** or another TypeScript editor (recommended).
4.  **Git** (recommended for source control).

Check your installation:

``` bash
node --version
npm --version
```

## Installation

Open a terminal in the project directory --- the folder containing
`package.json` --- and run:

``` bash
npm install
```

Install the browsers required by the Playwright configuration:

``` bash
npx playwright install
```

If you only need Chromium, install that browser:

``` bash
npx playwright install chromium
```

On Windows PowerShell, if script execution policy prevents `npx` from
running, try the Windows command shim:

``` powershell
npx.cmd playwright test
```

## Configuration

### 1. Environment variables

Create or update the local `.env` file with the variables expected by
`playwright.config.ts` and the test code. For example:

``` dotenv
BASE_URL=https://opensource-demo.orangehrmlive.com/
```

Add credentials or API settings only if the tests require them. **Use
the exact variable names referenced in your code**; the example above is
illustrative and may need to be adjusted.

Do not commit real usernames, passwords, tokens, or other secrets. Keep
`.env` in `.gitignore` and provide a safe `.env.example` file with
placeholder values if other people need to configure the project.

### 2. Playwright configuration

Review `playwright.config.ts` to confirm:

-   `testDir` points to the correct test folder.
-   `baseURL` is configured for the target application.
-   Browser projects match the browsers you intend to run.
-   `headless` is set according to whether you want visible browser
    execution.
-   Retries, timeouts, workers, and reporters match your test
    environment.
-   Environment variables are loaded before they are used.

If a test uses an API endpoint different from the OrangeHRM application,
configure that endpoint in the relevant API helper or environment
variable rather than assuming it shares the UI base URL.

## Running Tests

Run commands from the directory containing `package.json`.

### Run the full test suite

``` bash
npx playwright test
```

### Run tests with a visible browser

``` bash
npx playwright test --headed
```

The `--headed` option opens the browser for UI tests. API tests do not
open a browser.

### Run tests in debug mode

``` bash
npx playwright test --debug
```

### Run a specific test file

Replace the example path with a file that exists in your `tests/`
directory:

``` bash
npx playwright test tests/api/employees.spec.ts
```

For example, if you have separate UI and API folders:

``` bash
npx playwright test tests/ui
npx playwright test tests/api
```

### Filter tests by title

``` bash
npx playwright test -g "Create an employee"
```

### Run a specific browser project

``` bash
npx playwright test --project=chromium
```

Use the project name defined in `playwright.config.ts`. The name may not
be `chromium` in every configuration.

> If `package.json` defines project-specific scripts, you can use those
> scripts with `npm run <script-name>`. Check the `scripts` section
> before relying on a particular script name.

## Reports and Test Artifacts

After a test run, Playwright may generate output in:

-   **`playwright-report/`** --- HTML report files, when the HTML
    reporter is enabled.
-   **`test-results/`** --- test result data, traces, screenshots, or
    other artifacts configured for failed tests.

Open the HTML report with:

``` bash
npx playwright show-report
```

If the report folder is stored at a custom path, provide that path:

``` bash
npx playwright show-report playwright-report
```

The report is generated by a test run; run the tests first if no report
is available. Review the terminal output and the HTML report for failed
tests, error messages, screenshots, and traces when configured.

## Test Organization

### UI tests

UI test files should focus on user-visible behavior and assertions.
Reusable page locators and actions belong in the corresponding class
under `POM Pages/`.

A typical UI test flow is:

1.  Open the application.
2.  Log in using the configured test approach.
3.  Perform the required action.
4.  Assert the expected UI state or message.
5.  Clean up test data when practical and supported.

### API tests

API test files should verify HTTP status codes, response payloads, and
expected behavior. Reusable request methods belong in `api/` helper
classes.

For CRUD scenarios, consider validating:

-   **Create:** response status and returned record data.
-   **Read:** the created record can be retrieved when the API supports
    retrieval.
-   **Update:** updated fields match the submitted values.
-   **Delete:** deletion returns the documented status, and the record
    is no longer available when the API supports that check.

Use the status codes documented by the API under test; not every API
returns `200` for every successful operation.

### Test data

Keep reusable input data in `test-data/` rather than duplicating values
across test files. Use unique values when tests create records, and
avoid putting credentials or tokens in committed test data.

## Troubleshooting

### Browser download fails

Try installing the browser again:

``` bash
npx playwright install chromium
```

If the download continues to fail, check your network connection,
proxy/firewall restrictions, available disk space, and the Playwright
version in `package.json`. Use a browser version supported by the
installed Playwright package.

### `npx` is blocked in PowerShell

Try:

``` powershell
npx.cmd playwright test
```

This avoids invoking the PowerShell `npx.ps1` script. Avoid changing
machine-wide execution policy settings unless you understand the
security implications and have permission to do so.

### A test times out waiting for a locator

-   Confirm the locator matches the current application UI.
-   Check whether the page has finished loading and whether a dialog or
    overlay is blocking the action.
-   Prefer Playwright locators such as `getByRole`, `getByLabel`, and
    `getByTestId` when appropriate.
-   Assert the expected state before interacting with the element.
-   Check whether the record already exists or the demo application has
    changed.

### A test passes locally but fails intermittently

-   Avoid fixed sleeps where possible; wait for a meaningful UI state or
    API response.
-   Use unique test data and isolate tests from one another.
-   Review worker and parallel execution settings.
-   Capture traces or screenshots on failure to help diagnose the issue.

### HTML report is missing

Confirm that the HTML reporter is enabled in `playwright.config.ts`, run
the tests, and then execute:

``` bash
npx playwright show-report
```

## Good Practices

-   Keep tests independent and repeatable.
-   Use Page Object Model classes for reusable UI actions, not as a
    place for all test assertions.
-   Keep API request logic in API helper classes.
-   Store environment-specific values in configuration or environment
    variables.
-   Never commit secrets, authentication tokens, or sensitive test data.
-   Prefer assertions on observable behavior over implementation
    details.
-   Use unique test data and clean up created records when possible.
-   Keep dependencies reproducible by committing `package-lock.json`.
-   Update this README whenever setup steps, folder names, test
    commands, or configuration change.

## Notes

This README describes the project structure shown in the repository
explorer. Update the example commands and environment-variable names to
match the current `package.json`, `playwright.config.ts`, and test
files.
