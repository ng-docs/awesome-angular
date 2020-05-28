import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {

  @Output()
  create = new Subject<string>();
  body: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
