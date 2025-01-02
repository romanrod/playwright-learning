Feature: Add product to cart

@regression
Scenario: Add product to cart 
  Given I am logged in as a customer with 'roman.g.rodriguez@gmail.com' and 'password'
  When I add 'ADIDAS ORIGINAL' product to the cart
  Then the product should be in the carts