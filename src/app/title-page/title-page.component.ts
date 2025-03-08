import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-title-page',
  standalone: true,
  imports: [],
  templateUrl: './title-page.component.html',
  styleUrl: './title-page.component.css'
})
export class TitlePageComponent {

  @Output() childEvent = new EventEmitter<string>(); // Declaring EventEmitter
  
  BackToSelectReport() {
    this.childEvent.emit('Select Reports');
  }
}
