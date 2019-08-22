import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';
import {Observable, of} from 'rxjs';
import {Users} from '../model/users';
import {catchError, tap} from 'rxjs/internal/operators';
import {Userroles} from '../model/userrolets';
import {SettlementInstructions} from '../model/settlementinstructions';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UsersService {

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

  /** GET: Get Users LIST API Logic */
  getIEATAUsers(page: number): Observable<Users> {
    return this.http.get<Users>(this.configservice.BaseUrl + this.configservice.GETIEATTAUSERS +
      '?page=' + page + '&size=10', httpOptions).pipe(
      tap((User: Users) => this.log(`Users`)),
      catchError(this.handleError<Users>('UsersDetails'))
    );
  }
  /** POST: Usesr Details API Logic */
  getUserDetails (id: number): Observable<Users> {
    const userdetails = ({id: id}); // Stringify payload
    console.log('passing what data', userdetails);
    return this.http.post<Users>(this.configservice.BaseUrl + this.configservice.GETIEATTAUSERSDETAILS,
      userdetails, httpOptions).pipe(
      tap((userdetail: Users) => this.log(`User Details`)),
      catchError(this.handleError<Users>('UserDetails'))
    );
  }
    showUser(id: number): Observable<Users> {
        const tokeni = localStorage.getItem('token');
        const userinfo = ({token: tokeni, userId: id}); // Stringify payload
        return this.http.post<Users>(this.configservice.BaseUrl + this.configservice.GETUSER, userinfo, httpOptions).pipe(
            tap((user: Users) => this.log(`Users`)),
            catchError(this.handleError<Users>('user'))
        );
    }


    updateUserRole(userrole: Userroles): Observable<Users> {
        return this.http.post<Users>(this.configservice.BaseUrl + this.configservice.UPDATEUSERROLE, userrole, httpOptions).pipe(
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
