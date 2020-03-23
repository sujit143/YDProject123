import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasenoteComponent } from './casenote.component';

describe('CasenoteComponent', () => {
  let component: CasenoteComponent;
  let fixture: ComponentFixture<CasenoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasenoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasenoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
