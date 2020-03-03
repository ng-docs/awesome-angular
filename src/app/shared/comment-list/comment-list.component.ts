import { Component, ElementRef, Input, OnInit } from '@angular/core';
import * as hash from 'hash.js';

declare const Gitalk: any;

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {

  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  @Input()
  id: string;

  ngOnInit(): void {
    const instance = new Gitalk({
        clientID: 'Iv1.41931dc1b14987c5',
        clientSecret: 'f7040bec377e010ab202d8d0d4589d32a6706610',
        repo: 'awesome-angular',
        owner: 'ng-docs',
        admin: ['asnowwolf'],
        id: hash.sha1().update(location.pathname).digest('hex'),      // Ensure uniqueness and length less than 50
        distractionFreeMode: false,  // Facebook-like distraction free mode
      },
    );

    instance.render(this.elementRef.nativeElement);
  }

}
