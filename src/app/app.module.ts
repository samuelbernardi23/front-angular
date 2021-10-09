import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule } from './layouts/index';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { AppRoutingModule } from './app-routing.module';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FooterModule } from './shared/components';
import { AppService } from './app.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    FooterModule,
    AppRoutingModule,
    DxDataGridModule,
    DxFormModule,
  ],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService,
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
