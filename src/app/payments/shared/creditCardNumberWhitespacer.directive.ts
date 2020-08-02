import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: 'input[with-whitespaces]'
})
export class CreditCardNumberWhitespacerDirective {
  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    let trimmed = input.value.replace(/\s+/g, '');
    if (trimmed.length > 16) {
      trimmed = trimmed.substr(0, 16);
    }
    let numbers = [];
    for (let i = 0; i < trimmed.length; i += 4) {
      numbers.push(trimmed.substr(i, 4));
    }
    input.value = numbers.join(' ');
  }
}
