import { Component, Input, OnInit } from '@angular/core';
import * as marked from 'marked';
import { highlightAuto } from 'highlight.js';

@Component({
  selector: 'app-markdown-viewer',
  templateUrl: './markdown-viewer.component.html',
  styleUrls: ['./markdown-viewer.component.scss'],
})
export class MarkdownViewerComponent implements OnInit {
  constructor() {
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
  }
}
