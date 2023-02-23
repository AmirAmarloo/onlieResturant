import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Foods } from '../_models/foods';
import { Observable, Subject  } from 'rxjs';

const httpOption = { headers: new HttpHeaders({ 'content-Type' : 'Application/json' , 'responseType': 'text'})};

@Injectable({
  providedIn: 'root'
})
export class FoodsService {

  // public dealDetail$ = new Subject<any>();

  private apiURL = 'http://127.0.0.1:8080/OnlineResturant-1.0-SNAPSHOT/webresources/Foods';

  constructor(private _http: HttpClient) { }

  addFood(data: Foods): Observable<Foods>{
    return this._http.post<Foods>(`${this.apiURL}/addFood`, data, httpOption)
  } 

  updateFood(data: Foods): Observable<Foods>{
    console.log('in update service')
    return this._http.post<Foods>(`${this.apiURL}/updateFood`, data, httpOption);
  } 

  deleteFoods(data: Foods): Observable<Foods>{
    return this._http.post<Foods>(`${this.apiURL}/deleteFood`, data, httpOption);
  }

  getAllFoods(): Observable<Foods[]>{
    return this._http.get<Foods[]>(`${this.apiURL}/getAllFoods`, httpOption)
  } 
}
