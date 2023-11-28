import { Injectable } from '@angular/core';
import { IIncomeTax } from '../simulador/model/simulador-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncomeTaxService {

  constructor(private _http: HttpClient) { }

  public calculateTax(incomeTax: IIncomeTax) : Observable<any> {
    return this._http.post(`${environment.API_URL}/tax/calculate`, incomeTax)
  }
}
