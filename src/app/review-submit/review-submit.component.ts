import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { AppService, ReportsList, FinalReportRequest } from '../app.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-review-submit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review-submit.component.html',
  styleUrl: './review-submit.component.css'
})
export class ReviewSubmitComponent implements AfterViewInit {

  titleOfAnalysis: string = "";
  reportRecipient:string = "";

  ngAfterViewInit() {
    initFlowbite();
  }
  selectedReportsList: ReportsList[] = [];
  templateUsed: string = "";
  constructor(private appService: AppService) {
    this.selectedReportsList = this.appService.selectedReportsList;
    this.templateUsed = this.appService.selectedTemplateName !== "" ? this.appService.selectedTemplateName : "None";
  };

  @Output() childEvent = new EventEmitter<string>(); // Declaring EventEmitter

  todayDate = new Date().toLocaleDateString("en-US");
  BackToSelectReports() {
    this.childEvent.emit('Select Reports');
  }

  GenerateReport() {
    const finalReportRequest: FinalReportRequest = {
      accountNumber: this.appService.AccountSet.accountNumber,
      reportTitle: this.titleOfAnalysis,
      reportDate: new Date().toISOString(),
      presetID: this.appService.selectedTemplate,
      createdBy: "Admin",
      reportIDs: this.GetReportIdsfromSelectedReportsList()
    };
    this.appService.createNewFinalReportRequest(finalReportRequest).subscribe(response => {
      if (response.status === 200) {
        // this.childEvent.emit('Report Generated'); // Emit the event to the parent component
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
