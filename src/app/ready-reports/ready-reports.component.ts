import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-ready-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ready-reports.component.html',
  styleUrl: './ready-reports.component.css'
})
export class ReadyReportsComponent {

  Reports: Reports[] = [
    {
      account: 56789012,
      accountHolder: "Rajesh Sharma",
      reportName: "Portfolio Performance Report",
      dateOfProcess: new Date("2025-01-30")
    },
    {
      account: 23456789,
      accountHolder: "Priya Iyer",
      reportName: "Asset Allocation Report",
      dateOfProcess: new Date("2025-01-29")
    },
    {
      account: 67890123,
      accountHolder: "Anil Verma",
      reportName: "Risk Analysis Report",
      dateOfProcess: new Date("2025-01-28")
    },
    {
      account: 89012345,
      accountHolder: "Kavita Nair",
      reportName: "Investment Projection Report",
      dateOfProcess: new Date("2025-01-27")
    },
    {
      account: 34567890,
      accountHolder: "Sandeep Menon",
      reportName: "Tax Impact Report",
      dateOfProcess: new Date("2025-01-26")
    }
  ];

}

export interface Reports {
  account: number;
  accountHolder: string;
  reportName: string;
  dateOfProcess: Date;
}