import { Directive } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, filter, map, distinctUntilChanged } from 'rxjs';
import { BaseRouteListener } from './base-route-listener';

@Directive({
	selector: '[ngxFragmentListener]',
	standalone: true,
})
export class FragmentListenerDirective extends BaseRouteListener {
	constructor(private route: ActivatedRoute, private router: Router) {
		super();
	}

	getRoute(): Observable<string | null | undefined> {
		return this.router.events.pipe(
			filter(event => event instanceof NavigationEnd),
			map(() => this.route.snapshot.fragment),
			distinctUntilChanged()
		);
	}

	setRoute(route: string | null | undefined): void {
		this.router.navigate(['./'], {
			relativeTo: this.route,
			fragment: route as string | undefined,
		});
	}
}
