import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralSourceComponent } from './referral-source.component';

describe('ReferralSourceComponent', () => {
  let component: ReferralSourceComponent;
  let fixture: ComponentFixture<ReferralSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferralSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
