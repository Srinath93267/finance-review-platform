import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { AppService, ReportsList, Preset } from '../app.service';

@Component({
  selector: 'app-select-reports',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag],
  templateUrl: './select-reports.component.html',
  styleUrl: './select-reports.component.css'
})
export class SelectReportsComponent implements OnInit {

  constructor(private dataService: AppService) { }

  ngOnInit() {
    if (this.dataService.reportsList.length === 0) {
      this.fetchReportsList();
    };
    if (this.dataService.templates.length === 0) {
      this.fetchPresetsList();
    }
    this.dataService.account.subscribe(updatedData => {
      this.getReport();
    });
  }

  @Output() childEvent = new EventEmitter<string>(); // Declaring EventEmitter

  reportClass1 = "block w-full px-4 py-2 text-white bg-blue-700 border-b border-gray-200 rounded-t-lg cursor-pointer dark:bg-gray-800 dark:border-gray-600";
  reportClass2 = "block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white";
  reportClass3 = "block w-full px-4 py-2 text-white bg-blue-700 border-b border-gray-200 cursor-pointer dark:bg-gray-800 dark:border-gray-600";
  reportClass4 = "block w-full px-4 py-2 text-white bg-blue-700 border-b border-gray-200 rounded-b-lg cursor-pointer dark:bg-gray-800 dark:border-gray-600";

  templates: Preset[] = this.dataService.templates;

  reportsList: ReportsList[] = this.dataService.reportsList;
  reportsListCount = this.dataService.reportsList.length;
  selectedIndex: number = 0;
  selectedReport: number = 0;
  selectedReportsList: ReportsList[] = this.dataService.selectedReportsList;
  showReportAlreadyAdded: boolean = false;
  selectedTemplate: number = this.dataService.selectedTemplate;
  selectedTemplateName=this.dataService.selectedTemplateName;

  reportResponse: any = {};
  report: string = ""

  showReport: boolean = false;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.dataService.selectedReportsList, event.previousIndex, event.currentIndex);
    this.selectedReportsList = this.dataService.selectedReportsList;
  }

  selectReport(index: number, id: number) {
    this.selectedIndex = index;
    this.selectedReport = id;
    this.getReport();
  }

  AddtoReportList() {
    if (!this.dataService.selectedReportsList.find(item => item.id === this.selectedReport)) {
      this.dataService.selectedReportsList.push({ id: this.selectedReport, name: this.reportsList[this.selectedIndex].name });
      this.selectedReportsList = this.dataService.selectedReportsList;
    }
    else {
      this.showReportAlreadyAdded = true;
      setTimeout(() => {
        this.showReportAlreadyAdded = false;
      }, 3000);
    }
  }

  MoveToTitlePage() {
    this.childEvent.emit('Title Page');
  }

  removeReport(id: number) {
    this.selectedReportsList = this.dataService.selectedReportsList = this.dataService.selectedReportsList.filter(item => item.id !== id);
  }

  selectTemplate(value: any) {
    try {
      this.selectedTemplate = this.dataService.selectedTemplate = Number(value.target.value);
      this.selectedTemplateName = this.dataService.selectedTemplateName =this.templates.filter(template=>template.id===this.selectedTemplate)[0].name;
      this.selectedReportsList = this.dataService.selectedReportsList = this.templates.
      filter(item => item.id === this.selectedTemplate)[0].reports;
    }
    catch (err) {
      console.error(err);
    }
  }

  fetchReportsList() {
    this.dataService.getAllReportsList().subscribe(
      (data) => {
        this.reportsList = data; // Store response in reportsList
        this.dataService.reportsList = this.reportsList;
        this.selectedReport = this.dataService.reportsList[this.selectedIndex].id;
      },
      (error) => {
        console.error('Error fetching reports:', error);
      }
    );
  }

  fetchPresetsList() {
    this.dataService.getAllPresetsList().subscribe(
      (data) => {
        this.templates = data; // Store response in templates
        this.dataService.templates = this.templates;
      },
      (error) => {
        console.error('Error fetching templates:', error);
      }
    );
  }

  getReport() {
    const pdfElement = document.getElementById("pdf");
    if (pdfElement) {
      pdfElement.style.display = "none";
      pdfElement.removeAttribute("src");
    }
    this.showReport = false;
    const account = this.dataService.AccountSet.accountNumber;
    this.dataService.getReport(account, this.selectedReport).subscribe(
      (data) => {
        this.showReport = true;
        this.reportResponse = data;
        this.report = this.reportResponse.Report;
        document.getElementById("pdf")?.setAttribute("src", this.report + "#toolbar=0&navpanes=0&scrollbar=0&view=FitH");
        const pdfElement = document.getElementById("pdf");
        if (pdfElement) {
          pdfElement.style.display = "block";
        }
      },
      (error) => {
        console.error('Error fetching report:', error);
      }
    );
  }
}