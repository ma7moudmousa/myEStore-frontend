import { TestBed } from '@angular/core/testing';

import { GetsubsService } from './getsubs.service';

describe('GetsubsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetsubsService = TestBed.get(GetsubsService);
    expect(service).toBeTruthy();
  });
});
