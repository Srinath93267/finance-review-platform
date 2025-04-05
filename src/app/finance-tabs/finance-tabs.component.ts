import { Component, OnInit } from '@angular/core';
import { ReportHistoryComponent } from "../report-history/report-history.component";
import { CommonModule } from "@angular/common";
import { InsightsReportsComponent } from "../insights-reports/insights-reports.component";
import { GenerateReportComponent } from "../generate-report/generate-report.component";
import { PresetsComponent } from "../presets/presets.component";
import { AppService, Account } from '../app.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-finance-tabs',
  standalone: true,
  imports: [ReportHistoryComponent, CommonModule, InsightsReportsComponent, GenerateReportComponent, PresetsComponent, FormsModule],
  templateUrl: './finance-tabs.component.html',
  styleUrl: './finance-tabs.component.css'
})
export class FinanceTabsComponent implements OnInit {

  ngOnInit(): void {
    if (this.appService.AccountSet.accountNumber == 0 && this.appService.AccountSet.clientName == "") {
      this.fetchAccounts();
    }
  }

  constructor(private appService: AppService) { }

  Tabs: string[] = ["Report History", "Reports Insights", "Generate a Report", "Presets", "Settings"];
  selectedTab = this.Tabs[0];

  activeTabClass = "inline-flex items-center px-4 py-3 text-white bg-blue-700 rounded-lg active w-full dark:bg-blue-600";
  inactiveTabClass = "inline-flex items-center px-4 py-3 rounded-lg w-full hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white";

  selectedItem: number | null = 0;

  AccountSet: Account = { accountNumber: 0, clientName: "" };
  Accounts: Account[] = [];
  searchAccounts: boolean = false;
  isLoading:boolean=false;

  accountSearch: string = '';

  selectItem(index: number) {
    this.selectedItem = index;
    this.selectedTab = this.Tabs[index];
  }

  fetchAccounts() {
    this.isLoading=true;
    this.appService.getAccounts().subscribe(data => {
      this.Accounts = data;
      if (data && data.length > 0) {
        this.appService.AccountSet = data[0];
        this.AccountSet = this.appService.AccountSet;
        this.isLoading=false;
      }
      else
      {
        console.error('No Accounts fetched.');
      }
    },
      (error) => {
        // console.error('Error fetching accounts: ', error);
      }
    );
  }

  selectAccount(Account: Account) {
    this.appService.AccountSet = Account;
    this.AccountSet = Account;
    this.searchAccounts = false;
    this.appService.updateAccount(this.AccountSet.accountNumber);
  }

  get filteredAccounts() {
    return this.Accounts.filter(row =>
      Object.values(row).some(val =>
        val.toString().toLowerCase().includes(this.accountSearch.toLowerCase())
      )
    );
  }
}