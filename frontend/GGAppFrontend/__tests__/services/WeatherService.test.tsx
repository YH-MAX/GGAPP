/**
 * @format
 */

import 'react-native';
import '../../src/components/WeatherForecast';

import axios from 'axios';
import { WeatherForecast, getWeatherForecast } from '../../src/services/WeatherService';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock Date
jest
  .useFakeTimers()
  .setSystemTime(new Date('2024-08-04'));

// Test that weather forecast data is rendered correctly
describe('WeatherService', () => {
	test('Generates WeatherForecast Object', async () => {

		// Ensure that at least one assertion is called
		expect.assertions(1);
		
		mockedAxios.get.mockResolvedValue({
			data: [
				{
				  "date": "2024-08-05",
				  "temperatureC": -13,
				  "temperatureF": 9,
				  "summary": "Chilly"
				},
				{
				  "date": "2024-08-06",
				  "temperatureC": 15,
				  "temperatureF": 58,
				  "summary": "Mild"
				},
				{
				  "date": "2024-08-07",
				  "temperatureC": 20,
				  "temperatureF": 67,
				  "summary": "Scorching"
				},
				{
				  "date": "2024-08-08",
				  "temperatureC": 32,
				  "temperatureF": 89,
				  "summary": "Chilly"
				},
				{
				  "date": "2024-08-09",
				  "temperatureC": 6,
				  "temperatureF": 42,
				  "summary": "Freezing"
				}
			  ],
			status: 200,
			statusText: 'Ok',
			headers: {},
			config: {},
		});

		const expected: WeatherForecast = {
			date: "2024-08-05",
			temperatureC: -13,
			temperatureF: 9,
			summary: "Chilly"
		};

		// Check that object was correctly returned
		return expect(getWeatherForecast()).resolves.toStrictEqual(expected);
	});
});
