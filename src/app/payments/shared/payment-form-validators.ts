import { Component, OnInit } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';


export function expirationDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } => {
    const now = new Date();
    const isValid = (now < computeExpirationDate(control.value));
    return isValid ? null : { isValid };
  };
}

// convert the expiration date from input Month type to Date type required in the service
// also works when browser does not support Month input type and falls back to text input type 
export function computeExpirationDate(month: string): Date {
  if (!month) {
  } else {
    const expirationMonth: number = Number(month.slice(-2));
    const expirationYear: number = Number(month.slice(0, 4));
    return new Date(expirationYear, expirationMonth);
  }
}

export function creditCardNumberValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const isValid = luhnCheck(control.value);
    return isValid ? null : { luhnCheck: isValid };
  };
}


export const luhnCheck = (creditCardNumber: string): boolean => {
  if (!creditCardNumber.length) {
    return;
  }

  creditCardNumber = creditCardNumber.replace(/\s/g, '');

  const lastDigit = Number(creditCardNumber[creditCardNumber.length - 1]);

  const reverseCreditCardNumber = creditCardNumber
    .slice(0, creditCardNumber.length - 1)
    .split('')
    .reverse()
    .map(x => Number(x));

  let sum = 0;

  for (let i = 0; i <= reverseCreditCardNumber.length - 1; i += 2) {
    reverseCreditCardNumber[i] = reverseCreditCardNumber[i] * 2;
    if (reverseCreditCardNumber[i] > 9) {
      reverseCreditCardNumber[i] = reverseCreditCardNumber[i] - 9;
    }
  }

  sum = reverseCreditCardNumber
    .reduce((acc, currValue) => (acc + currValue), 0);
  return ((sum + lastDigit) % 10 === 0);
};

