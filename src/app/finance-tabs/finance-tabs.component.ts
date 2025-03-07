import { Component } from '@angular/core';
import { ReportHistoryComponent } from "../report-history/report-history.component";
import { CommonModule } from "@angular/common";
import { InsightsReportsComponent } from "../insights-reports/insights-reports.component";
import { GenerateReportComponent } from "../generate-report/generate-report.component";
import { PresetsComponent } from "../presets/presets.component";

@Component({
  selector: 'app-finance-tabs',
  standalone: true,
  imports: [ReportHistoryComponent, CommonModule, InsightsReportsComponent, GenerateReportComponent, PresetsComponent],
  templateUrl: './finance-tabs.component.html',
  styleUrl: './finance-tabs.component.css'
})
export class FinanceTabsComponent {

  Tabs: string[] = ["Report History", "Reports Insights", "Generate a Report", "Presets", "Settings"];
  selectedTab = this.Tabs[0];

  activeTabClass = "inline-flex items-center px-4 py-3 text-white bg-blue-700 rounded-lg active w-full dark:bg-blue-600";
  inactiveTabClass = "inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white";

  selectedItem: number | null = 0;

  selectItem(index: number) {
    this.selectedItem = index;
    this.selectedTab = this.Tabs[index];
  }
}
