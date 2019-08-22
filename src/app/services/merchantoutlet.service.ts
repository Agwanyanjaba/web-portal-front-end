import { Outlets } from './../model/outlets';
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
export class MerchantOutletService {

  constructor(private http: HttpClient, private configservice: ConfigService ) {
  }

  /** POST: Login API Logic */
  getAllMerchantMids (userinfo): Observable<Outlets> {
    // Stringify payload
    return this.http.post<Outlets>(this.configservice.BaseUrl + this.configservice.GETALLMERCHANTMID
      , userinfo, httpOptions).pipe(
      tap((outletsmid: Outlets) => this.log(`Outlets`)),
      catchError(this.handleError<Outlets>('outletsmid'))
    );
  }

  getActiveMerchantOutletDetails (userinfo): Observable<Outlets> {
    // Stringify payload
    return this.http.post<Outlets>(this.configservice.BaseUrl + this.configservice.GETACTIVEMERCHANTOUTLETDETAILS
      , userinfo, httpOptions).pipe(
      tap((outlets: Outlets) => this.log(`Outlets`)),
      catchError(this.handleError<Outlets>('outlets'))
    );
  }

  editActiveMerchantOutletMid (userinfo): Observable<Outlets> {
    // Stringify payload
    return this.http.post<Outlets>(this.configservice.BaseUrl + this.configservice.EDITACTIVEMERCHANTOUTLETMID
      , userinfo, httpOptions).pipe(
      tap((outlets: Outlets) => this.log(`Outlets`)),
      catchError(this.handleError<Outlets>('outlets'))
    );
  }

   /** POST: Enable Merchants Settlement Account */
  // enableMerchantSettlementAccount (accountId: Number): Observable<SettlementAccount> {
  //   return this.http.post<SettlementAccount>(this.configservice.BaseUrl +
  //     this.configservice.ENABLEMERCHANTSETTLEMENTACCOUNT, accountId, httpOptions).pipe(
  //     tap((details: SettlementAccount) => this.log(`details`)),
  //     catchError(this.handleError<SettlementAccount>('Details'))
  //   );
  // }
  // disableMerchantSettlementAccount (accountId: Number): Observable<SettlementAccount> {
  //   return this.http.post<SettlementAccount>(this.configservice.BaseUrl +
  //     this.configservice.ENABLEMERCHANTSETTLEMENTACCOUNT, accountId, httpOptions).pipe(
  //     tap((details: SettlementAccount) => this.log(`details`)),
  //     catchError(this.handleError<SettlementAccount>('Details'))
  //   );
  // }

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
