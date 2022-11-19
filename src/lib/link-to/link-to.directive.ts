import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { LinkedElementsDirective } from '../linked-elements/linked-elements.directive';

const selector = 'ngxLinkTo';

@Directive({
	selector: `[${selector}]`,
	standalone: true,
})
export class LinkToDirective implements OnInit {
	@Input(selector) name!: string;

	constructor(private linkedElements: LinkedElementsDirective) {}

	ngOnInit(): void {
		if (!this.name) throw new Error('Name not provided');
	}

	@HostListener('click')
	onClick(): void {
		this.linkedElements.scroll(this.name);
	}
}
