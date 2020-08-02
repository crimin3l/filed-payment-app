import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaymentsModule } from './payments/payments.module';
import { environment } from 'src/environments/environment';
import { AppConfigModule } from './app-config.module';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export class AppConfig {
  apiEndpoint: string;
}
export const APP_DI_CONFIG: AppConfig = {
  apiEndpoint: environment.apiEndpoint
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    PaymentsModule,
    AppConfigModule
  ],
  providers: [{
    provide: AppConfig,
    useValue: APP_DI_CONFIG}],
  bootstrap: [AppComponent]
})
export class AppModule { }



