import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqappointmentComponent } from './reqappointment.component';

describe('ReqappointmentComponent', () => {
  let component: ReqappointmentComponent;
  let fixture: ComponentFixture<ReqappointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReqappointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqappointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
