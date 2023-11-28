import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenService } from "../token/token.service";
import { Observable, catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";

const BEARER_KEY = 'Bearer';
const BASIC_KEY = 'Basic';

@Injectable()
export class ResourceInterceptor implements HttpInterceptor {

  constructor(
    private _tokenService: TokenService  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let intReq = request;
    const token = this._tokenService.getAccessToken();
    intReq = intReq.clone(
    { 
        setHeaders: {
            authorization: token ? `${BEARER_KEY} ${token}` : `${BASIC_KEY} ${btoa(environment.CLIENT_ID + ':' + environment.SECRET_ID)}`
        }
    });
    return next.handle(intReq)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        //this._errorService.handleError(error);
        return throwError(() => error);
      })
    )
  }
}