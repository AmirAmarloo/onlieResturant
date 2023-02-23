import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TakeawayStuff } from '../_models/takeawayStuff';

const httpOption = { headers: new HttpHeaders({ 'content-Type' : 'Application/json' , 'responseType': 'text'})};

@Injectable({
  providedIn: 'root'
})

export class TakeawayStuffService {
  
  private apiURL = 'http://127.0.0.1:8080/OnlineResturant-1.0-SNAPSHOT/webresources/TakeawayStuff';

  constructor(private _http: HttpClient) { }

  addTakeawayStuff(data: TakeawayStuff): Observable<TakeawayStuff>{
    return this._http.post<TakeawayStuff>(`${this.apiURL}/addTakeawayStuff`, data, httpOption)
  }

  updateTakeawayStuff(data: TakeawayStuff): Observable<TakeawayStuff>{
    console.log('in update service')
    return this._http.post<TakeawayStuff>(`${this.apiURL}/updateTakeawayStuff`, data, httpOption);
  } 

  deleteTakeawayStuff(data: TakeawayStuff): Observable<TakeawayStuff>{
    return this._http.post<TakeawayStuff>(`${this.apiURL}/deleteTakeawayStuff`, data, httpOption);
  }

  getAllTakeawayStuff(): Observable<TakeawayStuff[]>{
    return this._http.get<TakeawayStuff[]>(`${this.apiURL}/getAllTakeawayStuff`, httpOption)
  } 
  

}
