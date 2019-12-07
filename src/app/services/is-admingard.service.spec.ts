import { TestBed } from '@angular/core/testing';

import { IsAdmingardService } from './is-admingard.service';

describe('IsAdmingardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IsAdmingardService = TestBed.get(IsAdmingardService);
    expect(service).toBeTruthy();
  });
});
