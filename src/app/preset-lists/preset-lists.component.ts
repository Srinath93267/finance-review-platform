import { Component, OnInit } from '@angular/core';
import { AppService, Preset, ReportsList } from '../app.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preset-lists',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preset-lists.component.html',
  styleUrl: './preset-lists.component.css'
})
export class PresetListsComponent implements OnInit {

  ngOnInit() {
    if (this.presets.length === 0) {
      this.fetchPresetsList();
    }
  }

  constructor(private dataService: AppService) { }

  public presets: Preset[] = this.dataService.templates;
  public presetsReports: ReportsList[] = [];
  showPresetReports: boolean = false;
  modalTemplateName: string = "";

  TogglePresetReports(id: number) {
    this.presetsReports = this.presets.filter(item => item.id === id)[0].reports;
    this.modalTemplateName = this.presets.filter(item => item.id === id)[0].name
    this.showPresetReports = !this.showPresetReports;
  }

  DeletePreset(id: number) {
    this.presets = this.presets.filter(preset => preset.id != id);
    this.dataService.deletePreset(id).subscribe(
      (data)=>{
        this.dataService.templates = this.dataService.templates.filter(preset => preset.id != id);
      }
    );
  }

  fetchPresetsList() {
    this.dataService.getAllPresetsList().subscribe(
      (data) => {
        this.presets = data;
        this.dataService.templates = this.presets;
      }
    );
  }
}
