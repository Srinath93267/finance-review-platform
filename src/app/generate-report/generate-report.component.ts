import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectReportsComponent } from "../select-reports/select-reports.component";
import { TitlePageComponent } from "../title-page/title-page.component";
import { ReviewSubmitComponent } from "../review-submit/review-submit.component";
import { AppService, Reportflow } from '../app.service';

@Component({
  selector: 'app-generate-report',
  standalone: true,
  imports: [CommonModule, SelectReportsComponent, TitlePageComponent, ReviewSubmitComponent],
  templateUrl: './generate-report.component.html',
  styleUrl: './generate-report.component.css'
})
export class GenerateReportComponent {

  constructor(private dataService: AppService) { }

  selectedComponent: number = 0;

  flow: Reportflow[] = this.dataService.flow;

  receiveFlow(data: string) {
    this.dataService.flow.forEach(item => item.name === data ? item.selected = true : item.selected = false);
    this.flow = this.dataService.flow;
  }
}