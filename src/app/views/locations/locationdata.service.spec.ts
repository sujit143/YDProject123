import { TestBed } from '@angular/core/testing';

import { LocationdataService } from './locationdata.service';

describe('LocationdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocationdataService = TestBed.get(LocationdataService);
    expect(service).toBeTruthy();
  });
});
