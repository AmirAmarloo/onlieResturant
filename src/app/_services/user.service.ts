import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../_models/users';
import { Observable } from 'rxjs';
import { LoginUser } from '../_models/loginUser';

const httpOption = { headers: new HttpHeaders({ 'Content-Type' : 'Application/json'})};
const gethttpOption = { headers: new HttpHeaders({ 'Content-Type' : 'Application/json'})};


@Injectable({
  providedIn: 'root'
})
export class userService {

  private apiURL = 'http://127.0.0.1:8080/OnlineResturant-1.0-SNAPSHOT/webresources/Users';

  constructor(private _http: HttpClient) { }

  getUsers() : Observable<Users[]> {
    return this._http.get<Users[]>(`${this.apiURL}/getAllUsers`, httpOption);
  }

  addUser(data: Users) : Observable<Users>{
    console.log(data);
    console.log(`${this.apiURL}/addNewUser`);
    return this._http.post<Users>(`${this.apiURL}/addNewUser`, data, httpOption);
  }

  updateUser(data: Users): Observable<Users>{
    console.log('in user update service')
    return this._http.post<Users>(`${this.apiURL}/updateUser`, data, httpOption);
  } 

  deleteUsers(data: Users): Observable<Users>{
    return this._http.post<Users>(`${this.apiURL}/deleteUser`, data, httpOption);
  }

  loginUser(data: LoginUser) : Observable<Users> {
    return this._http.post<Users>(`${this.apiURL}/loginUser`, data, httpOption);
  }

  resetpassword(email: string): Observable<boolean>{
    return this._http.post<boolean>(`${this.apiURL}/resetPassword`, {"email": email}, httpOption);
  }

  effectChangePassword(chageData: {email:string, password:string, token:string}){
    console.log('passed token to service: ', chageData.token)
    return this._http.post<Users>(`${this.apiURL}/resetPasswordLink`, chageData, httpOption);
  }

  isLogin(){
    return !!localStorage.getItem('token');
  }
}
