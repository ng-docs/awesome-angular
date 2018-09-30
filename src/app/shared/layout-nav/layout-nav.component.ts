import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDrawer } from '@angular/material';

@Component({
  selector: 'app-layout-nav',
  templateUrl: './layout-nav.component.html',
  styleUrls: ['./layout-nav.component.scss'],
})
export class LayoutNavComponent implements OnInit, OnDestroy {

  isHandset: boolean;

  sub: Subscription;

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.sub = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(result => result.matches),
    ).subscribe(result => this.isHandset = result);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  tryToClose(drawer: MatDrawer): void {
    if (this.isHandset) {
      drawer.close();
    }
  }

  search(keyword: string): void {
    // TODO: implement search with lunr.js
  }

}
