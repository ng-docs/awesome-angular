import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'outlineCss',
})
export class OutlineCssPipe implements PipeTransform {

  transform(element: Element): string {
    return `outline-${element.tagName.toLowerCase()}`;
  }

}
