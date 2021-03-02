import { Directive, ElementRef, OnInit } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Directive({
  selector: '[appScrollIntoView]',
})
export class ScrollIntoViewDirective implements OnInit {

  constructor(private elementRef: ElementRef<Element>, private rla: RouterLinkActive) {
  }

  ngOnInit(): void {
    timer().pipe(take(1)).subscribe(() => {
      if (this.rla.isActive) {
        this.elementRef.nativeElement.scrollIntoView({ block: 'center' });
      }
    });
  }
}
