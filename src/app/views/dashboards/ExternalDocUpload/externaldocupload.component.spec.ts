import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalDocUploadComponent } from './externaldocupload.component';

describe('ExternaldocuploadComponent', () => {
  let component: ExternalDocUploadComponent;
  let fixture: ComponentFixture<ExternalDocUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalDocUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalDocUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
