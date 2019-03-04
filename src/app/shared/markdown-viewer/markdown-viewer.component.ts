import {Component, ElementRef, Input, OnInit} from '@angular/core';
import * as marked from 'marked';
import {highlightAuto} from 'highlight.js';
import {html} from './translator/html';
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
      baseUrl: this._baseUrl,
      highlight: function (code) {
        return highlightAuto(code).value;
      },
    });
    this.html = marked(this.data);
    setTimeout(() => mark(this.element));
  }
}

function mark(root: HTMLElement): void {
  addIdForHeaders(root);
  markAndSwapAll(root);
}
