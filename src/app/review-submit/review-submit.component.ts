import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-review-submit',
  standalone: true,
  imports: [],
  templateUrl: './review-submit.component.html',
  styleUrl: './review-submit.component.css'
})
export class ReviewSubmitComponent {
  @Output() childEvent = new EventEmitter<string>(); // Declaring EventEmitter
}
