import { TestBed } from '@angular/core/testing';

import { DoctordataService } from './doctordata.service';

describe('DoctordataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoctordataService = TestBed.get(DoctordataService);
    expect(service).toBeTruthy();
  });
});
