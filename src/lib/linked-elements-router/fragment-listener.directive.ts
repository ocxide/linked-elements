import { Directive } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseRouteListener } from './base-route-listener';

@Directive({
  selector: '[ngxFragmentListener]',
	standalone: true,
})
export class FragmentListenerDirective extends BaseRouteListener {

	constructor(
		private route: ActivatedRoute,
		private router: Router
	) { super(); }

	getRoute(): Observable<string | null | undefined> {
		return this.route.fragment;
	}

	setRoute(route: string | null | undefined): void {
		this.router.navigate(['./'], {
			relativeTo: this.route,
      fragment: route as string | undefined,
		});
	}
}
