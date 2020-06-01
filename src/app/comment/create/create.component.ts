import { Component, OnInit } from '@angular/core';
import { DiscussService } from '../services/discuss.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  constructor(public discuss: DiscussService) {
  }

  ngOnInit(): void {
  }
}
