import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchAppointmentsComponent } from './sch-appointments.component';

describe('SchAppointmentsComponent', () => {
  let component: SchAppointmentsComponent;
  let fixture: ComponentFixture<SchAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
