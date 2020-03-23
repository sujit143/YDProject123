import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Providerdashboard1Component } from './providerdashboard1.component';

describe('Providerdashboard1Component', () => {
  let component: Providerdashboard1Component;
  let fixture: ComponentFixture<Providerdashboard1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Providerdashboard1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Providerdashboard1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
