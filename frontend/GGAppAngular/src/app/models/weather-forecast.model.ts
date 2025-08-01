export interface WeatherForecast {
  date: string; // ISO date string from .NET DateOnly
  temperatureC: number;
  temperatureF: number;
  summary: string | null;
}

export interface WeatherForecastResponse {
  forecasts: WeatherForecast[];
  isLoading: boolean;
  error: string | null;
}
