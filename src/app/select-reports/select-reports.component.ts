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
      this.fetchReportsList()
    };
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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.dataService.selectedReportsList, event.previousIndex, event.currentIndex);
    this.selectedReportsList = this.dataService.selectedReportsList;
  }

  selectReport(index: number, id: number) {
    this.selectedIndex = index;
    this.selectedReport = id;
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
      this.selectedReportsList = this.dataService.selectedReportsList = this.templates.filter(item => item.id === this.selectedTemplate)[0].reports;
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
}