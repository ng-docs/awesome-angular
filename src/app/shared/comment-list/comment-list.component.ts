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
        clientID: '13163246d86291d4c66b',
        clientSecret: '15386e1378badcfbe33d34f2534fd554f5c3901f',
        repo: 'blog',
        owner: 'asnowwolf',
        admin: ['asnowwolf'],
        id: hash.sha1().update(location.pathname).digest('hex'),      // Ensure uniqueness and length less than 50
        distractionFreeMode: false,  // Facebook-like distraction free mode
      },
    );

    instance.render(this.elementRef.nativeElement);
  }

}
