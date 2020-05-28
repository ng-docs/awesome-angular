import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  constructor() {
  }

  @Output()
  create = new Subject<string>();
  body = '';

  ngOnInit(): void {
  }

  submit(): void {
    this.create.next(this.body);
    this.body = '';
  }
}
