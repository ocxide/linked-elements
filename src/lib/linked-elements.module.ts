import { NgModule } from '@angular/core';
import { LinkedElementDirective } from './linked-element.directive';
import { SmoothScrollStrategy } from './scroll-strategy/smooth-scroll.strategy';
import { PrimaryScrollStrategy, SecondaryScrollStrategy } from './scroll-strategy/tokens';
import { LinkToDirective } from './link-to.directive';
import { RawScrollStrategy } from './scroll-strategy/raw-scroll.strategy';

@NgModule({
  imports: [
    LinkedElementDirective,
    LinkToDirective,
  ],
  exports: [
    LinkedElementDirective,
    LinkToDirective,
  ],
  providers: [
    { provide: PrimaryScrollStrategy, useClass: SmoothScrollStrategy },
    { provide: SecondaryScrollStrategy, useClass: RawScrollStrategy }
  ]
})
export class LinkedElementsModule { }
