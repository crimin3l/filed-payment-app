import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { NumberDirective } from '../payments/shared/numbers-only.directive';
import { CreditCardNumberWhitespacerDirective } from '../payments/shared/creditCardNumberWhitespacer.directive';
import { AppConfigModule } from '../app-config.module';


@NgModule({
  declarations: [
    PaymentPageComponent,
    PaymentFormComponent,
    NumberDirective,
    CreditCardNumberWhitespacerDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppConfigModule
  ],
  exports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class PaymentsModule { }
