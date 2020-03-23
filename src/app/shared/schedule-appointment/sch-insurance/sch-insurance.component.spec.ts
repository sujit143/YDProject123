import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchInsuranceComponent } from './sch-insurance.component';

describe('SchInsuranceComponent', () => {
  let component: SchInsuranceComponent;
  let fixture: ComponentFixture<SchInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
