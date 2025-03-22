import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ReadyReportsComponent } from "../ready-reports/ready-reports.component";
import { ReportQueueComponent } from "../report-queue/report-queue.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report-history',
  standalone: true,
  imports: [ReadyReportsComponent, ReportQueueComponent, CommonModule],
  templateUrl: './report-history.component.html',
  styleUrl: './report-history.component.css'
})
export class ReportHistoryComponent implements OnChanges {

  @Input() AccountSet: any;

  readyReports_Tab: boolean = false;
  reportQueue_Tab: boolean = true;

  ngOnChanges(changes: SimpleChanges): void { }
}
