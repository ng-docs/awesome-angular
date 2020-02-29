import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  constructor() {
  }

  @ViewChild('searchBox') searchBox: ElementRef;
  private searchDebounce = 300;
  private _search$ = new Subject<string>();

  @Output() search = this._search$.pipe(distinctUntilChanged(), debounceTime(this.searchDebounce));

  private get query() {
    return this.searchBox.nativeElement.value;
  }

  private set query(value: string) {
    this.searchBox.nativeElement.value = value;
  }

  ngOnInit() {
  }

  doSearch() {
    this._search$.next(this.query);
  }
}
