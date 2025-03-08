import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateListsComponent } from './preset-lists.component';

describe('TemplateListsComponent', () => {
  let component: TemplateListsComponent;
  let fixture: ComponentFixture<TemplateListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateListsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplateListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
