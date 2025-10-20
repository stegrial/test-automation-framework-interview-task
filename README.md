# Cucumber + Playwright Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-100000?style=for-the-badge&logo=Playwright&logoColor=45BA4B&labelColor=2B3137&color=24282C)
![Cucumber](https://img.shields.io/badge/Cucumber-100000?style=for-the-badge&logo=Cucumber&logoColor=23796C&labelColor=DDDDDD&color=EEEEEE)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

Web Testing and Automation framework built using Cucumber, Playwright, and TypeScript.

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running Tests](#-running-tests)
- [Project Structure](#-project-structure)
- [Adding New Tests](#-adding-new-tests)
- [Contributing](#-contributing)

## 🛠 Tech Stack

- **[Playwright](https://playwright.dev/)** - Modern web testing and automation framework supporting Chromium, Firefox, and WebKit
- **[Cucumber](https://cucumber.io/)** - BDD framework for writing human-readable test scenarios
- **[Node.js](https://nodejs.org/)** - JavaScript runtime environment
- **[TypeScript](https://www.typescriptlang.org/)** - Typed superset of JavaScript

## ✅ Prerequisites

Make sure you have the following installed:

- **Git** - [Download & Install Git](https://git-scm.com/downloads)
  ```bash
  # macOS/Linux with homebrew
  brew install git
  ```

- **Node.js** (v16 or higher) - [Download & Install Node.js](https://nodejs.org/en/download/)
  ```bash
  # macOS/Linux with homebrew
  brew install node
  ```

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/test-automation-framework.git
   cd test-automation-framework
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

That's it! The framework is ready to use.

## 🚀 Running Tests

### Run all tests for a project

```bash
npm run test project="demo"
```

### Run a specific scenario by name

```bash
npm run test project="demo" name="Successful login"
```

You can use any unique substring from the scenario name.

### Run tests in headless mode

```bash
npm run test:headless project="demo"
```

### Run tests in different browsers

By default, tests run in Chromium. To use a different browser:

```bash
# Firefox
npm run test firefox project="demo"

# WebKit (Safari)
npm run test webkit project="demo"
```

### Run tests on different devices

```bash
# Desktop (default)
npm run test desktop project="demo"

# Tablet
npm run test tablet project="demo"

# Mobile
npm run test mobile project="demo"
```

### Combine options

```bash
npm run test firefox mobile project="demo" name="Add product"
```

## 📂 Project Structure

```
.
├── baseline/                 # Shared framework code
│   ├── hooks/               # Cucumber hooks for browser setup
│   ├── pages/               # Base page object classes
│   └── step_definitions/    # Shared step definitions
├── projects/                 # Project-specific test suites
│   └── demo/                # Demo project (example)
│       ├── data/            # Test data and locators
│       │   ├── pages/       # JSON files with element locators
│       │   ├── environments.json  # Environment URLs
│       │   └── users.json   # User credentials
│       ├── features/        # Cucumber feature files
│       ├── hooks/           # Project-specific hooks
│       ├── pages/           # Project page objects
│       └── step_definitions/ # Project step definitions
├── types/                    # TypeScript type definitions
├── utils/                    # Utility functions
├── cucumber.js              # Cucumber configuration
├── package.json             # Node.js dependencies
└── tsconfig.json            # TypeScript configuration
```

### Key Concepts

#### Page Object Model (POM)

The framework uses the Page Object Model design pattern to:
- Separate test logic from page structure
- Reduce code duplication
- Improve maintainability

Each page is represented by a TypeScript class that:
- Extends a base `Page` class from `baseline/pages/`
- Loads element locators from JSON files
- Provides methods for interacting with page elements

#### Locators

Element locators are stored in JSON files (e.g., `data/pages/home_page.data.json`), separate from page objects. This allows you to update locators without changing test logic.

Example:
```json
{
  "loginButton": "//button[@id='login-btn']",
  "usernameInput": "//input[@name='username']"
}
```

## ➕ Adding New Tests

### 1. Create a Feature File

Add a new `.feature` file in `projects/demo/features/`:

```gherkin
Feature: New Feature Name
  As a user
  I want to do something
  So that I achieve a goal

  Scenario: Scenario description
    Given user opens the home page
    When user performs an action
    Then user sees expected result
```

### 2. Add Locators (if needed)

If your test needs new elements, add them to the appropriate JSON file in `projects/demo/data/pages/`:

```json
{
  "newElement": "//div[@id='new-element']"
}
```

### 3. Create/Update Page Object (if needed)

If you need new page methods, add them to the appropriate page class in `projects/demo/pages/`:

```typescript
async performNewAction() {
  await this.clickElement('newElement');
}
```

### 4. Add Step Definitions (if needed)

If you're using new Gherkin steps, add them to `projects/demo/step_definitions/common.steps.ts`:

```typescript
When('user performs an action', async function() {
  await somePage.performNewAction();
});
```

### 5. Run Your Test

```bash
npm run test project="demo" name="New Feature"
```

## 🤝 Contributing

### Code Style

- Follow existing code patterns
- Use meaningful variable and function names
- Add JSDoc comments for functions
- Keep step definitions reusable

### Testing Your Changes

Before committing:

1. Run all tests to ensure nothing is broken:
   ```bash
   npm run test project="demo"
   ```

2. Test in different browsers if relevant:
   ```bash
   npm run test firefox project="demo"
   npm run test webkit project="demo"
   ```

### Common Issues

**Issue:** Tests fail with "element not found"
- **Solution:** Check if locators in JSON files are correct. Update them if the page structure changed.

**Issue:** TypeScript compilation errors
- **Solution:** Ensure all imports are correct and types are properly defined.

**Issue:** Browser doesn't launch
- **Solution:** Run `npx playwright install` to ensure browsers are installed.

## 📝 Additional Notes

- The framework supports running tests in parallel for faster execution
- Test results can be viewed in the console output
- Failed tests will display detailed error messages and stack traces
- Screenshots can be captured on failure (configure in hooks)

## 🆘 Getting Help

If you encounter issues:
1. Check the error message carefully
2. Review the relevant feature file, step definitions, and page objects
3. Verify locators are correct for the current page version
4. Check that all dependencies are installed (`npm install`)

---

Happy Testing! 🎉
