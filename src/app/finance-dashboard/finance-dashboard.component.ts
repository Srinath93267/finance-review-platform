import { Component } from '@angular/core';
import { FinanceTabsComponent } from "../finance-tabs/finance-tabs.component";

@Component({
  selector: 'app-finance-dashboard',
  standalone: true,
  imports: [FinanceTabsComponent],
  templateUrl: './finance-dashboard.component.html',
  styleUrl: './finance-dashboard.component.css'
})
export class FinanceDashboardComponent {

}
