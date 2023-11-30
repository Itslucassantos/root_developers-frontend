import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LegalClient, PhysicalClientDto } from '../cadastro-opcoes/model/cadastro-model';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private _http: HttpClient) { }


  public savePhysicalClient(clientDto: PhysicalClientDto) : Observable<any> {
    if(clientDto.id) {
      return this._http.put(`${environment.API_URL}/client`, clientDto);
    }
    return this._http.post(`${environment.API_URL}/client/physicalClient`, clientDto);
  }

  public saveLegalClient(clientDto: LegalClient) : Observable<any> {
    if(clientDto.id) {
      return this._http.put(`${environment.API_URL}/client`, clientDto);
    }
    return this._http.post(`${environment.API_URL}/client/legalClient`, clientDto);
  }

  public delete(clientId: string) : Observable<any> {
    return this._http.delete(`${environment.API_URL}/client/${clientId}`)
  }

  public findByEmail(email: string) : Observable<any> {
    return this._http.get(`${environment.API_URL}/client/${email}`)
  }

}
