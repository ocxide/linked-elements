import { NgModule } from '@angular/core';
import { LinkedElementDirective } from './linked-element/linked-element.directive';
import { SmoothScrollStrategy } from './scroll-strategy/smooth-scroll.strategy';
import { PrimaryScrollStrategy, SecondaryScrollStrategy } from './scroll-strategy/tokens';
import { LinkToDirective } from './link-to/link-to.directive';
import { RawScrollStrategy } from './scroll-strategy/raw-scroll.strategy';
import { FragmentRouterDirective } from './fragment-router/fragment-router.directive';
import { LinkedElementsDirective } from './linked-elements/linked-elements.directive';

const directives = [
	LinkedElementDirective,
	LinkToDirective,
	LinkedElementsDirective,
	FragmentRouterDirective,
];

@NgModule({
	imports: directives,
	exports: directives,
	providers: [
		{ provide: PrimaryScrollStrategy, useClass: SmoothScrollStrategy },
		{ provide: SecondaryScrollStrategy, useClass: RawScrollStrategy },
	],
})
export class LinkedElementsModule {}
