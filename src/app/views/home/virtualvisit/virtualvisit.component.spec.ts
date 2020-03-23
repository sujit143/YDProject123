import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualvisitComponent } from './virtualvisit.component';

describe('VirtualvisitComponent', () => {
  let component: VirtualvisitComponent;
  let fixture: ComponentFixture<VirtualvisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualvisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualvisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
