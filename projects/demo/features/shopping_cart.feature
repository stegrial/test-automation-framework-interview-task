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
    When user removes first item from cart
    Then cart contains "0" items

  @failing
  Scenario: Remove item from cart
    Given user is logged in as "standard_user"
    When user opens shopping cart
    Then cart contains "0" items
    When user continues shopping
    Then user sees the products page
    When user adds first product to cart
    And user opens shopping cart
    Then cart contains "1" items

  Scenario: Add multiple products to cart, verify total, and remove one item
    Given user is logged in as "standard_user"
    When user adds first product to cart
    And user adds second product to cart
    And user opens shopping cart
    Then cart contains "2" items
    And cart total is greater than zero
    When user removes first item from cart
    Then cart contains "1" items
    And cart total is greater than zero

  Scenario: Sort products by price (low to high) and verify order
    Given user is logged in as "standard_user"
    When user sorts products by price low to high
    Then products are sorted by price low to high

  Scenario: Add a product to cart, continue shopping, add another product
    Given user is logged in as "standard_user"
    When user adds first product to cart
    And user opens shopping cart
    Then cart contains "1" items
    When user continues shopping
    Then user sees the products page
    When user adds second product to cart
    And user opens shopping cart
    Then cart contains "2" items
