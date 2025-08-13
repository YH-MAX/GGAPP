import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InventoryService, LowStockAlert } from '../services/inventory.service';
import { CommonModule } from '@angular/common'; 

/**
 * Displays a list of low stock alerts for inventory items.
 *
 * @remarks
 * This component fetches low stock alerts from the backend and presents them in a simple, responsive list.
 * It handles loading, error, and empty states for a clear user experience.
 *
 * @example
 * <app-low-stock-alerts></app-low-stock-alerts>
 */
@Component({
  selector: 'app-low-stock-alerts',
  templateUrl: './low-stock-alerts.component.html',
  styleUrls: ['./low-stock-alerts.component.css'],
  standalone: true,
  imports: [CommonModule],
  providers: [InventoryService]
})
export class LowStockAlertsComponent implements OnInit {
  /**
   * Observable stream of low stock alerts.
   * @remarks
   * Used in the template to display the list of alerts.
   */
  lowStockAlerts$!: Observable<LowStockAlert[]>;

  /**
   * Error message to display if loading fails.
   */
  error = this.inventoryService.error();

  /**
   * Indicates whether the component is currently loading data.
   */
  loading = this.inventoryService.loading();

  /**
   * Creates an instance of LowStockAlertsComponent.
   * @param inventoryService Service for fetching inventory alerts.
   */
  constructor(private inventoryService: InventoryService) {}

  /**
   * Initializes the component and loads low stock alerts.
   * @returns void
   */
  ngOnInit(): void {
    this.lowStockAlerts$ = this.inventoryService.getLowStockAlerts();
  }
}
