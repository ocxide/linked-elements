import { AfterViewInit, Directive } from '@angular/core';
import { LinkedElementsDirective } from '../linked-elements/linked-elements.directive';
import { BaseRouteListener } from './base-route-listener';
import { first, filter, Observable, skip, map } from 'rxjs';
import { HostObservable } from 'ngx-host-observable';

@Directive({
	selector: '[ngxLinkedElementsRouter]',
	standalone: true,
})
export class LinkedElementsRouterDirective implements AfterViewInit {
	@HostObservable()
	elements$?: Observable<void>;

	@HostObservable()
	path$?: Observable<void>;

	constructor(
		private routeListener: BaseRouteListener,
		private linkedElements: LinkedElementsDirective
	) {}

	ngAfterViewInit(): void {
		const route$ = this.routeListener.getRoute();
		route$
			.pipe(first(), filter(Boolean))
			.subscribe(path => this.linkedElements.rawScroll(path));

		this.elements$ = this.linkedElements.linkedElementChanges.pipe(
			map(path => this.routeListener.setRoute(path))
		);

		this.path$ = route$.pipe(
			skip(1),
			filter(Boolean),
			map(path => this.linkedElements.scroll(path))
		);
	}
}
