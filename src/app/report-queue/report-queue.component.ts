import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from "@angular/common";
import { AppService, FinalReport } from '../app.service';

@Component({
  selector: 'app-report-queue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-queue.component.html',
  styleUrl: './report-queue.component.css'
})
export class ReportQueueComponent implements OnInit {

  @Input() AccountSet: any;

  ngOnInit() { }
  fetchQueueReports() {
    this.appService.getQueueReportsByAccount(this.account).subscribe(data => {
      this.Reports = data;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.account = this.appService.AccountSet.accountNumber;
    if (this.appService.AccountSet.accountNumber !== 0 && this.appService.AccountSet.clientName !== "") {
      this.fetchQueueReports();
    }
  }

  constructor(private appService: AppService) { }

  Reports: FinalReport[] = [];

  account: number = 0;

}
