import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOption = { headers: new HttpHeaders({ 'content-Type' : 'Application/json' , 'responseType': 'text'})};

@Injectable({
  providedIn: 'root' 
})
export class TableDefService {

  private apiURL = 'http://127.0.0.1:8080/OnlineResturant-1.0-SNAPSHOT/webresources/Orders';

  constructor(private _http: HttpClient) { }


}
