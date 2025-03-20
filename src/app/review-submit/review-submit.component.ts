import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { Datepicker, initFlowbite } from 'flowbite';

@Component({
  selector: 'app-review-submit',
  standalone: true,
  imports: [],
  templateUrl: './review-submit.component.html',
  styleUrl: './review-submit.component.css'
})
export class ReviewSubmitComponent implements AfterViewInit {
  ngAfterViewInit() {
    initFlowbite();
  }
  @Output() childEvent = new EventEmitter<string>(); // Declaring EventEmitter
}
