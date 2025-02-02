import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { FinanceDrawerComponent } from "./finance-drawer/finance-drawer.component";
import { FinanceFooterComponent } from "./finance-footer/finance-footer.component";
import { CommonModule, isPlatformBrowser } from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FinanceDrawerComponent, FinanceFooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'finance-review-platform';
  isLoading = false;
  
  constructor(public router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    this.isLoading = true;
    if (isPlatformBrowser(this.platformId)) initFlowbite();
    this.isLoading = false;
  }
  
}
