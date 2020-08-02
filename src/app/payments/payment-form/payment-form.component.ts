import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { PaymentService } from '../paymentService/payment.service';
import { expirationDateValidator } from '../shared/payment-form-validators';
import { creditCardNumberValidator } from '../shared/payment-form-validators';
import { CreditCardPayment } from '../model/creditCardPayment/creditCardPayment';
import { computeExpirationDate } from '../shared/payment-form-validators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})

export class PaymentFormComponent implements OnInit, OnDestroy {
  creditCardPayment: CreditCardPayment = new CreditCardPayment();
  paymentForm: FormGroup;
  private paymentSubscription: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    const cardholderRegex = `[a-zA-Z]*[\\s]{1}[a-zA-Z].*`;
    this.paymentForm = this.formBuilder.group(
      {
        creditCardNumber: ['', [
          Validators.required,
          Validators.minLength(12),
          creditCardNumberValidator()]],
        cardholder: ['', [
          Validators.required,
          Validators.pattern(cardholderRegex),
          Validators.minLength(3)]],
        expirationDate: ['', [
          Validators.required,
          expirationDateValidator()]],
        securityCode: ['', [
          Validators.minLength(3),
          Validators.maxLength(3),
        ]],
        amount: ['', Validators.required]
      },
      {   // this can also be validated once for all the form using a custom validator here
        // validator: paymentFormValidator()
      }
    );
  }

  ngOnDestroy(): void {
    this.paymentSubscription.unsubscribe();
  }
  onClickCollectData(): boolean {

    // this is the onclick handler, we can use this to collect the data from the form and populate the DTO
    this.creditCardPayment.setCreditCardNumber(this.paymentForm.get('creditCardNumber').value);
    this.creditCardPayment.setCardholder(this.paymentForm.get('cardholder').value);
    this.creditCardPayment.setSecurityCode(this.paymentForm.get('securityCode').value);
    this.creditCardPayment.setAmount(this.paymentForm.get('amount').value);
    this.creditCardPayment.setExpirationDate(computeExpirationDate(this.paymentForm.get('expirationDate').value));
    return true;
    // in case we encounter any blocking issues we can suspend the firing of onSubmit handler by returning false
  }

  submitPayment(): void {
    // this handler gets executed after the completion of the onClick event
    // we can use this to subscribe to the payment service and submit the payment
    this.paymentSubscription = this.paymentService.makePayment(this.creditCardPayment)
      .subscribe(() => {
      },
        error => {
          console.log(error);
        },
        () => {
          console.log('completed');
        }
      );
    console.log('model-based form submitted');
  }

}
