import { Injectable } from '@angular/core';
import { BaseScrollStrategy } from './base-scroll-strategy';

@Injectable()
export class RawScrollStrategy implements BaseScrollStrategy {
	scrollIntoView(element: HTMLElement): void {
		element.scrollIntoView();
	}
}
