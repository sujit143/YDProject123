import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginatedSourceComponent } from './originated-source.component';

describe('OriginatedSourceComponent', () => {
  let component: OriginatedSourceComponent;
  let fixture: ComponentFixture<OriginatedSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OriginatedSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginatedSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
