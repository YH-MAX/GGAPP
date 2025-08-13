Feature: Low Stock Alerts API

  Scenario: Get low stock alerts - API returns valid array
    Given url 'http://localhost:5000/api/inventory/low-stock-alerts'
    When method GET
    Then status 200
    And match response == '#[]'

  Scenario: API returns empty list when no items are low in stock
    Given url 'http://localhost:5000/api/inventory/low-stock-alerts?threshold=0'
    When method GET
    Then status 200
    And match response == []

  Scenario: Invalid endpoint returns 404
    Given url 'http://localhost:5000/api/inventory/low-stock-alerts-invalid'
    When method GET
    Then status 404
