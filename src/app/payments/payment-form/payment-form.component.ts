import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl, FormControl } from '@angular/forms';
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
  creditCardPayment = new CreditCardPayment();
  paymentForm: FormGroup;

  private paymentSubscription: Subscription;
  isSubmiting: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private paymentService: PaymentService,
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
      { // this can also be validated once for all the form using a custom validator here
        // validator: paymentFormValidator()
      }
    );
  }

  ngOnDestroy(): void {
    if (this.paymentSubscription) {
      this.paymentSubscription.unsubscribe();
    }
  }

  get creditCardNumber(): FormControl {
    return this.paymentForm.get('creditCardNumber') as FormControl;
  }

  get cardholder(): FormControl {
    return this.paymentForm.get('cardholder') as FormControl;
  }

  get securityCode(): FormControl {
    return this.paymentForm.get('securityCode') as FormControl;
  }

  get amount(): FormControl {
    return this.paymentForm.get('creditCardNumber') as FormControl;
  }

  get expirationDate(): FormControl {
    return this.paymentForm.get('creditCardNumber') as FormControl;
  }

  // onClick handler
  onClickCollectData(): boolean {
    this.creditCardPayment.setCreditCardNumber(this.creditCardNumber.value);
    this.creditCardPayment.setCardholder(this.cardholder.value);
    this.creditCardPayment.setSecurityCode(this.securityCode.value);
    this.creditCardPayment.setAmount(this.amount.value);
    this.creditCardPayment.setExpirationDate(computeExpirationDate(this.expirationDate.value));
    return true;
    // in case we encounter any blocking issues we can suspend the firing of onSubmit handler by returning false
  }

  // onSubmit handler
  submitPayment(): void {
    this.isSubmiting = true;
    this.paymentSubscription = this.paymentService.makePayment(this.creditCardPayment)
      .subscribe(
        () => {
          this.isSubmiting = false;
        },
        error => {
          console.log(error);
        },
      );
    this.paymentForm.reset();
    this.creditCardNumber.clearValidators();
    this.creditCardNumber.updateValueAndValidity();
  }

}
