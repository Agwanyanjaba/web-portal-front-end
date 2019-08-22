import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/internal/operators';
import { SettlementAccount } from '../model/settlementacct';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SettlementAccountService {

  constructor(private http: HttpClient, private configservice: ConfigService ) {
  }

   /** POST: Enable Merchants Settlement Account */
  enableMerchantSettlementAccount (userinfo): Observable<SettlementAccount> {
    return this.http.post<SettlementAccount>(this.configservice.BaseUrl +
      this.configservice.ENABLEMERCHANTSETTLEMENTACCOUNT, userinfo, httpOptions).pipe(
      tap((details: SettlementAccount) => this.log(`details`)),
      catchError(this.handleError<SettlementAccount>('Details'))
    );
  }
  disableMerchantSettlementAccount (userinfo): Observable<SettlementAccount> {
    return this.http.post<SettlementAccount>(this.configservice.BaseUrl +
      this.configservice.DISABLEMERCHANTSETTLEMENTACCOUNT, userinfo, httpOptions).pipe(
      tap((details: SettlementAccount) => this.log(`details`)),
      catchError(this.handleError<SettlementAccount>('Details'))
    );
  }

  // getActiveMerchantChargeDetails(merchantDetails): Observable<Charges> {
  //   return this.http.post<Charges>(this.configservice.BaseUrl + this.configservice.GETACTIVEMERCHANTCHARGESDETAILS,
  //     merchantDetails, httpOptions).pipe(
  //     tap((charges: Charges) => this.log(`Charges`)),
  //     catchError(this.handleError<Charges>('Charges'))
  //   );
  // }


  // editActiveMerchantChargeDetails(chargeDetails): Observable<Charges> {
  //   return this.http.post<Charges>(this.configservice.BaseUrl + this.configservice.EDITACTIVEMERCHANTCHARGESDETAILS,
  //     chargeDetails, httpOptions).pipe(
  //     tap((charges: Charges) => this.log(`Charges`)),
  //     catchError(this.handleError<Charges>('Charges'))
  //   );
  //  }

   /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log('Error Message' + message);
  }
}
