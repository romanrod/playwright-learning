Feature: Ecommerce validations

@validation
Scenario: Login error message
  Given I am logged in practise ecommerce with 'user' and 'password'
  Then I should see the message 'bla'