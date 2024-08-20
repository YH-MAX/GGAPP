/**
 * @format
 */

import 'react-native';
import React from 'react';
import WeatherForecastComponent from '../../src/components/WeatherForecast';
import { WeatherForecast } from '../../src/services/WeatherService';

// Note: test renderer must be required after react-native.
import { render, waitFor } from '@testing-library/react-native';
import { ReactTestInstance } from 'react-test-renderer';

// Set Timeout
jest.setTimeout(60000);

// Mock WeatherService
jest.mock('../../src/services/WeatherService', () => {
	const originalModule = jest.requireActual<typeof import('../../src/services/WeatherService')>('../../src/services/WeatherService');

	return {
		__esModule: true,
		...originalModule,
		getWeatherForecast: jest.fn(async (): Promise<WeatherForecast | null> => {
			return {
				"date": "2024-08-05",
				"temperatureC": -13,
				"temperatureF": 9,
				"summary": "Chilly"
				}
		}),
	};
});

// Test that weather forecast data is rendered correctly
describe('WeatherForecastComponent', () => {
	const renderComponent = () => (render(<WeatherForecastComponent testID="comp_under_test"/>));

	test('Renders Forecast', async () => {
		const { getByText, getByTestId } = renderComponent();

		// Check that component was correctly rendered
		await waitFor(() => {
			expect(getByTestId('comp_under_test')).toBeTruthy();
		});

		await waitFor(() => {
			const title: ReactTestInstance = getByText("Tomorrow's Weather");
			const summary: ReactTestInstance = getByText("Chilly");
			const temp: ReactTestInstance = getByText("Temperature: -13°C / 9°F");

			expect(title).toBeTruthy();
			expect(summary).toBeTruthy();
			expect(temp).toBeTruthy();
		});
	});
});
