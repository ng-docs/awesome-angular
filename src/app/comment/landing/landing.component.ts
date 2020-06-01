import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { DiscussService } from '../services/discuss.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {

  constructor(private route: ActivatedRoute, private discuss: DiscussService, private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(it => {
      this.discuss.login(it.get('code')).pipe(
        tap(() => this.router.navigateByUrl('/')),
      ).subscribe();
    });
  }

}
