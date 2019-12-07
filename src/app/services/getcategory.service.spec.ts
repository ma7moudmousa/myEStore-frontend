import { TestBed } from '@angular/core/testing';

import { GetcategoryService } from './getcategory.service';

describe('GetcategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetcategoryService = TestBed.get(GetcategoryService);
    expect(service).toBeTruthy();
  });
});
