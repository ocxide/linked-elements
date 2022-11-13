import { TestBed } from '@angular/core/testing';

import { LinkedElementsFragmentRouterService } from './linked-elements-fragment-router.service';

describe('LinkedElementsFragmentRouterService', () => {
  let service: LinkedElementsFragmentRouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkedElementsFragmentRouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
