import { Directive } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LinkedElementsDirective } from '../linked-elements/linked-elements.directive';

import { Observable, filter, tap } from 'rxjs';
import { HostObservable } from 'ngx-host-observable';

@Directive({
	selector: '[ngxFragmentRouter]',
	standalone: true,
})
export class FragmentRouterDirective {
	private checkChanges = true;

	@HostObservable()
	route$?: Observable<string | null>;

	@HostObservable()
	element$?: Observable<string | null>;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private linkedElements: LinkedElementsDirective
	) {}

	ngOnInit(): void {
		const fragment = this.route.snapshot.fragment;
		if (fragment) this.linkedElements.rawScroll(fragment);

		this.route$ = this.route.fragment.pipe(
			filter(Boolean),
			tap(fragment => this.onRouteChanges(fragment))
		);

		this.element$ = this.linkedElements.linkedElementChanges.pipe(
			tap(element => this.onElementChanges(element))
		);
	}

	private onElementChanges(element: string) {
		this.checkChanges = false;
		this.router.navigate(['./'], {
			relativeTo: this.route,
			fragment: element,
		});
	}

	private onRouteChanges(fragment: string) {
		const checkChanges = this.checkChanges;
		this.checkChanges = true;

		if (!checkChanges) return;

		this.linkedElements.scroll(fragment);
	}
}
