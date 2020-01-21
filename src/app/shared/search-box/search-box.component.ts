import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  private searchDebounce = 300;
  private searchSubject = new Subject<string>();

  @ViewChild('searchBox') searchBox: ElementRef;
  @Output() search = this.searchSubject.pipe(distinctUntilChanged(), debounceTime(this.searchDebounce));
  @Output() focus = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  doSearch() {
    this.searchSubject.next(this.query);
  }

  doFocus() {
    this.focus.emit(this.query);
  }

  private get query() {
    return this.searchBox.nativeElement.value;
  }

  private set query(value: string) {
    this.searchBox.nativeElement.value = value;
  }
}
