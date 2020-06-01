import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ReactionContent, ReactionGroup } from '../../../../types';

const key = 'reactions-fold';

@Component({
  selector: 'app-reaction-list',
  templateUrl: './reaction-list.component.html',
  styleUrls: ['./reaction-list.component.scss'],
})
export class ReactionListComponent implements OnInit {

  constructor() {
  }

  @Input()
  items: ReactionGroup[];
  @Output()
  add = new Subject<ReactionContent>();
  @Output()
  remove = new Subject<ReactionContent>();

  get fold(): boolean {
    return (sessionStorage.getItem(key) ?? 'true') === 'true';
  }

  set fold(value: boolean) {
    sessionStorage.setItem(key, value ? 'true' : 'false');
  }

  ngOnInit(): void {
  }

  toggleReaction(group: ReactionGroup) {
    if (group.viewerHasReacted) {
      this.remove.next(group.content);
    } else {
      this.add.next(group.content);
    }
  }
}
