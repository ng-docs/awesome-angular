import { Component, Input, OnInit } from '@angular/core';
import { QViewer } from '../../services/github-api/q-types';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {

  constructor() {
  }

  @Input()
  user: QViewer;

  ngOnInit(): void {
  }

}
