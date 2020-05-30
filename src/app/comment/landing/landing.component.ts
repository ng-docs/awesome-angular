import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { GithubService } from '../github-api/github-api.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {

  constructor(private route: ActivatedRoute, private github: GithubService) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(it => {
      this.github.login(it.get('code')).pipe(
        switchMap(() => this.github.getCurrentUser()),
        tap(() => location.href = '/'),
      ).subscribe();
    });
  }

}
