import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { LowStockAlertsComponent } from './low-stock-alerts.component';

describe('LowStockAlertsComponent E2E', () => {
  let component: LowStockAlertsComponent;
  let fixture: ComponentFixture<LowStockAlertsComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LowStockAlertsComponent, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LowStockAlertsComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should display low stock alerts like Selenium test', fakeAsync(() => {
    const mockAlerts = [
      { productId: 1, productName: 'Product A', stockLevel: 2, lowStockThreshold: 5 }
    ];

    // Simulate app initialization
    fixture.detectChanges();
    tick();

    // Mock API response
    const req = httpMock.expectOne('/api/inventory/low-stock-alerts');
    req.flush(mockAlerts);
    fixture.detectChanges();
    tick();

    // Wait for element (equivalent to Selenium's wait/until)
    const headerElement = fixture.debugElement.query(By.css('h2'));
    expect(headerElement.nativeElement.textContent).toContain('Low Stock Alerts');

    // Find and verify alert element (equivalent to Selenium's findElement)
    const alertElement = fixture.debugElement.query(By.css('.alert-item'));
    expect(alertElement).toBeTruthy();
    expect(alertElement.nativeElement.textContent).toContain('Product A');
    expect(alertElement.nativeElement.textContent).toContain('Stock Level: 2');
    expect(alertElement.nativeElement.textContent).toContain('Threshold: 5');

    // Assert element is displayed (equivalent to Selenium's isDisplayed)
    expect(alertElement.nativeElement.offsetParent).not.toBeNull();
  }));
});
