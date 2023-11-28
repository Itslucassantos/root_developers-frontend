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
    return this._http.post(`${environment.API_URL}/client/physicalClient`, clientDto);
  }

  public saveLegalClient(clientDto: LegalClient) : Observable<any> {
    return this._http.post(`${environment.API_URL}/client/legalClient`, clientDto);
  }

}
