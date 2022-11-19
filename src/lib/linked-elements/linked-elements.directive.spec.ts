import { TestBed } from '@angular/core/testing';
import { LinkedElementsDirective } from './linked-elements.directive';


describe('LinkedElementsDirective', () => {
  let directive: LinkedElementsDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    directive = TestBed.inject(LinkedElementsDirective);
  });

  it('should be created', () => {
    expect(directive).toBeTruthy();
  });
});
