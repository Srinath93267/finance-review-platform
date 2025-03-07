import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceDrawerComponent } from './finance-drawer.component';

describe('FinanceDrawerComponent', () => {
  let component: FinanceDrawerComponent;
  let fixture: ComponentFixture<FinanceDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceDrawerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinanceDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
