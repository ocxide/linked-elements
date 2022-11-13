import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { LinkedElementsService } from './linked-elements.service';

const selector = 'ngxLinkTo';

@Directive({
  selector: `[${selector}]`,
  standalone: true
})
export class LinkToDirective implements OnInit {

  @Input(selector) name!: string;

  constructor(private linkedElements: LinkedElementsService) { }

  ngOnInit(): void {
    if (!this.name) throw new Error('Name not provided');
  }

  @HostListener('click')
  onClick(): void {
    this.linkedElements.scroll(this.name);
  }

}
