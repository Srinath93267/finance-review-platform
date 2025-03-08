import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportQueueComponent } from './report-queue.component';

describe('ReportQueueComponent', () => {
  let component: ReportQueueComponent;
  let fixture: ComponentFixture<ReportQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportQueueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
