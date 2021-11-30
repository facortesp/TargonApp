import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url=environment.apiBaseUrl;
  firekey=environment.firekey;

  constructor(private http:HttpClient) { }

  public login(body:any):Observable<any> 
  {
      return this.http.post( `${this.url}/v1/accounts:signInWithPassword?key=${this.firekey}`,body);

  }

  public signUp(body:any):Observable<any> 
  {
      return this.http.post( `${this.url}/v1/accounts:signUp?key=${this.firekey}`,body);

  }

}
