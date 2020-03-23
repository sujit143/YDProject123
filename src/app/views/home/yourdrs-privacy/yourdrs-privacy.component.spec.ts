import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourdrsPrivacyComponent } from './yourdrs-privacy.component';

describe('YourdrsPrivacyComponent', () => {
  let component: YourdrsPrivacyComponent;
  let fixture: ComponentFixture<YourdrsPrivacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourdrsPrivacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourdrsPrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
