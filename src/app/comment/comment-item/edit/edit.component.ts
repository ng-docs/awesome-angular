import { Component, Input, OnInit } from '@angular/core';
import { DiscussService } from '../../services/discuss.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {

  constructor(public discuss: DiscussService) {
  }

  @Input()
  subjectId: string;

  ngOnInit(): void {
  }

}
