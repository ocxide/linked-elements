import { Directive } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, distinctUntilChanged } from 'rxjs';
import { BaseRouteListener } from './base-route-listener';

@Directive({
	selector: '[ngxFragmentListener]',
	standalone: true,
})
export class FragmentListenerDirective implements BaseRouteListener {
	constructor(private route: ActivatedRoute, private router: Router) {}

	getRoute(): Observable<string | null | undefined> {
		return this.router.events.pipe(
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
