import { Component, Input, OnInit } from '@angular/core';
import { GithubService } from '../github-api/github-api.service';
import { UserModel } from '../github-api/user.model';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.scss'],
})
export class UserStatusComponent implements OnInit {

  constructor(public github: GithubService) {
  }


  @Input()
  user: UserModel;

  ngOnInit(): void {
  }
}
