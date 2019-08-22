import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/internal/operators';
import {Charges} from '../model/charges';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ChargesService {

  constructor(private http: HttpClient, private configservice: ConfigService ) {
  }

  /** POST: Get Active Merchant API Logic */
  getActiveMerchantCharges (): Observable<Charges> {
    const tokeni = localStorage.getItem('token');
    const userinfo = ({token: tokeni}); // Stringify payload
    return this.http.post<Charges>(this.configservice.BaseUrl + this.configservice.GETACTIVEMERCHANTCHARGES, userinfo, httpOptions).pipe(
      tap((charges: Charges) => this.log(`Charges`)),
      catchError(this.handleError<Charges>('charges'))
    );
  }


  /** POST: Assign Merchants Charge API Logic */
  assignActiveMerchantsCharge (chargeDetails): Observable<Charges> {
    return this.http.post<Charges>(this.configservice.BaseUrl + this.configservice.ASSIGNMERCHANTCHARGES, chargeDetails, httpOptions).pipe(
      tap((merchants: Charges) => this.log(`Merchants`)),
      catchError(this.handleError<Charges>('Merchants'))
    );
  }

  getActiveMerchantChargeDetails(merchantDetails): Observable<Charges> {
    return this.http.post<Charges>(this.configservice.BaseUrl + this.configservice.GETACTIVEMERCHANTCHARGESDETAILS,
      merchantDetails, httpOptions).pipe(
      tap((charges: Charges) => this.log(`Charges`)),
      catchError(this.handleError<Charges>('Charges'))
    );
  }


  editActiveMerchantChargeDetails(chargeDetails): Observable<Charges> {
    return this.http.post<Charges>(this.configservice.BaseUrl + this.configservice.EDITACTIVEMERCHANTCHARGESDETAILS, 
      chargeDetails, httpOptions).pipe(
      tap((charges: Charges) => this.log(`Charges`)),
      catchError(this.handleError<Charges>('Charges'))
    );
   }

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
