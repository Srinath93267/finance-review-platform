import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { AppService, ReportsList } from '../app.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-submit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-submit.component.html',
  styleUrl: './review-submit.component.css'
})
export class ReviewSubmitComponent implements AfterViewInit {

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
  BackToTitlePage() {
    this.childEvent.emit('Title Page');
  }
}
