Feature: User Authentication
  As a user
  I want to be able to log in to the application
  So that I can access my account

  Scenario: Successful login with valid credentials
    Given user opens the home page
    When user logs in as "standard_user"
    Then user sees the products page

  Scenario: Login fails with locked out user
    Given user opens the home page
    When user logs in as "locked_out_user"
    Then user sees error message

  Scenario: User can logout successfully
    Given user is logged in as "standard_user"
    When user logs out
    Then user sees the login page

