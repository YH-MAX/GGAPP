import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

/**
 * Represents a low stock alert for an inventory item.
 *
 * @remarks
 * Used to display product details and stock status in the UI.
 */
export interface LowStockAlert {
  productId: number;
  productName: string;
  stock: number;
  lowStockThreshold: number;
}

/**
 * Service for fetching inventory data from the backend API.
 *
 * @remarks
 * Uses Angular HttpClient for HTTP requests. Intended for use in Angular components.
 */
@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private readonly http = inject(HttpClient);
  
  // API Configuration - pointing to your backend server
  private readonly apiUrl = 'http://localhost:5209/api/inventory/low-stock-alerts';
  
  // Signals for reactive state management
  private readonly _lowStockAlerts = signal<LowStockAlert[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  // Public readonly signals
  public readonly lowStockAlerts = this._lowStockAlerts.asReadonly();
  public readonly loading = this._loading.asReadonly();
  public readonly error = this._error.asReadonly();

  // Computed signal for checking if there are alerts
  public readonly hasAlerts = computed(() => this._lowStockAlerts().length > 0);

  /**
   * Retrieves a list of low stock alerts from the backend.
   *
   * @returns Promise resolving to an array of {@link LowStockAlert} objects.
   *
   * @example
   * const alerts = await inventoryService.getLowStockAlerts();
   * // alerts: [{ id: 1, name: 'Widget', currentStock: 3, minimumStock: 5, category: 'Electronics' }, ...]
   */
  getLowStockAlerts(): Observable<LowStockAlert[]> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.get<LowStockAlert[]>(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching low stock alerts:', error);
        this._error.set('Failed to load low stock alerts.');
        return of([] as LowStockAlert[]);
      }),
      finalize(() => this._loading.set(false))
    );
  }
}
