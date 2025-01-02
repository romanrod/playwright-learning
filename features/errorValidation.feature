@validation
Feature: Ecommerce validations

Scenario: Login error message
  Given I am logged in practise ecommerce with 'user' and 'password'
  Then I should see the message 'bla'

Scenario Outline: Login error messages
  Given I am logged in practise ecommerce with '<username>' and '<password>'
  Then I should see the message '<message>'

  Examples:
    | username | password | message                       |
    | someone  | 1234     | Incorrect username/password.  |
    | someone  | 1234     | failed                        |  