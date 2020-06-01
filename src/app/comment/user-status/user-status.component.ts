import { Component, OnInit } from '@angular/core';
import { DiscussService } from '../services/discuss.service';
import { UserModel } from '../services/github-api/user.model';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.scss'],
})
export class UserStatusComponent implements OnInit {

  constructor(public discuss: DiscussService) {
  }

  get user(): UserModel {
    return this.discuss.me;
  }

  ngOnInit(): void {
  }
}
