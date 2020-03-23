import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHealthInsuranceInfoComponent } from './add-health-insurance-info.component';

describe('AddHealthInsuranceInfoComponent', () => {
  let component: AddHealthInsuranceInfoComponent;
  let fixture: ComponentFixture<AddHealthInsuranceInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHealthInsuranceInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHealthInsuranceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
