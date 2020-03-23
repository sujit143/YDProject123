import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourdrsEhrComponent } from './yourdrs-ehr.component';

describe('YourdrsEhrComponent', () => {
  let component: YourdrsEhrComponent;
  let fixture: ComponentFixture<YourdrsEhrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourdrsEhrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourdrsEhrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
