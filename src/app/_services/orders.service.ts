import { Orders } from '../_models/orders';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { OrdersShow } from '../_models/orderShow';
import { DetailReport } from '../_models/detailReport';
import { SummarizeData } from '../_models/summarizeDate';


const httpOption = { headers: new HttpHeaders({ 'content-Type' : 'Application/json' , 'responseType': 'text'})};

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private apiURL = 'http://127.0.0.1:8080/OnlineResturant-1.0-SNAPSHOT/webresources/Orders';
  //totalOrderSource holds the current value and the last value of totalOrder
  public editDataDetails: any = [];
  public subject = new Subject<any>();
  private totalOrderSource = new  BehaviorSubject(this.editDataDetails);
  currentQty = this.totalOrderSource.asObservable();

  //checkOutStatus holds the current value and the last value of the ocf
  public editStatus: any = false;
  private checkOutStatus = new  BehaviorSubject(this.editStatus);
  currentStatus = this.checkOutStatus.asObservable();

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

  getAllOrders(data: Orders): Observable<OrdersShow[]>{
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

  getDetailData(data: Orders): Observable<DetailReport[]>{
   return this._http.post<DetailReport[]>(`${this.apiURL}/periodicReportDetails`, data, httpOption);
  }

  getSummarizeData(): Observable<SummarizeData[]>{
   return this._http.post<SummarizeData[]>(`${this.apiURL}/summarizeByDate`, httpOption);
  }

  changeTotalOrder(totalOrderNumber: string) {
    this.totalOrderSource.next(totalOrderNumber)
  }

  openCheckoutFunc(coStatus: any){
    this.checkOutStatus.next(coStatus);
  }

}
