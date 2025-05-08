import { Component, Inject, Input, OnInit, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { CommonModule } from "@angular/common";
import { AppService, FinalReport } from '../app.service';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ready-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ready-reports.component.html',
  styleUrl: './ready-reports.component.css'
})
export class ReadyReportsComponent implements OnInit {

  @Input() AccountSet: any;
  isLoading: boolean = false;
  showReportDeletedMessage: boolean = false;
  showReportDeletedErrorMessage: boolean = false;
  showReportRequestedMessage: boolean = false;
  showReportRequestedErrorMessage: boolean = false;
  deletedReportName: string = "";
  requestedReportName: string = "";
  reportSearch: string = '';

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.account = this.appService.AccountSet.accountNumber;
    if (this.appService.AccountSet.accountNumber !== 0 && this.appService.AccountSet.clientName !== "") {
      this.fetchReadyReports();
    }
  }

  constructor(private appService: AppService, @Inject(PLATFORM_ID) private platformId: Object) { }

  fetchReadyReports() {
    this.isLoading = true
    this.appService.getReadyReportsByAccount(this.account).subscribe(data => {
      this.Reports = data as FinalReport[];
      this.Reports.forEach(report => report.pdfUrl = this.GetPDFUrl(report.reportPdf));
      this.Reports.forEach(report => report.lastUpdatedOn = this.GetFormattedDate(report.lastUpdatedOn) || '');
      this.isLoading = false;
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

  GetPDFUrl(reportPdf: string) {
    if (isPlatformBrowser(this.platformId)) {
      var binary_string = window.atob(reportPdf);
      let bytes = new Uint8Array(binary_string.length);
      const mappedData = bytes.map((byte, i) => binary_string.charCodeAt(i));
      let blob = new Blob([mappedData], { type: "application/pdf" });
      let objUrl = window.URL.createObjectURL(blob);
      return objUrl;
    }
    else {
      return null;
    }
  }

  deleteFinalReport(finalReportID: number, finalReportName: string) {
    this.appService.deleteFinalReport(finalReportID).subscribe(response => {
      if (response.status === 200) {
        this.Reports = this.Reports.filter(report => report.finalReportID !== finalReportID);
        this.deletedReportName = finalReportName;
        this.showReportDeletedMessage = true;
        setTimeout(() => {
          this.showReportDeletedMessage = false;
        }, 3000);
      };
    },
      (error) => {
        console.error('Error deleting report:', error);
        this.showReportDeletedErrorMessage = true;
        setTimeout(() => {
          this.showReportDeletedErrorMessage = false;
        }, 3000);
      });
  }

  regenerateFinalReport(finalReportID: number, finalReportName: string) {
    this.appService.regenerateFinalReport(finalReportID).subscribe(response => {
      if (response.status === 200) {
        this.Reports = this.Reports.filter(report => report.finalReportID !== finalReportID);
        this.requestedReportName = finalReportName;
        this.showReportRequestedMessage = true;
        setTimeout(() => {
          this.showReportRequestedMessage = false;
        }, 3000);

      };
    },
      (error) => {
        console.error('Error regenerating report:', error);
        this.showReportRequestedErrorMessage = true;
        setTimeout(() => {
          this.showReportRequestedErrorMessage = false;
        }, 3000);
      });
  }

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