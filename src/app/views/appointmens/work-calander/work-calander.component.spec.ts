import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCalanderComponent } from './work-calander.component';

describe('WorkCalanderComponent', () => {
  let component: WorkCalanderComponent;
  let fixture: ComponentFixture<WorkCalanderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkCalanderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkCalanderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
