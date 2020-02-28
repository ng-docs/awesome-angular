import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appShowWhenActive]',
})
export class ShowWhenActiveDirective {
  constructor(private elementRef: ElementRef<Element>) {
  }

  private _active = false;

  get active(): boolean {
    return this._active;
  }

  @Input('appShowWhenActive')
  set active(value: boolean) {
    if (this._active !== value) {
      this._active = value;
      if (this._active) {
        this.elementRef.nativeElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }
}
