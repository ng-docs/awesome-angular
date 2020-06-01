import { Component, OnInit } from '@angular/core';
import { DiscussService } from '../services/discuss.service';
import { QViewer } from '../services/github-api/q-types';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.scss'],
})
export class UserStatusComponent implements OnInit {

  constructor(public discuss: DiscussService) {
  }

  get user(): QViewer {
    return this.discuss.viewer;
  }

  ngOnInit(): void {
  }
}
