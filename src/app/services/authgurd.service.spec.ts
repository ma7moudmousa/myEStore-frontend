import { TestBed } from '@angular/core/testing';

import { AuthgurdService } from './authgurd.service';

describe('AuthgurdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthgurdService = TestBed.get(AuthgurdService);
    expect(service).toBeTruthy();
  });
});
