import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceFooterComponent } from './finance-footer.component';

describe('FinanceFooterComponent', () => {
  let component: FinanceFooterComponent;
  let fixture: ComponentFixture<FinanceFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinanceFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
