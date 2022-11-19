import { NgModule } from '@angular/core';
import { LinkedElementDirective } from './linked-element/linked-element.directive';
import { SmoothScrollStrategy } from './scroll-strategy/smooth-scroll.strategy';
import { PrimaryScrollStrategy, SecondaryScrollStrategy } from './scroll-strategy/tokens';
import { LinkToDirective } from './link-to/link-to.directive';
import { RawScrollStrategy } from './scroll-strategy/raw-scroll.strategy';
import { LinkedElementsDirective } from './linked-elements/linked-elements.directive';
import { LinkedElementsRouterDirective } from './linked-elements-router/linked-elements-router.directive';
import { FragmentListenerDirective } from './linked-elements-router/fragment-listener.directive';
import { BaseRouteListener } from './linked-elements-router';

const directives = [
	LinkedElementDirective,
	LinkToDirective,
	LinkedElementsDirective,
	LinkedElementsRouterDirective,
	FragmentListenerDirective,
];

@NgModule({
	imports: directives,
	exports: directives,
	providers: [
		{ provide: PrimaryScrollStrategy, useClass: SmoothScrollStrategy },
		{ provide: SecondaryScrollStrategy, useClass: RawScrollStrategy },
		{ provide: BaseRouteListener, useClass: FragmentListenerDirective },
	],
	declarations: [
	],
})
export class LinkedElementsModule {}
