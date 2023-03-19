import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservationDef } from '../_models/reservationDef';
import { BookTable } from '../_models/bookTable';

const httpOption = { headers: new HttpHeaders({ 'content-Type' : 'Application/json' , 'responseType': 'text'})};

@Injectable({
  providedIn: 'root'
})
export class ReservationDefinationService {

  private apiURL = 'http://127.0.0.1:8080/OnlineResturant-1.0-SNAPSHOT/webresources/reservation';

  constructor(private _http: HttpClient) { }
  
  reservationDef(data: ReservationDef): Observable<ReservationDef>{
    return this._http.post<ReservationDef>(`${this.apiURL}/reservationDef`, data, httpOption);
  }

  doDookTable(data: BookTable): Observable<BookTable>{
    return this._http.post<BookTable>(`${this.apiURL}/bookTable`, data, httpOption);
  }


}
