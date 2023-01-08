import { Injectable, Inject } from '@angular/core';
import { WINDOW } from '../tokens/window';
import { BaseScrollStrategy } from './base-scroll-strategy';

@Injectable()
export class SmoothScrollStrategy implements BaseScrollStrategy {
	constructor(@Inject(WINDOW) private window: Window) {}

	scrollIntoView(element: HTMLElement): void {
		element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
	}

	scrollTop(): void {
		this.window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}
}
