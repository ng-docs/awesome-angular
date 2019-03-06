import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule,
} from '@angular/material';
import { LayoutNavComponent } from './layout-nav/layout-nav.component';
import { IconAngularComponent } from './icons/icon-angular/icon-angular.component';
import { IconGithubComponent } from './icons/icon-github/icon-github.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { ToggleDirective } from './directives/toggle.directive';
import { MarkdownViewerComponent } from './markdown-viewer/markdown-viewer.component';
import { PartialScrollerDirective } from './directives/partial-scroller.directive';

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
  ],
  declarations: [
    LayoutNavComponent,
    IconAngularComponent,
    IconGithubComponent,
    SearchBoxComponent,
    ToggleDirective,
    MarkdownViewerComponent,
    PartialScrollerDirective,
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
  ],
})
export class SharedModule {
}
