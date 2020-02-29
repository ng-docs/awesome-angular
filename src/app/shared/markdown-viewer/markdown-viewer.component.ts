import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { highlightAuto } from 'highlight.js';
import * as marked from 'marked';
import { html } from './translator/html';
import markAndSwapAll = html.markAndSwapAll;

@Component({
  selector: 'app-markdown-viewer',
  templateUrl: './markdown-viewer.component.html',
  styleUrls: ['./markdown-viewer.component.scss'],
})
export class MarkdownViewerComponent implements OnInit {
  constructor(private elementRef: ElementRef<HTMLElement>, private sanitizer: DomSanitizer) {
  }

  html: SafeHtml;

  get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  private _data: string;

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

  ngOnInit() {
  }

  private update(): void {
    if (!this.baseUrl || !this._data) {
      return;
    }
    marked.setOptions({
      smartLists: true,
      smartypants: false,
      xhtml: true,
      baseUrl: this._baseUrl.replace(/\/?$/, '/'),
      highlight: function (code) {
        return highlightAuto(code).value;
      },
    });
    const escapedRegex = escapeRegex(this.baseUrl + '//');
    const content = marked(this.data).replace(new RegExp(escapedRegex, 'gi'), '/');
    this.html = this.sanitizer.bypassSecurityTrustHtml(content);
    setTimeout(() => {
      if (this.isTranslation) {
        mark(this.element);
        const anchors = this.element.querySelectorAll<HTMLAnchorElement>('a[href]');
        anchors.forEach((a) => {
          const { hash, host } = new URL(a.href);
          if (host !== location.host) {
            if (!a.hasAttribute('target')) {
              a.setAttribute('target', '_blank');
            }
          }

          a.addEventListener('click', (event) => {
            const targetElement = this.element.querySelector(hash);
            if (targetElement) {
              targetElement.scrollIntoView();
            }
            event.preventDefault();
          });
        });
      }

      const headings = this.element.querySelectorAll<HTMLHeadingElement>('h1,h2,h3,h4,h5,h6');
      headings.forEach(it => {
        if (it.id && !it.querySelector('a')) {
          const anchor = document.createElement('a');
          anchor.href = `#${it.id}`;
          anchor.innerHTML = `<i class="material-icons">link</i>`;
          anchor.title = '点击链接到此标题';
          anchor.className = 'header-link';
          anchor.setAttribute('aria-hidden', 'true');
          it.appendChild(anchor);
        }
      });
    });
  }
}

function escapeRegex(s: string): string {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function mark(root: HTMLElement): void {
  markAndSwapAll(root);
}
