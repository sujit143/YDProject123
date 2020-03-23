import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePracticeReferralComponent } from './manage-practice-referral.component';

describe('ManagePracticeReferralComponent', () => {
  let component: ManagePracticeReferralComponent;
  let fixture: ComponentFixture<ManagePracticeReferralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePracticeReferralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePracticeReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
