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
  reportRecipient: string = "";

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
      reportDate: this.GetDate(),
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

  GetDate() {
    const [month, day, year] = this.todayDate.split("/").map(Number);
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  }
}
