# QA Automation Engineer - Technical Assignment

Welcome! This assignment will help us evaluate your skills in test automation using Cucumber and Playwright.

## 📋 Assignment Overview

You will be working with an existing test automation framework that uses:
- **Cucumber** for BDD test scenarios
- **Playwright** for browser automation
- **TypeScript** for type-safe code
- **Page Object Model** design pattern

## 🎯 Your Tasks

### Task 1: Setup and Familiarization (15-20 minutes)

1. **Set up the project**
   - Clone the repository
   - Install all dependencies
   - Run the existing test suite
   - Document any issues you encounter during setup

2. **Explore the framework**
   - Review the project structure
   - Understand how tests are organized
   - Identify the key components (pages, steps, features, data)

3. **Questions to answer** (in your submission):
   - What is the purpose of the `baseline` folder?
   - How are element locators managed in this framework?
   - What are the benefits of separating locators from page objects?

### Task 2: Debug and Fix a Failing Test (30-45 minutes)

There is a failing test in the test suite that is marked with the `@failing` tag.

**Your objectives:**

1. **Identify the failing test**
   - Run the test suite and locate the failing scenario
   - Hint: Look in the `shopping_cart.feature` file

2. **Investigate the failure**
   - Run the failing test in non-headless mode to observe the behavior
   - Analyze the test steps, expected behavior, and actual behavior
   - Review the relevant page objects and step definitions

3. **Document your findings**
   Create a brief document (markdown or text) that includes:
   - Description of the failing test
   - Root cause of the failure
   - Why this failure occurred
   - Your proposed solution

4. **Fix the test**
   - Implement your solution
   - Verify the test now passes
   - Ensure other tests are not affected

### Task 3: Write a New End-to-End Test (45-60 minutes)

Create a new comprehensive test scenario that is not currently covered.

**Requirements:**

1. **Choose one of these scenarios** (or propose your own):
   - **Scenario A**: Add multiple products to cart, verify total, and remove one item
   - **Scenario B**: Sort products by price (low to high) and verify order
   - **Scenario C**: Add a product to cart, continue shopping, add another product
   - **Your own idea**: Any meaningful user flow not yet tested

2. **Implementation steps:**
   - Write the feature file with proper Gherkin syntax
   - Add any new element locators needed
   - Create or extend page object methods
   - Implement step definitions
   - Ensure the test is readable and maintainable

3. **Best practices to follow:**
   - Use clear, business-readable language in your feature file
   - Follow the existing code structure and conventions
   - Keep step definitions reusable and atomic
   - Add appropriate waits and assertions
   - Test should be independent and not rely on previous test state

### Task 4: Code Review and Improvements (Optional - Bonus Points)

If time permits, review the existing codebase and suggest improvements:

1. **Code quality:**
   - Are there any code smells or anti-patterns?
   - Can you spot any potential bugs or race conditions?
   - Is error handling adequate?

2. **Framework improvements:**
   - What features would make this framework better?
   - Are there any missing utilities or helpers?
   - How could test maintenance be simplified?

3. **Documentation:**
   - Is anything unclear in the README?
   - What additional documentation would be helpful?

## 📤 Submission Guidelines

Please submit the following:

1. **Your code changes**
   - All modified and new files
   - Preferably as a Git repository or patch file

2. **Documentation**
   - Task 2: Your investigation document (markdown/PDF)
   - Task 3: Brief explanation of your test scenario choice
   - Task 4: (If completed) List of suggestions with explanations

3. **Test execution evidence**
   - Screenshot or console output showing all tests passing
   - Any relevant browser screenshots

4. **Time log** (optional but appreciated)
   - How long each task took
   - Any blockers or challenges faced

## ⏰ Time Expectations

- **Total estimated time**: 2-3 hours
- You can split this across multiple sessions
- Focus on quality over speed
- Don't hesitate to make assumptions (just document them)

## 💡 Tips for Success

- **Read the README carefully** - it contains all the information you need
- **Run tests frequently** - verify your changes work as expected
- **Keep it simple** - don't over-engineer solutions
- **Ask questions** - if assignment requirements are unclear, make reasonable assumptions and document them
- **Time management** - if stuck, move on and come back later
- **Test in different browsers** - if you have time, verify cross-browser compatibility

## 🚀 Getting Started

1. Read through the README.md file
2. Set up the project following installation instructions
3. Run the demo tests: `npm run test project="demo"`
4. Start with Task 1 and work through sequentially

## ❓ Questions?

If you have questions about the assignment:
- Document your assumptions and proceed
- Include questions in your submission document
- We can discuss them during the follow-up interview

---

**Good luck! We're excited to see your work! 🎉**

