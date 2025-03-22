import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from "@angular/common";
import { AppService, FinalReport } from '../app.service';

@Component({
  selector: 'app-ready-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ready-reports.component.html',
  styleUrl: './ready-reports.component.css'
})
export class ReadyReportsComponent implements OnInit {

  @Input() AccountSet: any;

  ngOnInit() { }
  fetchFinalReports() {
    this.appService.getFinalReportsByAccount(this.account).subscribe(data => {
      this.Reports = data;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.account = this.appService.AccountSet.accountNumber;
    if (this.appService.AccountSet.accountNumber !== 0 && this.appService.AccountSet.clientName !== "") {
      this.fetchFinalReports();
    }
  }

  constructor(private appService: AppService) { }

  Reports: FinalReport[] = [];

  account: number = 0;

}