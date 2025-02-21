import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightsReportsComponent } from './insights-reports.component';

describe('InsightsReportsComponent', () => {
  let component: InsightsReportsComponent;
  let fixture: ComponentFixture<InsightsReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsightsReportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsightsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
