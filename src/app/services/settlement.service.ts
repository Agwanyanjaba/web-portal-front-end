import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/internal/operators';
import {SettlementInstructions} from '../model/settlementinstructions';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SettlementService {

  constructor(private http: HttpClient, private configservice: ConfigService ) {
  }

   /** GET: Get Active Settlement Instruction LIST API Logic */
  getSettlementInstructionList (page: number): Observable<SettlementInstructions> {
       return this.http.get<SettlementInstructions>(this.configservice.BaseUrl + this.configservice.GETSETTLEMENTINSTRUCTIONS +
      '?page=' + page + '&size=10', httpOptions).pipe(
      tap((settlementInstructions: SettlementInstructions) => this.log(`Merchants`)),
      catchError(this.handleError<SettlementInstructions>('SettlementInstructions'))
    );
  }
  /** GET: Get Maker Pending Settlement Instruction LIST API Logic */
  getMakerPendingSettlementInstructionList (page: number): Observable<SettlementInstructions> {
    return this.http.get<SettlementInstructions>(this.configservice.BaseUrl + this.configservice.GETMAKERPENDINGSETTLEMENTINSTRUCTIONS +
      '?page=' + page + '&size=10', httpOptions).pipe(
      tap((settlementInstructions: SettlementInstructions) => this.log(`Merchants`)),
      catchError(this.handleError<SettlementInstructions>('SettlementInstructions'))
    );
  }
  /** GET: Get Checker Pending Settlement Instruction LIST API Logic */
  getCheckerPendingSettlementInstructionList (page: number): Observable<SettlementInstructions> {
    return this.http.get<SettlementInstructions>(this.configservice.BaseUrl + this.configservice.GETCHECKERPENDINGSETTLEMENTINSTRUCTIONS +
      '?page=' + page + '&size=10', httpOptions).pipe(
      tap((settlementInstructions: SettlementInstructions) => this.log(`Merchants`)),
      catchError(this.handleError<SettlementInstructions>('SettlementInstructions'))
    );
  }
  /** POST: Get Settlement Instruction Details API Logic */
  getSettlementInstructionDetails (payref: string): Observable<SettlementInstructions> {
    const settlementinfo = ({payRefNo: payref}); // Stringify payload
    console.log('passing what data', settlementinfo);
    return this.http.post<SettlementInstructions>(this.configservice.BaseUrl + this.configservice.GETSETTLEMENTINSTRUCTIONSDETAILS,
     settlementinfo, httpOptions).pipe(
      tap((settlementInstructionsdetails: SettlementInstructions) => this.log(`Settlement Instructions Details`)),
      catchError(this.handleError<SettlementInstructions>('SettlementInstructionsDetails'))
    );
  }

  /** POST: Maker Approve Settlement Instruction Details API Logic */
  makerApproveDetails (payref: string): Observable<SettlementInstructions> {
    const settlementinfo = ({payRefNo: payref}); // Stringify payload
    console.log('passing what data', settlementinfo);
    return this.http.post<SettlementInstructions>(this.configservice.BaseUrl + this.configservice.MAKERAPPROVESETTLEMENTINSTRUCTIONS,
      settlementinfo, httpOptions).pipe(
      tap((settlementInstructionsdetails: SettlementInstructions) => this.log(`Settlement Instructions Details`)),
      catchError(this.handleError<SettlementInstructions>('SettlementInstructionsDetails'))
    );
  }

  /** POST: Maker Approve Settlement Instruction Details API Logic */
  checkerApproveDetails (payref: string): Observable<SettlementInstructions> {
    const settlementinfo = ({payRefNo: payref}); // Stringify payload
    console.log('passing what data', settlementinfo);
    return this.http.post<SettlementInstructions>(this.configservice.BaseUrl + this.configservice.CHECKERAPPROVESETTLEMENT,
      settlementinfo, httpOptions).pipe(
      tap((settlementInstructionsdetails: SettlementInstructions) => this.log(`Settlement Instructions Details`)),
      catchError(this.handleError<SettlementInstructions>('SettlementInstructionsDetails'))
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
