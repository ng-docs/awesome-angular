import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appToggle]',
  exportAs: 'appToggle',
})
export class ToggleDirective {

  constructor() {
  }

  @Input() isOn = false;

  get isOff(): boolean {
    return !this.isOn;
  }

  toggle(): void {
    this.isOn = !this.isOn;
  }
}
