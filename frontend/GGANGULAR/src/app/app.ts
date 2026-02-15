import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LowStockAlertsComponent } from './low-stock-alerts/low-stock-alerts.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LowStockAlertsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly title = signal('GGApp Angular');
}

