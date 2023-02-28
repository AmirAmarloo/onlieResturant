import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Orders } from '../_models/Orders';
import { Observable } from 'rxjs';
import { OrdersShow } from '../_models/orderShow';

const httpOption = { headers: new HttpHeaders({ 'content-Type' : 'Application/json' , 'responseType': 'text'})};

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private apiURL = 'http://127.0.0.1:8080/OnlineResturant-1.0-SNAPSHOT/webresources/Orders';

  constructor(private _http: HttpClient) { }

  addOrder(data: Orders): Observable<Orders>{
    return this._http.post<Orders>(`${this.apiURL}/addOrder`, data, httpOption)
  } 

  updateOrder(data: Orders): Observable<Orders>{
    console.log('in update service')
    return this._http.post<Orders>(`${this.apiURL}/updateOrder`, data, httpOption);
  } 
 
  deleteOrders(data: Orders): Observable<Orders>{
    return this._http.post<Orders>(`${this.apiURL}/deleteOrder`, data, httpOption);
  }

  getAllOrders(data: number): Observable<OrdersShow[]>{
    return this._http.post<OrdersShow[]>(`${this.apiURL}/getOrders`, data, httpOption)
  }

  submitOrder(userId: number): Observable<Orders>{
    return this._http.post<Orders>(`${this.apiURL}/submitOrder`, userId, httpOption);
  }

  changeStatus(data: Orders): Observable<Orders>{
   return this._http.post<Orders>(`${this.apiURL}/changeStatus`, data, httpOption);
  }

  getOrdersByStatus(data: Orders): Observable<Orders[]>{
   return this._http.post<Orders[]>(`${this.apiURL}/getOrdersByStatus`, data, httpOption);
  }

}