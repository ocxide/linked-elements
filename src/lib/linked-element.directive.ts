import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { LinkedElementsService } from './linked-elements.service';

const selector = 'ngxLinkedElement';

@Directive({
  selector: `[${selector}]`,
  standalone: true
})
export class LinkedElementDirective implements OnInit {

  @Input(selector) name!: string;

  constructor(private host: ElementRef<HTMLElement>, private linkedElements: LinkedElementsService) { }

  ngOnInit(): void {
    if (!this.name) throw new Error('Name not provided');
    this.linkedElements.set(this.name, this.host.nativeElement);
  }

}
