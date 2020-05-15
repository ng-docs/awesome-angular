import { ContentObserver } from '@angular/cdk/observers';
import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';

@Injectable()
export class OutlineService implements OnDestroy {
  constructor(private observer: ContentObserver) {
  }

  selector = defaultSelector;
  private destroyed$ = new Subject<void>();

  private _activeItem: OutlineItem;

  get activeItem(): OutlineItem {
    return this._activeItem;
  }

  set activeItem(value: OutlineItem) {
    if (this._activeItem !== value) {
      this._activeItem = value;
      this.changed();
    }
  }

  private _viewport: Element;

  get viewport(): Element {
    return this._viewport;
  }

  set viewport(value: Element) {
    if (this._viewport !== value) {
      this._viewport = value;
      this.watch(value);
      this.changed();
    }
  }

  private _items: readonly OutlineItem[] = [];

  get items(): readonly OutlineItem[] {
    return this._items;
  }

  set items(value: readonly OutlineItem[]) {
    value = value || [];
    if (this._items === value) {
      return;
    }
    if (isDeepArrayEqual(this._items, value)) {

    }
    this._items = value;
    this.changed();
  }

  private _changes$ = new Subject<this>();

  get changes$(): Observable<this> {
    return this._changes$;
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  updateItems(): void {
    const elements = this._viewport.querySelectorAll(this.selector) as NodeListOf<HTMLElement>;
    this.items = Array.from(elements).map(it => toOutlineItem(it)).filter(it => !!it);
  }

  isActive(item: OutlineItem): boolean {
    return this._activeItem === item;
  }

  updateActiveItem(): void {
    this.activeItem = this.findActiveItem();
  }

  protected changed() {
    this._changes$.next(this);
  }

  private watch(viewport: Element): void {
    this._viewport = viewport;
    this.observer.observe(viewport).pipe(
      debounceTime(100),
      tap(() => this.updateItems()),
      takeUntil(this.destroyed$),
    ).subscribe();
    const scrollEvents = [...getSelfAndAncestors(this.viewport), document].map(it => fromEvent(it, 'scroll'));
    merge(...scrollEvents, this.observer.observe(document.body)).pipe(
      debounceTime(100),
      tap(() => this.updateActiveItem()),
      takeUntil(this.destroyed$),
    ).subscribe();
  }

  private findActiveItem(): OutlineItem {

    // 找到在页面之外的下一个标题序号
    const nextInsideItemIndex = this.items.findIndex(it => {
      const box = it.element.getBoundingClientRect();
      return box.top >= 0;
    });

    switch (nextInsideItemIndex) {
      // 页面在头部
      case 0:
        return this.items[0];

      // 页面在尾部，已经掠过了所有的标题
      case -1:
        return this.items[this.items.length - 1];

      // 其他正常情况
      default:
        return this.items[nextInsideItemIndex - 1];
    }
  }
}

export interface OutlineItem {
  element: Element;
  title: string;
  anchor: string;
}

function isDeepArrayEqual(array1: readonly OutlineItem[], array2: readonly OutlineItem[]): boolean {
  if (array1.length !== array2.length) {
    return false;
  }
  for (let i = 0; i < array1.length; ++i) {
    const v1 = array1[i] || emptyItem;
    const v2 = array2[i] || emptyItem;
    if (v1.title !== v2.title || v1.anchor !== v2.title) {
      return false;
    }
  }
  return true;
}

const emptyItem = { title: '', anchor: '' };
const defaultSelector = 'a[name],h1[id],h2[id],h3[id],h4[id],h5[id],h6[id],[uiOutlineAnchor]';

function getTitle(element: HTMLElement) {
  return element.textContent.replace(/link$/, '') || element.title || element.getAttribute('aria-label');
}

function toOutlineItem(element: HTMLElement): OutlineItem {
  const anchor = getAnchor(element);
  if (anchor) {
    return {
      element,
      title: getTitle(element),
      anchor: anchor,
    };
  }
}

function getAnchor(element: Element): string {
  if (element instanceof HTMLAnchorElement) {
    return element.getAttribute('name');
  } else if (element instanceof HTMLHeadingElement) {
    return element.id;
  } else if (element.hasAttribute('uiOutlineAnchor')) {
    return element.getAttribute('uiOutlineAnchor') || element.id;
  }
}

function getSelfAndAncestors(element: Element): Element[] {
  if (!element) {
    return [];
  } else {
    return [element, ...getSelfAndAncestors(element.parentElement)];
  }
}
