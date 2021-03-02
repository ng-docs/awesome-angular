import { LayoutModule } from '@angular/cdk/layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { PartialScrollerDirective } from './directives/partial-scroller.directive';
import { ScrollIntoViewDirective } from './directives/scroll-into-view.directive';
import { ToggleDirective } from './directives/toggle.directive';
import { IconGithubComponent } from './icons/icon-github/icon-github.component';
import { IconWangkeComponent } from './icons/icon-wangke/icon-wangke.component';
import { LayoutNavComponent } from './layout-nav/layout-nav.component';
import { MarkdownViewerComponent } from './markdown-viewer/markdown-viewer.component';
import { OutlineAreaDirective } from './outline/outline-area.directive';
import { OutlineCssPipe } from './outline/outline-css.pipe';
import { OutlineHostDirective } from './outline/outline-host.directive';
import { OutlineComponent } from './outline/outline.component';
import { ShowWhenActiveDirective } from './outline/show-when-active.directive';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { SafeResourceUrlPipe } from './pipes/safe-resource-url.pipe';
import { SearchBoxComponent } from './search-box/search-box.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    ScrollingModule,
  ],
  declarations: [
    LayoutNavComponent,
    IconGithubComponent,
    SearchBoxComponent,
    ToggleDirective,
    MarkdownViewerComponent,
    PartialScrollerDirective,
    OutlineAreaDirective,
    OutlineHostDirective,
    OutlineComponent,
    OutlineCssPipe,
    ShowWhenActiveDirective,
    IconWangkeComponent,
    SafeResourceUrlPipe,
    SafeHtmlPipe,
    ScrollIntoViewDirective,
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    LayoutNavComponent,
    SearchBoxComponent,
    ToggleDirective,
    MarkdownViewerComponent,
    OutlineAreaDirective,
    OutlineHostDirective,
    OutlineComponent,
    SafeResourceUrlPipe,
    SafeHtmlPipe,
    ScrollIntoViewDirective,
  ],
})
export class SharedModule {
}
