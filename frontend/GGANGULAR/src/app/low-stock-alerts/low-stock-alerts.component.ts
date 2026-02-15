import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-low-stock-alerts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="low-stock-container">
      <div class="alerts-header">
        <h2>Low Stock Alerts</h2>
        <button 
          (click)="refreshAlerts()" 
          [disabled]="isLoading()"
          class="btn btn-primary refresh-btn">
          @if (isLoading()) {
            <span class="spinner"></span>
          }
          Refresh
        </button>
      </div>
      
      @if (isLoading()) {
        <div class="loading-container">
          <div class="large-spinner"></div>
          <p>Loading low stock alerts...</p>
        </div>
      } @else if (error()) {
        <div class="error-container">
          <div class="error-content">
            <h3>Error Loading Alerts</h3>
            <p>{{ error() }}</p>
            <div class="error-actions">
              <button (click)="refreshAlerts()" class="btn btn-primary">Try Again</button>
              <button (click)="clearError()" class="btn btn-secondary">Dismiss</button>
            </div>
          </div>
        </div>
      } @else if (alerts().length === 0) {
        <div class="empty-container">
          <div class="empty-content">
            <h3>No Low Stock Alerts</h3>
            <p>All products are adequately stocked.</p>
          </div>
        </div>
      } @else {
        <ul class="alerts-list">
          @for (alert of alerts(); track alert.productId) {
            <li class="alert-item" [class.critical]="alert.stockLevel <= alert.lowStockThreshold / 2">
              <div class="alert-content">
                <div class="product-info">
                  <strong class="product-name">{{ alert.productName }}</strong>
                  <span class="product-id">ID: {{ alert.productId }}</span>
                </div>
                <div class="stock-info">
                  <span class="stock-level" [class.critical]="alert.stockLevel <= alert.lowStockThreshold / 2">
                    Stock Level: {{ alert.stockLevel }}
                  </span>
                  <span class="threshold">
                    Threshold: {{ alert.lowStockThreshold }}
                  </span>
                </div>
              </div>
              <div class="alert-badge" [class.critical]="alert.stockLevel <= alert.lowStockThreshold / 2">
                @if (alert.stockLevel <= alert.lowStockThreshold / 2) {
                  Critical
                } @else {
                  Low Stock
                }
              </div>
            </li>
          }
        </ul>
      }
    </div>
  `,
  styleUrl: './low-stock-alerts.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LowStockAlertsComponent implements OnInit {
  private readonly inventoryService = inject(InventoryService);
  
  // Expose service signals to template
  // all these things are signal, using alerts(), isLoading(), error() in template to access their values
  readonly alerts = this.inventoryService.alerts;
  readonly isLoading = this.inventoryService.isLoading;
  readonly error = this.inventoryService.error;
  // the code below here, we are using the service to fetch data and handle user interactions like refreshing alerts and clearing errors
  ngOnInit(): void {
    this.loadAlerts();
  }
  
  loadAlerts(): void {
    this.inventoryService.getLowStockAlerts();
  }
  
  refreshAlerts(): void {
    this.inventoryService.getLowStockAlerts();
  }
  
  clearError(): void {
    this.inventoryService.clearError();
  }
}
