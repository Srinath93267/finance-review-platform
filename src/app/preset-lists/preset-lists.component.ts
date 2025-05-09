import { Component, OnInit } from '@angular/core';
import { AppService, Preset, PresetInfo, ReportsList } from '../app.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-preset-lists',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './preset-lists.component.html',
  styleUrl: './preset-lists.component.css'
})
export class PresetListsComponent implements OnInit {
  isDataLoading: boolean = false;

  ngOnInit() {
    if (this.presets.length === 0) {
      this.fetchPresetsList();
    }
    if (this.dataService.reportsList.length === 0) {
      this.fetchReportsList();
    };
  }

  constructor(private dataService: AppService) {

  }

  presets: Preset[] = this.dataService.templates;
  presetsReports: ReportsList[] = [];
  showPresetReports: boolean = false;
  editPresetReports: boolean = false;
  modalTemplateName: string = "";
  reportList1: PresetInfo[] = this.dataService.reportsList.map(details => ({
    reports: details,
    selected: false
  }));
  reportList2: PresetInfo[] = [];
  reportList3: PresetInfo[] = [];
  selectAll: boolean = false; // Header checkbox model
  showEditPresetErrorMessage: boolean = false;
  showEditPresetSuccessMessage: boolean = false;
  showDeletePresetSuccessMessage:boolean = false;

  ToggleShowPresetReports(id: number) {
    this.presetsReports = this.presets.filter(item => item.id === id)[0].reports;
    this.modalTemplateName = this.presets.filter(item => item.id === id)[0].name;
    this.showPresetReports = !this.showPresetReports;
  }

  ToggleEditPresetReports(id: number) {
    this.presetsReports = this.presets.filter(item => item.id === id)[0].reports;
    this.modalTemplateName = this.presets.filter(item => item.id === id)[0].name;
    const idsToSelect = new Set(this.presetsReports.map(item => item.id));
    this.reportList2 = this.reportList1.map(item => ({
      ...item,
      selected: idsToSelect.has(item.reports.id),
    }));
    this.reportList3 = this.reportList1.map(item => ({
      ...item,
      selected: idsToSelect.has(item.reports.id),
    }));
    this.editPresetReports = !this.editPresetReports;
  }

  toggleSelectAll() {
    this.reportList2.forEach(row => row.selected = this.selectAll);
  }

  checkIfAllSelected() {
    this.selectAll = this.reportList2.every(row => row.selected);
  }

  async updatePreset() {
    if (JSON.stringify(this.reportList2) !== JSON.stringify(this.reportList3)) {
      const alreadySelectedReportIds = new Set(this.presetsReports.map(item => item.id));
      const newSelectReports = this.reportList2.filter(item => item.selected === true && alreadySelectedReportIds.has(item.reports.id) === false);
      const removedSelectReports = this.reportList2.filter(item => item.selected === false && alreadySelectedReportIds.has(item.reports.id) === true);
      await this.callUpdatePreset(this.presets.filter(item => item.name === this.modalTemplateName)[0].id, newSelectReports, removedSelectReports);
      this.editPresetReports = !this.editPresetReports;
      this.reset();
    }
    else {
      this.showEditPresetErrorMessage = true;
      setTimeout(() => {
        this.showEditPresetErrorMessage = false;
      }, 3000);
    }
  }

  reset() {
    this.reportList2 = [];
    this.reportList3 = [];
  }

  DeletePreset(id: number) {
    this.modalTemplateName = this.presets.filter(item => item.id === id)[0].name
    this.dataService.deletePreset(id).subscribe((response) => {
      if (response.status === 200) {
        this.presets = this.presets.filter(preset => preset.id != id);
        this.dataService.templates = this.dataService.templates.filter(preset => preset.id != id);
        this.showDeletePresetSuccessMessage = true;
        setTimeout(() => {
          this.showDeletePresetSuccessMessage = false;
        }, 3000);
      }
    }
    );
  }

  async callUpdatePreset(id: number, newSelectReports: PresetInfo[], removedSelectReports: PresetInfo[]) {
    await this.dataService.updatePreset(id, newSelectReports, removedSelectReports).subscribe(response => {
      if (response.status === 200) {
        this.showEditPresetSuccessMessage = true;
        setTimeout(() => {
          this.showEditPresetSuccessMessage = false;
        }, 3000);
        this.fetchPresetsList();
      }
    });
  }

  fetchPresetsList() {
    this.isDataLoading = true;
    this.dataService.getAllPresetsList().subscribe(
      (data) => {
        this.presets = data;
        this.dataService.templates = this.presets;
        this.isDataLoading = false;
      }
    );
  }

  fetchReportsList() {
    this.dataService.getAllReportsList().subscribe(
      (data) => {
        this.dataService.reportsList = data;
        this.reportList1 = this.dataService.reportsList.map(details => ({
          reports: details,
          selected: false
        }));
      },
      (error) => {
        console.error('Error fetching reports:', error);
      }
    );
  }
}