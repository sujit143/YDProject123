import { TestBed } from '@angular/core/testing';

import { DoctordetailsService } from './doctordetails.service';

describe('DoctordetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoctordetailsService = TestBed.get(DoctordetailsService);
    expect(service).toBeTruthy();
  });
});
