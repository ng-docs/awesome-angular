import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsLayoutComponent } from './news-layout/news-layout.component';
import { SharedModule } from '../shared/shared.module';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsShowComponent } from './news-show/news-show.component';

@NgModule({
  imports: [
    CommonModule,
    NewsRoutingModule,
    SharedModule,
  ],
  declarations: [NewsLayoutComponent, NewsListComponent, NewsShowComponent],
})
export class NewsModule {
}
