import { Component, ElementRef, Input, OnInit } from '@angular/core';
import * as marked from 'marked';
import { highlightAuto } from 'highlight.js';
import { html } from './translator/html';
import addIdForHeaders = html.addIdForHeaders;
import markAndSwapAll = html.markAndSwapAll;

@Component({
  selector: 'app-markdown-viewer',
  templateUrl: './markdown-viewer.component.html',
  styleUrls: ['./markdown-viewer.component.scss'],
})
export class MarkdownViewerComponent implements OnInit {
  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  html: string;

  private _data: string;

  private _baseUrl = '';

  get baseUrl(): string {
    return this._baseUrl;
  }

  @Input() set baseUrl(value: string) {
    this._baseUrl = value;
    this.update();
  }

  private _isTranslation = false;

  get isTranslation(): boolean {
    return this._isTranslation;
  }

  @Input()
  set isTranslation(value: boolean) {
    if (this._isTranslation !== !!value) {
      this._isTranslation = value;
      this.update();
    }
  }

  get data(): string {
    return this._data;
  }

  @Input()
  set data(value: string) {
    if (this._data !== value) {
      this._data = value;
      this.update();
    }
  }

  ngOnInit() {
  }

  private update(): void {
    if (!this.baseUrl || !this._data) {
      return;
    }
    marked.setOptions({
      baseUrl: this._baseUrl.replace(/\/?$/, '/'),
      highlight: function (code) {
        return highlightAuto(code).value;
      },
    });
    const escapedRegex = escapeRegex(this.baseUrl + '//');
    this.html = marked(this.data).replace(new RegExp(escapedRegex, 'gi'), '/');
    if (this.isTranslation) {
      setTimeout(() => mark(this.element));
    }
  }
}

function escapeRegex(s: string): string {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function mark(root: HTMLElement): void {
  addIdForHeaders(root);
  markAndSwapAll(root);
}
