import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchDocumentsComponent } from './sch-documents.component';

describe('SchDocumentsComponent', () => {
  let component: SchDocumentsComponent;
  let fixture: ComponentFixture<SchDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
