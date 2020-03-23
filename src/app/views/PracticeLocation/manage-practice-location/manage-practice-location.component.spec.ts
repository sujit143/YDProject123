import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePracticeLocationComponent } from './manage-practice-location.component';

describe('ManagePracticeLocationComponent', () => {
  let component: ManagePracticeLocationComponent;
  let fixture: ComponentFixture<ManagePracticeLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePracticeLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePracticeLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
