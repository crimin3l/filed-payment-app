import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { CreditCardPayment } from '../model/creditCardPayment/creditCardPayment';

import { AppConfig } from '../../app.module';
import { APP_DI_CONFIG } from 'src/app/app-config.module';

@Injectable({ providedIn: 'root', })
export class PaymentService {
    constructor(
        private http: HttpClient,

        @Inject
        (AppConfig) private config: AppConfig,
        ) {}

    makePayment(dataObject: CreditCardPayment): Observable<CreditCardPayment> {
        console.log(this.config.apiEndpoint);
        const employeeString = APP_DI_CONFIG.apiEndpoint
        console.log("starting call to peyment endpoint with the following dataObject: ");
        console.log(JSON.parse(JSON.stringify(dataObject)));
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        const options = {
            headers
        };

        return this.http.post<CreditCardPayment>(employeeString, dataObject, options)
            .pipe(
                retry(3), 
                catchError(this.handleError) 
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
