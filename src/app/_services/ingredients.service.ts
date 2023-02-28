import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingredient } from '../_models/Ingredient';

const httpOption = { headers: new HttpHeaders({ 'Content-Type' : 'Application/json'})};

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  private apiURL = 'http://127.0.0.1:8080/OnlineResturant-1.0-SNAPSHOT/webresources/Ingredients';

  constructor(private _http: HttpClient) { }

  addIngredient(data: Ingredient) : Observable<Ingredient>{
    return this._http.post<Ingredient>(`${this.apiURL}/addIngredients`, data, httpOption);
  }

}
