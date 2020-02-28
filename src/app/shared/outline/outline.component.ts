import { Component, OnInit } from '@angular/core';
import { OutlineItem, OutlineService } from './outline.service';

@Component({
  selector: 'app-outline',
  templateUrl: './outline.component.html',
  styleUrls: ['./outline.component.scss'],
})
export class OutlineComponent implements OnInit {
  constructor(private outline: OutlineService) {
  }

  get items(): readonly OutlineItem[] {
    return this.outline.items;
  }

  ngOnInit(): void {
  }

  jumpTo(anchor: string): void {
    location.hash = '#' + anchor;
  }

  isActive(item: OutlineItem): boolean {
    return this.outline.isActive(item);
  }

  trackByElement(item: OutlineItem): Element {
    return item.element;
  }
}
