import { TestBed } from '@angular/core/testing';

import { LinkedElementsService } from './linked-elements.service';

describe('LinkedElementsService', () => {
  let service: LinkedElementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkedElementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
