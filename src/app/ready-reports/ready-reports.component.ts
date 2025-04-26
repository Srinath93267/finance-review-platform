import { Component, Inject, Input, OnInit, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { CommonModule } from "@angular/common";
import { AppService, FinalReport } from '../app.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-ready-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ready-reports.component.html',
  styleUrl: './ready-reports.component.css'
})
export class ReadyReportsComponent implements OnInit {

  @Input() AccountSet: any;
  isLoading: boolean = false;

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
      this.isLoading = false;
    });
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

  Reports: FinalReport[] = [];
  account: number = 0;

}