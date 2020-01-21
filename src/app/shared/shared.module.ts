import { LayoutModule } from '@angular/cdk/layout';
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
import { ToggleDirective } from './directives/toggle.directive';
import { IconAngularComponent } from './icons/icon-angular/icon-angular.component';
import { IconGithubComponent } from './icons/icon-github/icon-github.component';
import { LayoutNavComponent } from './layout-nav/layout-nav.component';
import { MarkdownViewerComponent } from './markdown-viewer/markdown-viewer.component';
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
