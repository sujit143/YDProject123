import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePracticeSubscriptionComponent } from './manage-practice-subscription.component';

describe('ManagePracticeSubscriptionComponent', () => {
  let component: ManagePracticeSubscriptionComponent;
  let fixture: ComponentFixture<ManagePracticeSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePracticeSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePracticeSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
