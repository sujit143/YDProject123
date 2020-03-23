import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceGeneralInformationComponent } from './insurance-general-information.component';

describe('InsuranceGeneralInformationComponent', () => {
  let component: InsuranceGeneralInformationComponent;
  let fixture: ComponentFixture<InsuranceGeneralInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceGeneralInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceGeneralInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
