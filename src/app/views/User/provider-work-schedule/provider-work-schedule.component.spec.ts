import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderWorkScheduleComponent } from './provider-work-schedule.component';

describe('ProviderWorkScheduleComponent', () => {
  let component: ProviderWorkScheduleComponent;
  let fixture: ComponentFixture<ProviderWorkScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderWorkScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderWorkScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
