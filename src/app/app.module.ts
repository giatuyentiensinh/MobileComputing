import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Connectivity } from '../providers/connectivity';
import { GoogleMaps } from '../providers/google-maps';
import { Locations } from '../providers/locations';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { SearchPage } from '../pages/search/search';
import { MapPage } from '../pages/map/map';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    SearchPage,
    MapPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    SearchPage,
    MapPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, Connectivity, GoogleMaps, Locations]
})
export class AppModule { }
