/* eslint-disable no-console */
import { EventEmitter, Inject, Directive, Output } from '@angular/core';
import { BaseScrollStrategy } from '../scroll-strategy/base-scroll-strategy';
import {
	PrimaryScrollStrategy,
	SecondaryScrollStrategy,
} from '../scroll-strategy/tokens';

@Directive({
	selector: 'ngxLinkedElements',
	standalone: true,
})
export class LinkedElementsDirective {
	@Output() linkedElementChanges = new EventEmitter<string | null>();

	private elements = new Map<string, HTMLElement>();
	constructor(
		@Inject(PrimaryScrollStrategy)
		private scrollStrategy: BaseScrollStrategy,
		@Inject(SecondaryScrollStrategy)
		private secondaryScrollStrategy: BaseScrollStrategy
	) {}

	set(key: string, element: HTMLElement) {
		this.elements.set(key, element);
	}

	get(key: string) {
		return this.elements.get(key);
	}

	scroll(key: string | null) {
		if (key == null) {
			this.scrollStrategy.scrollTop();
			this.linkedElementChanges.emit(key);
			return;
		}
		
		const element = this.elements.get(key);
		if (!element) return console.warn(`Element with name '${key}' not found`);
		this.linkedElementChanges.emit(key);
		
		this.scrollStrategy.scrollIntoView(element);
	}

	rawScroll(key: string | null) {
		if (key == null) {
			this.secondaryScrollStrategy.scrollTop();
			console.log('top');
			
			this.linkedElementChanges.emit(key);
			return;
		}

		const element = this.elements.get(key);
		if (!element) return console.warn(`Element with name '${key}' not found`);

		this.linkedElementChanges.emit(key);
		this.secondaryScrollStrategy.scrollIntoView(element);
	}

	update(key: string) {
		const element = this.elements.get(key);
		if (!element) return console.warn(`Element with name '${key}' not found`);

		this.linkedElementChanges.emit(key);
	}
}
