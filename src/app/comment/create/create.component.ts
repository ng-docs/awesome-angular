import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { DiscussService } from '../services/discuss.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  submitting = false;

  constructor(public discuss: DiscussService) {
  }

  ngOnInit(): void {
  }

  submit(): void {
    if (!this.submitting) {
      this.submitting = true;
      this.discuss.addIssueOrComment().pipe(
        finalize(() => this.submitting = false),
      ).subscribe();
    }
  }
}
