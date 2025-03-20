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
      presetUsed:"",
      dateOfProcess: new Date("2025-01-30").toLocaleDateString("en-GB"),
      mailSent:false
    },
    {
      account: 23456789,
      accountHolder: "Priya Iyer",
      reportName: "Asset Allocation Report",
      presetUsed: "Preset 1",
      dateOfProcess: new Date("2025-01-29").toLocaleDateString("en-GB"),
      mailSent: true
    },
    {
      account: 67890123,
      accountHolder: "Anil Verma",
      reportName: "Risk Analysis Report",
      presetUsed: "Preset 4",
      dateOfProcess: new Date("2025-01-28").toLocaleDateString("en-GB"),
      mailSent: false
    },
    {
      account: 89012345,
      accountHolder: "Kavita Nair",
      reportName: "Investment Projection Report",
      presetUsed: "",
      dateOfProcess: new Date("2025-01-27").toLocaleDateString("en-GB"),
      mailSent: true
    },
    {
      account: 34567890,
      accountHolder: "Sandeep Menon",
      reportName: "Tax Impact Report",
      presetUsed: "Preset 2",
      dateOfProcess: new Date("2025-01-26").toLocaleDateString("en-GB"),
      mailSent: false
    }
  ];

}

export interface Reports {
  account: number;
  accountHolder: string;
  reportName: string;
  dateOfProcess: string;
  presetUsed:string,
  mailSent:boolean
}