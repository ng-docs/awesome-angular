import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../types';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {

  constructor() {
  }

  @Input()
  user: User;

  ngOnInit(): void {
  }

}
