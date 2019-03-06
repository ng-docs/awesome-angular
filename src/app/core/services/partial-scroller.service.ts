export class PartialScroller {

  constructor() {
  }

  private element: HTMLElement = document.body;

  private offset: () => [number, number] = () => [0, 0];

  attachTo(element: HTMLElement): void {
    this.element = element;
  }

  /**
   * Configures the top offset used when scrolling to an anchor.
   * @param offset A position in screen coordinates (a tuple with x and y values)
   * or a function that returns the top offset position.
   *
   */
  setOffset(offset: [number, number] | (() => [number, number])): void {
    if (Array.isArray(offset)) {
      this.offset = () => offset;
    } else {
      this.offset = offset;
    }
  }

  /**
   * Retrieves the current scroll position.
   * @returns The position in screen coordinates.
   */
  getScrollPosition(): [number, number] {
    if (this.supportScrollRestoration()) {
      return [this.element.scrollLeft, this.element.scrollTop];
    } else {
      return [0, 0];
    }
  }

  /**
   * Sets the scroll position.
   * @param position The new position in screen coordinates.
   */
  scrollToPosition(position: [number, number]): void {
    if (this.supportScrollRestoration()) {
      this.element.scrollTo(position[0], position[1]);
    }
  }

  /**
   * Scrolls to an anchor element.
   * @param anchor The ID of the anchor element.
   */
  scrollToAnchor(anchor: string): void {
    if (this.supportScrollRestoration()) {
      const elSelectedById = this.element.querySelector(`#${anchor}`);
      if (elSelectedById) {
        this.scrollToElement(elSelectedById);
        return;
      }
      const elSelectedByName = this.element.querySelector(`[name='${anchor}']`);
      if (elSelectedByName) {
        this.scrollToElement(elSelectedByName);
        return;
      }
    }
  }

  /**
   * Disables automatic scroll restoration provided by the browser.
   */
  setHistoryScrollRestoration(scrollRestoration: 'auto' | 'manual'): void {
    if (this.supportScrollRestoration()) {
      const history = window.history;
      if (history && history.scrollRestoration) {
        history.scrollRestoration = scrollRestoration;
      }
    }
  }

  private scrollToElement(el: any): void {
    const rect = el.getBoundingClientRect();
    const left = rect.left + window.pageXOffset;
    const top = rect.top + window.pageYOffset;
    const offset = this.offset();
    this.element.scrollTo(left - offset[0], top - offset[1]);
  }

  /**
   * We only support scroll restoration when we can get a hold of element.
   * This means that we do not support this behavior when running in a web worker.
   *
   * Lifting this restriction right now would require more changes in the dom adapter.
   * Since webworkers aren't widely used, we will lift it once RouterScroller is
   * battle-tested.
   */
  private supportScrollRestoration(): boolean {
    try {
      return !!this.element && !!this.element.scrollTo;
    } catch {
      return false;
    }
  }
}
