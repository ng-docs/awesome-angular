import { Directive, ElementRef } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { PartialScroller } from '../../core/services/partial-scroller.service';

@Directive({
  selector: '[appPartialScroller]',
})
export class PartialScrollerDirective {
  constructor(scroller: ViewportScroller, elementRef: ElementRef<HTMLElement>) {
    if (scroller instanceof PartialScroller) {
      scroller.attachTo(elementRef.nativeElement);
    }
  }
}
