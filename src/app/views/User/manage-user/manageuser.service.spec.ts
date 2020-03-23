import { TestBed } from '@angular/core/testing';

import { ManageuserService } from './manageuser.service';

describe('ManageuserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageuserService = TestBed.get(ManageuserService);
    expect(service).toBeTruthy();
  });
});
