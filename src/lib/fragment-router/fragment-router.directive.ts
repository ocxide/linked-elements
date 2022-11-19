import { AfterViewInit, Directive, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LinkedElementsDirective } from '../linked-elements/linked-elements.directive';

import { Observable, filter, tap, skip, distinctUntilChanged } from 'rxjs';
import { HostObservable } from 'ngx-host-observable';

@Directive({
	selector: '[ngxFragmentRouter]',
	standalone: true,
})
export class FragmentRouterDirective implements OnInit, AfterViewInit {
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
		this.route$ = this.route.fragment.pipe(
			skip(1),
			filter(Boolean),
			tap(fragment => this.onRouteChanges(fragment))
		);

		this.element$ = this.linkedElements.linkedElementChanges.pipe(
			distinctUntilChanged(),
			tap(element => this.onElementChanges(element))
		);
	}

	ngAfterViewInit(): void {
		const fragment = this.route.snapshot.fragment;
		if (fragment) this.linkedElements.rawScroll(fragment);
	}

	private onElementChanges(element: string) {
		this.router.navigate(['./'], {
			relativeTo: this.route,
			fragment: element,
		});
	}

	private onRouteChanges(fragment: string) {
		this.linkedElements.scroll(fragment);
	}
}
