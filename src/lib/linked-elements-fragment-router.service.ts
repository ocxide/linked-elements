import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Subject, takeUntil, tap } from 'rxjs';
import { LinkedElementsDirective } from './linked-elements/linked-elements.directive';

@Injectable({
	providedIn: 'root',
})
export class LinkedElementsFragmentRouterService implements OnDestroy, OnInit {
	unsuscriber$ = new Subject<void>();
	private checkChanges = true;
  
	constructor(
    private route: ActivatedRoute,
    private router: Router,
		private linkedElements: LinkedElementsDirective
	) {}

	ngOnInit(): void {
		const fragment = this.route.snapshot.fragment;
		if (fragment) this.linkedElements.rawScroll(fragment);

		this.route.fragment
			.pipe(
				takeUntil(this.unsuscriber$),
				filter(Boolean),
				tap(fragment => this.onRouteChanges(fragment))
			)
			.subscribe();

		this.linkedElements.linkedElementChanges
			.pipe(
				takeUntil(this.unsuscriber$),
				tap(element => this.onElementChanges(element))
			)
			.subscribe();
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

	ngOnDestroy(): void {
		this.unsuscriber$.next();
		this.unsuscriber$.complete();
	}
}
