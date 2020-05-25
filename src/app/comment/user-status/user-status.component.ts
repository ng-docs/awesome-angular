import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from '../github-api/user.model';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.scss'],
})
export class UserStatusComponent implements OnInit {

  constructor() {
  }

  @Input()
  user: UserModel;

  ngOnInit(): void {
  }

  logout(): void {
  }
}
