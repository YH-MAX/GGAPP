import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { WeatherForecast } from '../models/weather-forecast.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly http = inject(HttpClient);
  
  // API Configuration
  private readonly apiUrl = 'http://localhost:5209/api/WeatherForecast';
  
  // Signal-based state management
  private readonly _forecasts = signal<WeatherForecast[]>([]);
  private readonly _isLoading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);
  
  // Public readonly signals
  readonly forecasts = this._forecasts.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly error = this._error.asReadonly();
  
  // Computed signals for derived state
  readonly hasForecasts = computed(() => this._forecasts().length > 0);
  readonly hasError = computed(() => this._error() !== null);
  readonly isEmpty = computed(() => !this._isLoading() && !this.hasForecasts() && !this.hasError());
  
  // Get weather forecasts from the API
  getWeatherForecasts(): void {
    this._isLoading.set(true);
    this._error.set(null);
    
    this.http.get<WeatherForecast[]>(this.apiUrl)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Weather API Error:', error);
          let errorMessage = 'Failed to load weather data';
          
          if (error.status === 0) {
            errorMessage = 'Unable to connect to weather service. Please check if the backend is running.';
          } else if (error.status >= 400 && error.status < 500) {
            errorMessage = 'Weather service request failed. Please try again.';
          } else if (error.status >= 500) {
            errorMessage = 'Weather service is temporarily unavailable. Please try again later.';
          }
          
          this._error.set(errorMessage);
          return of([]); // Return empty array on error
        }),
        finalize(() => {
          this._isLoading.set(false);
        })
      )
      .subscribe({
        next: (forecasts) => {
          this._forecasts.set(forecasts);
        }
      });
  }
  
  // Refresh weather data
  refreshWeatherForecasts(): void {
    this.getWeatherForecasts();
  }
  
  // Clear error state
  clearError(): void {
    this._error.set(null);
  }
  
  // Reset all state
  reset(): void {
    this._forecasts.set([]);
    this._isLoading.set(false);
    this._error.set(null);
  }
  
  // Get temperature color based on Celsius value
  getTemperatureColor(temperatureC: number): string {
    if (temperatureC <= 0) return 'var(--info-color)'; // Blue for freezing
    if (temperatureC <= 10) return 'var(--primary-color)'; // Blue for cold
    if (temperatureC <= 20) return 'var(--success-color)'; // Green for mild
    if (temperatureC <= 30) return 'var(--warning-color)'; // Orange for warm
    return 'var(--error-color)'; // Red for hot
  }
  
  // Format date for display
  formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  }
}
