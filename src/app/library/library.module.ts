import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { LibraryLayoutComponent } from './library-layout/library-layout.component';
import { SharedModule } from '../shared/shared.module';
import { LibraryListComponent } from './library-list/library-list.component';
import { LibraryShowComponent } from './library-show/library-show.component';

@NgModule({
  imports: [
    CommonModule,
    LibraryRoutingModule,
    SharedModule,
  ],
  declarations: [LibraryLayoutComponent, LibraryListComponent, LibraryShowComponent],
})
export class LibraryModule {
}
