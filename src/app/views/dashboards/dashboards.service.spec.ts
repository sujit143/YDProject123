import { TestBed } from '@angular/core/testing';

import { DashboadService } from './dashboards.service';

describe('DashboadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboadService = TestBed.get(DashboadService);
    expect(service).toBeTruthy();
  });
});
