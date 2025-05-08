import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from "@angular/common";
import { AppService, FinalReport } from '../app.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report-queue',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report-queue.component.html',
  styleUrl: './report-queue.component.css'
})
export class ReportQueueComponent implements OnInit {

  @Input() AccountSet: any;
  reportSearch: string = '';

  ngOnInit() { }
  fetchQueueReports() {
    this.appService.getQueueReportsByAccount(this.account).subscribe(data => {
      this.Reports = data;
      this.Reports.forEach(report => report.lastUpdatedOn = this.GetFormattedDate(report.lastUpdatedOn) || '');
    });
  }

  GetFormattedDate(dateString: string) {
    if (dateString) {
      const date = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return date.toLocaleDateString('en-US', options);
    }
    return null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.account = this.appService.AccountSet.accountNumber;
    if (this.appService.AccountSet.accountNumber !== 0 && this.appService.AccountSet.clientName !== "") {
      this.fetchQueueReports();
    }
  }

  constructor(private appService: AppService) { }

  get filteredReports() {
    return this.Reports.filter(row =>
      Object.values(row).some(val =>
        val.toString().toLowerCase().includes(this.reportSearch.toLowerCase())
      )
    );
  }

  Reports: FinalReport[] = [];
  account: number = 0;

}
