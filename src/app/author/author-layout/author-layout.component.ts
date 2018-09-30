import { Component, OnInit } from '@angular/core';
import { authors } from '../data/authors';

@Component({
  selector: 'app-author-layout',
  templateUrl: './author-layout.component.html',
  styleUrls: ['./author-layout.component.scss'],
})
export class AuthorLayoutComponent implements OnInit {

  constructor() {
  }

  authors = authors;

  ngOnInit() {
  }

}
