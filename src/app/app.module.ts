import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FlutterwaveModule } from 'flutterwave-angular-v3';
import { HttpClientModule } from '@angular/common/http';
import { BreakPipe } from './analytics/break.pipe';
@NgModule({
  declarations: [AppComponent, BreakPipe],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), AppRoutingModule, HttpClientModule,

  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
