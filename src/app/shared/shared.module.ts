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
import { SvgTitleComponent } from './svg-title/svg-title.component';

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
    SvgTitleComponent,
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
  ],
})
export class SharedModule {
}
