import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-layout',
  templateUrl: './article-layout.component.html',
  styleUrls: ['./article-layout.component.scss'],
})
export class ArticleLayoutComponent implements OnInit {

  constructor() {
  }

  items = [
    {
      id: '1',
      label: 'Test',
    },
  ];

  ngOnInit() {
  }

}
