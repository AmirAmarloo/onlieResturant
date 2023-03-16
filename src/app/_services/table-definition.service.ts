import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TableDef } from '../_models/tableDef';
import { Observable } from 'rxjs';

const httpOption = { headers: new HttpHeaders({ 'content-Type' : 'Application/json' , 'responseType': 'text'})};

@Injectable({
  providedIn: 'root'
})
export class TableDefinitionService {

  private apiURL = 'http://127.0.0.1:8080/OnlineResturant-1.0-SNAPSHOT/webresources/tableDef';

  constructor(private _http: HttpClient) { }
 
  defineTable(data: TableDef): Observable<TableDef> {
    return this._http.post<TableDef>(`${this.apiURL}/defineTable`, data, httpOption);
  }
  
  deleteTable(data: TableDef): Observable<TableDef> {
    return this._http.post<TableDef>(`${this.apiURL}/deleteTable`, data, httpOption);
  }

  updateTable(data: TableDef): Observable<TableDef> {
    return this._http.post<TableDef>(`${this.apiURL}/updateTable`, data, httpOption);
  }

  getAllTables(): Observable<TableDef[]>{
    return this._http.get<TableDef[]>(`${this.apiURL}/getAllTables`, httpOption)
  }
}
