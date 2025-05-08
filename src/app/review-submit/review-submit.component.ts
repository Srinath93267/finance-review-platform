import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { AppService, ReportsList, FinalReportRequest, Account } from '../app.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-review-submit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review-submit.component.html',
  styleUrl: './review-submit.component.css'
})
export class ReviewSubmitComponent implements OnInit, AfterViewInit {

  titleOfAnalysis: string = "";  
  reportRecipient: string = "";
  AccountSet: Account = this.appService.AccountSet;
  showFinalReportSubmissionSuccessAlert: boolean = false;
  comments: string = "";

  ngOnInit() {
    this.appService.account.subscribe(updatedData => {
      this.AccountSet = this.appService.AccountSet;
    });
  }

  ngAfterViewInit() {
    initFlowbite();
  }

  selectedReportsList: ReportsList[] = [];
  templateUsed: string = "";
  constructor(private appService: AppService) {
    this.selectedReportsList = this.appService.selectedReportsList;
    this.templateUsed = this.appService.selectedTemplateName !== "" ? this.appService.selectedTemplateName : "None";
  };

  todayDate = new Date().toLocaleDateString("en-US");

  @Output() childEvent = new EventEmitter<string>(); // Declaring EventEmitter

  convertToISOString() {
    const parts = (document.getElementById('default-datepicker') as HTMLInputElement)?.value.split('/');
    if (parts.length !== 3) return '';

    const [month, day, year] = parts.map(part => Number(part));
    if (!month || !day || !year) return '';

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    const date = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds, milliseconds));
    return date.toISOString();
  }

  BackToSelectReports() {
    this.childEvent.emit('Select Reports');
  }

  GenerateReport() {
    const finalReportRequest: FinalReportRequest = {
      accountNumber: this.appService.AccountSet.accountNumber,
      reportTitle: this.titleOfAnalysis,
      reportDate: this.convertToISOString(),
      presetID: this.appService.selectedTemplate,
      createdBy: "Admin",
      reportIDs: this.GetReportIdsfromSelectedReportsList(),
      comments:this.comments==""?null:this.comments,
    };
    this.appService.createNewFinalReportRequest(finalReportRequest).subscribe(response => {
      if (response.status === 200) {
        this.showFinalReportSubmissionSuccessAlert = true;
        setTimeout(() => {
          this.showFinalReportSubmissionSuccessAlert = false;
        }, 3000);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        console.error("Error generating report:", response);
      }
    });
  }

  GetReportIdsfromSelectedReportsList() {
    let reportIds: string = "";
    this.selectedReportsList.forEach((report) => {
      reportIds += report.id + ", ";
    });
    return reportIds.slice(0, -2); // Remove the last comma
  }
}
