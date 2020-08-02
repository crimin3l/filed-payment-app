export interface ICreditCardPayment {

    creditCardNumber: string;
    cardholder: string;
    expirationDate: Date;
    securityCode: string;
    amount: number;

}

export class CreditCardPayment implements ICreditCardPayment {
    
    constructor() {}
       creditCardNumber: string;
       cardholder: string;
       expirationDate: Date;
       securityCode: string;
       amount: number;

    setCreditCardNumber = (creditCardNumber: string) => {
        this.creditCardNumber = creditCardNumber;
    }

    setCardholder = (cardholder: string) => {
        this.cardholder = cardholder;
    }

    setExpirationDate = (expirationDate: Date) => {
        this.expirationDate = expirationDate;
    }

    setSecurityCode = (securityCode: string) => {
        this.securityCode = securityCode;
    }

    setAmount = (amount: number) => {
        this.amount = amount;
    }
}
