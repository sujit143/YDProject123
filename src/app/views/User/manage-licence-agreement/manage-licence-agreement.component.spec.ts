import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLicenceAgreementComponent } from './manage-licence-agreement.component';

describe('ManageLicenceAgreementComponent', () => {
  let component: ManageLicenceAgreementComponent;
  let fixture: ComponentFixture<ManageLicenceAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageLicenceAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageLicenceAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
