import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavtabsComponent } from './top-navtabs.component';

describe('TopNavtabsComponent', () => {
  let component: TopNavtabsComponent;
  let fixture: ComponentFixture<TopNavtabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopNavtabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavtabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
