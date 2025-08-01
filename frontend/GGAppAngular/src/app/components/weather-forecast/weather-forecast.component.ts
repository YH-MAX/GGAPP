import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather-forecast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-forecast.component.html',
  styleUrl: './weather-forecast.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherForecastComponent implements OnInit {
  private readonly weatherService = inject(WeatherService);
  
  // Expose service signals to template
  readonly forecasts = this.weatherService.forecasts;
  readonly isLoading = this.weatherService.isLoading;
  readonly error = this.weatherService.error;
  readonly hasForecasts = this.weatherService.hasForecasts;
  readonly hasError = this.weatherService.hasError;
  readonly isEmpty = this.weatherService.isEmpty;
  
  ngOnInit(): void {
    this.loadWeatherData();
  }
  
  loadWeatherData(): void {
    this.weatherService.getWeatherForecasts();
  }
  
  refreshData(): void {
    this.weatherService.refreshWeatherForecasts();
  }
  
  clearError(): void {
    this.weatherService.clearError();
  }
  
  getTemperatureColor(temperatureC: number): string {
    return this.weatherService.getTemperatureColor(temperatureC);
  }
  
  formatDate(dateString: string): string {
    return this.weatherService.formatDate(dateString);
  }
}
