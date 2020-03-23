import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourdrsTermsConditionsComponent } from './yourdrs-terms-conditions.component';

describe('YourdrsTermsConditionsComponent', () => {
  let component: YourdrsTermsConditionsComponent;
  let fixture: ComponentFixture<YourdrsTermsConditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourdrsTermsConditionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourdrsTermsConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
