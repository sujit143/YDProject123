import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastSurgicalHistoryComponent } from './past-surgical-history.component';

describe('PastSurgicalHistoryComponent', () => {
  let component: PastSurgicalHistoryComponent;
  let fixture: ComponentFixture<PastSurgicalHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastSurgicalHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastSurgicalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
