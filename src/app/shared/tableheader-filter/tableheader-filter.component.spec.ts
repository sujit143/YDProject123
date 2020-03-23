import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableheaderFilterComponent } from './tableheader-filter.component';

describe('TableheaderFilterComponent', () => {
  let component: TableheaderFilterComponent;
  let fixture: ComponentFixture<TableheaderFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableheaderFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableheaderFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
