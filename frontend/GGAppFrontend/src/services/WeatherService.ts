// src/services/WeatherService.ts

import axios from 'axios';
import API_URL from '../config';

export interface WeatherForecast {
	date: string;
	temperatureC: number;
	temperatureF: number;
	summary: string;
}

export const getWeatherForecast = async (): Promise<WeatherForecast | null> => {
	try {
	  const response = await axios.get<WeatherForecast[]>(`${API_URL}/WeatherForecast`);
	  const data = response.data;
	  const tomorrow = new Date();
	  tomorrow.setDate(tomorrow.getDate() + 1);
	  const tomorrowStr = tomorrow.toISOString().split('T')[0];
	  return data.find(forecast => forecast.date === tomorrowStr) || null;
	} catch (error) {
	  if (axios.isAxiosError(error)) {
		console.error('Network request failed. Unable to fetch weather data: ', error);
	  }
	  return null;
	}
  };