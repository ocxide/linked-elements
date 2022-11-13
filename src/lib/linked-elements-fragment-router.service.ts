import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, filter, Subject, takeUntil } from 'rxjs';
import { LinkedElementsService } from './linked-elements.service';

@Injectable({
  providedIn: "root"
})
export class LinkedElementsFragmentRouterService implements OnDestroy, OnInit {

  unsuscriber$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private linkedElements: LinkedElementsService
  ) {}

  ngOnInit(): void {
    const fragment = this.route.snapshot.fragment;

    if (!fragment) return;
    this.linkedElements.rawScroll(fragment);

    this.route.fragment
    .pipe(
      takeUntil(this.unsuscriber$),
      filter(Boolean),
      distinctUntilChanged(),
    )
    .subscribe(fragment => this.linkedElements.scroll(fragment));

    this.linkedElements.linkedElementChanges
    .pipe(
      takeUntil(this.unsuscriber$),
      distinctUntilChanged(),
    )
    .subscribe(element => this.router.navigate(['', {
      fragment: element,
      relativeTo: this.route
    }]))
  }

  ngOnDestroy(): void {
    this.unsuscriber$.next();
    this.unsuscriber$.complete();
  }
}
