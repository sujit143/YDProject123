import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnkleComponent } from './ankle.component';

describe('AnkleComponent', () => {
  let component: AnkleComponent;
  let fixture: ComponentFixture<AnkleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnkleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnkleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
