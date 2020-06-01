import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { merge, Subject } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { DiscussService } from '../services/discuss.service';

@Component({
  selector: 'app-discuss',
  templateUrl: './discuss.component.html',
  styleUrls: ['./discuss.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscussComponent implements OnInit {
  constructor(public discuss: DiscussService, private router: Router, private cdr: ChangeDetectorRef) {
  }

  owner = 'site-wangke';
  repo = 'blog';
  update$ = new Subject<string>();

  ngOnInit(): void {
    this.discuss.changes$.subscribe(() => this.cdr.markForCheck());
    this.discuss.startup().subscribe();
    const navigated$ = this.router.events.pipe(
      filter(it => it instanceof NavigationEnd),
    );
    merge(this.update$, navigated$).pipe(
      tap(() => this.discuss.enter(this.owner, this.repo, location.pathname)),
      switchMap(() => this.discuss.reload()),
    ).subscribe();
    this.update$.next();
  }

  create(body: string): void {
    if (this.discuss.noIssue) {
      this.discuss.createIssue(body).subscribe();
    } else {
      this.discuss.addComment(body).subscribe();
    }
  }
}
