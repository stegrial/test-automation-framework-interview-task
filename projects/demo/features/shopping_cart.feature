Feature: Shopping Cart
  As a user
  I want to manage items in my shopping cart
  So that I can purchase products

  Scenario: Add product to cart
    Given user is logged in as "standard_user"
    When user adds first product to cart
    Then shopping cart badge shows "1" items

  Scenario: View cart with added items
    Given user is logged in as "standard_user"
    When user adds first product to cart
    And user opens shopping cart
    Then cart contains "1" items

  @failing
  Scenario: Remove item from cart
    Given user is logged in as "standard_user"
    When user adds first product to cart
    And user opens shopping cart
    And user removes first item from cart
    Then cart contains "1" items

