import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutNavComponent } from './layout-nav/layout-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { IconAngularComponent } from './icons/icon-angular/icon-angular.component';
import { IconGithubComponent } from './icons/icon-github/icon-github.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  declarations: [
    LayoutNavComponent,
    IconAngularComponent,
    IconGithubComponent,
  ],
  exports: [
    LayoutNavComponent,
  ],
})
export class CoreModule {
}
