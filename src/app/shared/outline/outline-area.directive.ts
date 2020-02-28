import { Directive, ElementRef, OnInit } from '@angular/core';
import { OutlineService } from './outline.service';

@Directive({
  selector: '[appOutlineArea]',
})
export class OutlineAreaDirective implements OnInit {
  constructor(private element: ElementRef<Element>, private service: OutlineService) {
  }

  ngOnInit(): void {
    this.service.viewport = this.element.nativeElement;
  }
}
