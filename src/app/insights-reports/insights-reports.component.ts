import { Component, OnInit } from '@angular/core';
import { AppService, ReportsList } from '../app.service';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PortfolioPerformanceComponent } from "./portfolio-performance/portfolio-performance.component";
import { AssetAllocationComponent } from "./asset-allocation/asset-allocation.component";

@Component({
  selector: 'app-insights-reports',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule, PortfolioPerformanceComponent, AssetAllocationComponent],
  templateUrl: './insights-reports.component.html',
  styleUrl: './insights-reports.component.css'
})
export class InsightsReportsComponent implements OnInit {

  constructor(private dataService: AppService) { }

  ngOnInit() {
    if (this.dataService.reportsList.length === 0) {
      this.fetchReportsList()
    };
  }

  reportClass1 = "block w-full px-4 py-2 text-white bg-blue-700 border-b border-gray-200 rounded-t-lg cursor-pointer dark:bg-gray-800 dark:border-gray-600";
  reportClass2 = "block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white";
  reportClass3 = "block w-full px-4 py-2 text-white bg-blue-700 border-b border-gray-200 cursor-pointer dark:bg-gray-800 dark:border-gray-600";
  reportClass4 = "block w-full px-4 py-2 text-white bg-blue-700 border-b border-gray-200 rounded-b-lg cursor-pointer dark:bg-gray-800 dark:border-gray-600";

  reportsList: ReportsList[] = this.dataService.reportsList;
  reportsListCount = this.dataService.reportsList.length;
  selectedIndex: number = 0;
  selectedReport: number = 0;

  selectReport(index: number, id: number) {
    this.selectedIndex = index;
    this.selectedReport = id;
  }

  fetchReportsList() {
    this.dataService.getAllReportsList().subscribe(
      (data) => {
        this.reportsList = data; // Store response in reportsList
        this.dataService.reportsList = this.reportsList;
        this.selectedReport = this.dataService.reportsList[this.selectedIndex].id;
      },
      (error) => {
        console.error('Error fetching reports:', error);
      }
    );
  }
}