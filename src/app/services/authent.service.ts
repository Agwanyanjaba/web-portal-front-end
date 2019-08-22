import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {ConfigService} from './config.service';
import {Login} from '../model/login';
import {Observable, of} from 'rxjs';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class AuthenticationService {

    constructor(private http: HttpClient, private configservice: ConfigService ) {
    }

    /** POST: Login API Logic */
    login (login: Login): Observable<Login> {
        return this.http.post<Login>(this.configservice.BaseUrl + this.configservice.USERSLOGIN, login, httpOptions).pipe(
            tap((loginDetails: Login) => localStorage.setItem('currentUser', JSON.stringify(loginDetails)),
            catchError(this.handleError<Login>('login'))
        ));
    }

    logout (): Observable<Login> {
        const tokeni = localStorage.getItem('token');
        const userinfo = ({token: tokeni}); // Stringify payload
        return this.http.post<Login>(this.configservice.BaseUrl + this.configservice.USERSLOGOUT, userinfo , httpOptions).pipe(
            tap((login: Login) => this.log(`Added Data`)),
            catchError(this.handleError<Login>('login'))
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
