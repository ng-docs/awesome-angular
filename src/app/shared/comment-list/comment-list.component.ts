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
        clientID: '202b839143d084549e33',
        clientSecret: 'fdf2a2b89ddd3d03b7ba23ddd25dfa9f4d993514',
        repo: 'awesome.angular.cn',
        owner: 'asnowwolf',
        admin: ['asnowwolf'],
        id: hash.sha1().update(location.pathname).digest('hex'),      // Ensure uniqueness and length less than 50
        distractionFreeMode: false,  // Facebook-like distraction free mode
      },
    );

    instance.render(this.elementRef.nativeElement);
  }

}
