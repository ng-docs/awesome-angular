import { Directive } from '@angular/core';
import { OutlineService } from './outline.service';

@Directive({
  selector: '[appOutlineHost]',
  providers: [OutlineService],
})
export class OutlineHostDirective {
}
