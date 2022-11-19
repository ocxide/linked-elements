import { TestBed } from '@angular/core/testing';
import { FragmentRouterDirective } from './fragment-router.directive';

describe('FragmentRouterDirective', () => {
	let directive: FragmentRouterDirective;

	beforeEach(() => {
    TestBed.configureTestingModule({
			imports: [FragmentRouterDirective]
		});
    directive = TestBed.inject(FragmentRouterDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
