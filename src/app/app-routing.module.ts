import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentPageComponent } from './payments/payment-page/payment-page.component';

const routes: Routes = [
  { path: 'payment-page', component: PaymentPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
