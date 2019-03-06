import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import localeZh from '@angular/common/locales/zh';
import { registerLocaleData, ViewportScroller } from '@angular/common';
import { PartialScroller } from './core/services/partial-scroller.service';

registerLocaleData(localeZh);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'awesomeAngularApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'zh' },
    { provide: ViewportScroller, useClass: PartialScroller },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
