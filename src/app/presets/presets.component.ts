import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppService, ReportsList, NewPreset, PresetInfo } from '../app.service';
import { FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { PresetListsComponent } from "../preset-lists/preset-lists.component";


@Component({
  selector: 'app-presets',
  standalone: true,
  imports: [CommonModule, FormsModule, PresetListsComponent],
  templateUrl: './presets.component.html',
  styleUrl: './presets.component.css'
})
export class PresetsComponent implements OnInit {

  ngOnInit(): void {
    if (this.dataService.reportsList.length === 0) {
      this.fetchReportsList();
    };
  }

  myForm!: FormGroup;
  selectAll: boolean = false; // Header checkbox model
  templateName: string = '';
  ErrorMessage: string = '';
  NoTemplateNameErrorMessage = "Please provide a Name for the Preset name.";
  NoReportSelecedforTemplateErrorMessage = "Please select atleast two Reports for the Preset.";
  showTemplateErrorMessage: boolean = false;
  showPresetCreated: boolean = false;
  constructor(private dataService: AppService, private fb: FormBuilder) { }
  showCreatePresetModal: boolean = false;
  PresetReportsList: PresetInfo[] = this.dataService.reportsList.map(details => ({
    reports: details,
    selected: false
  }));
  newPreset: NewPreset = { Name: "", Reports: [], CreatedBy: "" };
  selectetReportsforNewTemplate: ReportsList[] = [];
  submitCreatePresetForm() {
    const selectedRows = this.PresetReportsList.filter(row => row.selected);
    if (this.templateName === '' || this.templateName === null) {
      this.ErrorMessage = this.NoTemplateNameErrorMessage;
      this.showTemplateErrorMessage = true;
      setTimeout(() => {
        this.showTemplateErrorMessage = false;
      }, 3000);
    }
    else if (selectedRows.length === 0) {
      this.ErrorMessage = this.NoReportSelecedforTemplateErrorMessage;
      this.showTemplateErrorMessage = true;
      setTimeout(() => {
        this.showTemplateErrorMessage = false;
      }, 3000);
    }
    else if (selectedRows.length === 1) {
      this.ErrorMessage = this.NoReportSelecedforTemplateErrorMessage;
      this.showTemplateErrorMessage = true;
      setTimeout(() => {
        this.showTemplateErrorMessage = false;
      }, 3000);
    }
    else {
      selectedRows.forEach(item => this.selectetReportsforNewTemplate.push(item.reports));
      //this.dataService.templates.push({ id: Math.random(), name: this.templateName, selected: false, reports: this.selectetReportsforNewTemplate });
      this.createPreset(this.templateName, this.selectetReportsforNewTemplate)
      this.PresetReportsList.forEach(row => row.selected = false);
      this.selectetReportsforNewTemplate = [];
      this.templateName = "";
      this.ToggleCreatePresetModal();
    }

  }

  toggleSelectAll() {
    this.PresetReportsList.forEach(row => row.selected = this.selectAll);
  }

  checkIfAllSelected() {
    this.selectAll = this.PresetReportsList.every(row => row.selected);
  }
  ToggleCreatePresetModal() {
    this.showCreatePresetModal = !this.showCreatePresetModal
  }

  fetchReportsList() {
    this.dataService.getAllReportsList().subscribe(
      (data) => {
        this.dataService.reportsList = data;
        this.PresetReportsList = this.dataService.reportsList.map(details => ({
          reports: details,
          selected: false
        }));
      },
      (error) => {
        console.error('Error fetching reports:', error);
      }
    );
  }

  createPreset(presetName: string, selectedReports: ReportsList[]) {
    this.newPreset = { Name: presetName, Reports: selectedReports, CreatedBy: "" };
    this.dataService.createPreset(this.newPreset).subscribe(data => {
      this.showPresetCreated = true;
      setTimeout(() => {
        this.showPresetCreated = false;
      }, 3000);
    },
      (error) => {

      }
    );
  }
}