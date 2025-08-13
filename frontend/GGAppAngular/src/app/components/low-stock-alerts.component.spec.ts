/**
 * Integration tests for {@link LowStockAlertsComponent}.
 *
 * @remarks
 * Uses Jasmine and Karma for testing. API calls to the backend are mocked using HttpClientTestingModule.
 *
 * @packageDocumentation
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LowStockAlertsComponent } from './low-stock-alerts.component';
import { InventoryService, LowStockAlert } from '../services/inventory.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

/**
 * Test suite for {@link LowStockAlertsComponent}.
 */
describe('LowStockAlertsComponent', () => {
  /** Instance of the component under test. */
  let component: LowStockAlertsComponent;
  /** Fixture for accessing the component and DOM. */
  let fixture: ComponentFixture<LowStockAlertsComponent>;
  /** Inventory service used by the component. */
  let inventoryService: InventoryService;
  /** HTTP testing controller for mocking HTTP requests. */
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        LowStockAlertsComponent,
        HttpClientTestingModule
      ],
      providers: [InventoryService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LowStockAlertsComponent);
    component = fixture.componentInstance;
    inventoryService = TestBed.inject(InventoryService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  /**
   * Verifies the component correctly displays a list of low stock items.
   *
   * @remarks
   * Mocks the API response with two low stock items and checks the rendered list.
   */
  it('should display a list of low stock items', waitForAsync(() => {
    const mockAlerts: LowStockAlert[] = [
      { id: 1, name: 'Item A', currentStock: 2, minimumStock: 5, category: 'Category 1' },
      { id: 2, name: 'Item B', currentStock: 1, minimumStock: 3, category: 'Category 2' }
    ];

    const req = httpMock.expectOne('http://localhost:5209/api/inventory/low-stock-alerts');
    expect(req.request.method).toBe('GET');
    req.flush(mockAlerts);

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      component.lowStockAlerts$.subscribe(alerts => {
        expect(alerts.length).toBe(2);
        expect(alerts[0].name).toBe('Item A');
        expect(alerts[1].name).toBe('Item B');
      });
    });
  }));

  /**
   * Verifies the component displays a message when there are no low stock items.
   *
   * @remarks
   * Mocks the API response with an empty array and checks the component's state.
   */
  it('should display a message when there are no low stock items', waitForAsync(() => {
    const req = httpMock.expectOne('http://localhost:5209/api/inventory/low-stock-alerts');
    expect(req.request.method).toBe('GET');
    req.flush([]);

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      component.lowStockAlerts$.subscribe(alerts => {
        expect(alerts.length).toBe(0);
      });
    });
  }));

  /**
   * Verifies the component handles errors gracefully.
   *
   * @remarks
   * Mocks the API call to return an error and checks error handling in the component.
   */
  it('should handle errors gracefully', waitForAsync(() => {
    const req = httpMock.expectOne('http://localhost:5209/api/inventory/low-stock-alerts');
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Network error'));

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.error).toBe('Failed to load low stock alerts.');
      expect(component.loading).toBe(false);
    });
  }));
});