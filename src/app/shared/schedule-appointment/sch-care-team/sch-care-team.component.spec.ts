import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchCareTeamComponent } from './sch-care-team.component';

describe('SchCareTeamComponent', () => {
  let component: SchCareTeamComponent;
  let fixture: ComponentFixture<SchCareTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchCareTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchCareTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
