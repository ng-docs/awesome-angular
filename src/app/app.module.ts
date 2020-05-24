import { registerLocaleData, ViewportScroller } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeZh from '@angular/common/locales/zh';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PartialScroller } from './core/services/partial-scroller.service';

registerLocaleData(localeZh);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'awesomeAngularApp' }),
    AppRoutingModule,
    HttpClientModule,
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
