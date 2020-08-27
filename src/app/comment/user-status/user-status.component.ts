import { Component, OnInit } from '@angular/core';
import { User } from '../../../types';
import { DiscussService } from '../services/discuss.service';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.scss'],
})
export class UserStatusComponent implements OnInit {

  constructor(public discuss: DiscussService) {
  }

  get user(): User {
    return this.discuss.viewer as User;
  }

  ngOnInit(): void {
  }
}
