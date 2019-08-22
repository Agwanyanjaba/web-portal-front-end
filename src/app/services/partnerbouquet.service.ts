import { Outlets } from './../model/outlets';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/internal/operators';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PartnerBouquetService {

  constructor(private http: HttpClient, private configservice: ConfigService ) {
  }

  approveBouquetService (userinfo): Observable<Outlets> {
    // Stringify payload
    return this.http.post<Outlets>(this.configservice.BaseUrl + this.configservice.APPROVEBOUQUETSERVICE
      , userinfo, httpOptions).pipe(
      tap((outlets: Outlets) => this.log(`Outlets`)),
      catchError(this.handleError<Outlets>('outlets'))
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
