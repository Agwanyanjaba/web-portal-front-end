import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';
import {Observable, of} from 'rxjs';
import {Users} from '../model/users';
import {catchError, tap} from 'rxjs/internal/operators';
import {Userroles} from '../model/userrolets';
import {Merchants} from '../model/merchants';
import {Search} from '../model/search';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MerchantsService {

  constructor(private http: HttpClient, private configservice: ConfigService ) {
  }

  /** POST: Login API Logic */
  getUsers (): Observable<Users> {
    const tokeni = localStorage.getItem('token');
    const userinfo = ({token: tokeni}); // Stringify payload
    return this.http.post<Users>(this.configservice.BaseUrl + this.configservice.GETUSERS, userinfo, httpOptions).pipe(
      tap((users: Users) => this.log(`Users`)),
      catchError(this.handleError<Users>('users'))
    );
  }


  /** POST: Get Active Merchants API Logic */
  getActiveMerchants (page: number): Observable<Merchants> {
    const tokeni = localStorage.getItem('token');
    const userinfo = ({token: tokeni}); // Stringify payload
    return this.http.post<Merchants>(this.configservice.BaseUrl + this.configservice.GETACTIVEMERCHANTS +
      '?page=' + page + '&size=10', userinfo, httpOptions).pipe(
      tap((merchants: Merchants) => this.log(`Merchants`)),
      catchError(this.handleError<Merchants>('Merchants'))
    );
  }

  /** POST: Get Inactive Merchants API Logic */
  getInactiveMerchants (page: number): Observable<Merchants> {
    const tokeni = localStorage.getItem('token');
    const userinfo = ({token: tokeni}); // Stringify payload
    return this.http.post<Merchants>(this.configservice.BaseUrl + this.configservice.GETINACTIVEMERCHANTS +
       '?page=' + page + '&size=10', userinfo, httpOptions).pipe(
      tap((merchants: Merchants) => this.log(`Merchants`)),
      catchError(this.handleError<Merchants>('Merchants'))
    );
  }

  /** POST: Get Merchants Pending Activation API Logic */
  getMerchantsPendingActivation (page: number): Observable<Merchants> {
    const tokeni = localStorage.getItem('token');
    const userinfo = ({token: tokeni}); // Stringify payload
    return this.http.post<Merchants>(this.configservice.BaseUrl + this.configservice.GETMERCHANTSPENDINGACTIVATION +
      '?page=' + page + '&size=10', userinfo, httpOptions).pipe(
      tap((merchants: Merchants) => this.log(`Merchants`)),
      catchError(this.handleError<Merchants>('Merchants'))
    );
  }

  getMerchantDetails(id: number): Observable<Merchants> {
    const tokeni = localStorage.getItem('token');
    const userinfo = ({token: tokeni, merchantId: id}); // Stringify payload
    return this.http.post<Users>(this.configservice.BaseUrl + this.configservice.GETMERCHANTDETAILS, userinfo, httpOptions).pipe(
      tap((merchant: Merchants) => this.log(`Merchants`)),
      catchError(this.handleError<Merchants>('merchant'))
    );
  }
  searchMerchantDetails (data: Search): Observable<Search> {
    const tokeni = localStorage.getItem('token');
    const userinfo = ({token: tokeni, data}); // Stringify payload
    return this.http.post<Search>(this.configservice.BaseUrl + this.configservice.SEARCHMERCHANTDETAILS, userinfo, httpOptions).pipe(
      tap((searchDetails: Search) => this.log('Search Details'),
        catchError(this.handleError<Search>('search'))
      ));
  }

  configureSecurity (userinfo): Observable<Merchants> {
    // Stringify payload
    return this.http.post<Merchants>(this.configservice.BaseUrl + this.configservice.CONFIGURESECURITY
      , userinfo, httpOptions).pipe(
      tap((details: Merchants) => this.log(`Details`)),
      catchError(this.handleError<Merchants>('Details'))
    );
  }
  makerApproveMerchant(userinfo): Observable<Merchants> {
    // Stringify payload
    return this.http.post<Merchants>(this.configservice.BaseUrl + this.configservice.MAKERAPPROVEMERCHANTREGISTRATION
      , userinfo, httpOptions).pipe(
      tap((details: Merchants) => this.log(`Details`)),
      catchError(this.handleError<Merchants>('Details'))
    );
  }


  updateUserRole(userrole: Userroles): Observable<Users> {
    return this.http.post<Users>(this.configservice.BaseUrl+ this.configservice.UPDATEUSERROLE, userrole, httpOptions).pipe(
      tap((user: Users) => this.log(`Users`)),
      catchError(this.handleError<Users>('user'))
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
    console.log('Error Message'+ message);
  }
}
