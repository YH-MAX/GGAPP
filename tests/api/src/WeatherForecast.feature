Feature: Weather forecast API

Scenario: Get weather forecast
	Given url 'http://localhost:5000/api/WeatherForecast'
	When method get
	Then status 200
	And match response == '#[]'