import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Takeaway } from '../_models/takeaway';

const httpOption = { headers: new HttpHeaders({ 'content-Type' : 'Application/json' , 'responseType': 'text'})};

@Injectable({
  providedIn: 'root'
})

export class TakeawayService {

  private apiURL = 'http://127.0.0.1:8080/OnlineResturant-1.0-SNAPSHOT/webresources/Takeaway';

  constructor(private _http: HttpClient) { }

  addTakeaway(data: Takeaway): Observable<Takeaway>{
    return this._http.post<Takeaway>(`${this.apiURL}/addTakeaway`, data, httpOption)
  }

  updateTakeaway(data: Takeaway): Observable<Takeaway>{
    console.log('in update service')
    return this._http.post<Takeaway>(`${this.apiURL}/updateTakeaway`, data, httpOption);
  } 

  deleteTakeaway(data: Takeaway): Observable<Takeaway>{
    return this._http.post<Takeaway>(`${this.apiURL}/deleteTakeaway`, data, httpOption);
  }

  getAllTakeawayStuff(): Observable<Takeaway[]>{
    return this._http.get<Takeaway[]>(`${this.apiURL}/getAllTakeaway`, httpOption)
  } 
}
