import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface AuthenticationDataDto {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }


  public login(authenticationData: AuthenticationDataDto) : Observable<any> {
    return this._http.post(`${environment.API_URL}/login`, authenticationData)
  }

}
