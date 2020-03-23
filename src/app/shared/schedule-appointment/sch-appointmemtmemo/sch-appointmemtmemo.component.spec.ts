import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchAppointmemtmemoComponent } from './sch-appointmemtmemo.component';

describe('SchAppointmemtmemoComponent', () => {
  let component: SchAppointmemtmemoComponent;
  let fixture: ComponentFixture<SchAppointmemtmemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchAppointmemtmemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchAppointmemtmemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
