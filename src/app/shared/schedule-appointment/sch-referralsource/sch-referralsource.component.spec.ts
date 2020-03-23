import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchReferralsourceComponent } from './sch-referralsource.component';

describe('SchReferralsourceComponent', () => {
  let component: SchReferralsourceComponent;
  let fixture: ComponentFixture<SchReferralsourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchReferralsourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchReferralsourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
