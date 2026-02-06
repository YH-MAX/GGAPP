import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { LowStockAlert } from '../src/app/models/low-stock-alert.ts';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private readonly http = HttpClient.inject(HttpClient);
  
  // Signals for reactive state management
  private readonly _alerts = signal<LowStockAlert[]>([]);
  private readonly _isLoading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);
  
  // Public readonly signals
  readonly alerts = this._alerts.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly error = this._error.asReadonly();
  
  getLowStockAlerts(): void {
    this._isLoading.set(true);
    this._error.set(null);
    
    this.http.get<LowStockAlert[]>('/api/inventory/low-stock-alerts')
      .pipe(
        catchError(error => {
          console.error('Error fetching low stock alerts:', error);
          this._error.set('Failed to load low stock alerts');
          return of([]);
        }),
        finalize(() => this._isLoading.set(false))
      )
      .subscribe(alerts => {
        this._alerts.set(alerts);
      });
  }
  
  clearError(): void {
    this._error.set(null);
  }
}