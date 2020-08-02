import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { CreditCardPayment } from '../model/creditCardPayment/creditCardPayment';


@Injectable({ providedIn: 'root', })
export class PaymentService {
    private paymentUrl = 'http://localhost:9000/addCreditCard';
    constructor(private http: HttpClient) { }

    makePayment(dataObject: CreditCardPayment): Observable<CreditCardPayment> {
        console.log("starting call");
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        const options = {
            headers
        };

        return this.http.post<CreditCardPayment>(this.paymentUrl, dataObject, options)
            .pipe(
                retry(3), // retry a failed request up to 3 times
                catchError(this.handleError) // then handle the error
            );
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = 'Unknown error!';
        if (error.error instanceof ErrorEvent) {
            // Client-side errors
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side errors
            errorMessage = `Error Code: ${error.status};
            Message: ${error.message}`;
        }
        return throwError(errorMessage);
    }

}
