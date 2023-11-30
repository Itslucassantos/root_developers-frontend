import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';
const CODE_VERIFIER = 'code_verifier';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor() { }

  setTokens(access_token: string, refresh_token: string): void {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.setItem(ACCESS_TOKEN, access_token);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.setItem(REFRESH_TOKEN, refresh_token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  clear(): void {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  }

  isUserAuthenticated(): boolean {
    return localStorage.getItem(ACCESS_TOKEN) != null;
  }

  isConsultant(): boolean {
    let isAdmin = false;

    if(!this.isUserAuthenticated()) {
      return isAdmin;
    }

    const token = this.getAccessToken();
    if(token) {
      const payload = token.split(".")[1];
      const payloadDecoded = atob(payload);
      const values = JSON.parse(payloadDecoded);
      const roles = values.roles;
      if (roles.indexOf('CONSULTANT') >= 0) {
        isAdmin = true;
      }
    }

    return isAdmin;
  }

  setVerifier(code_verifier: string): void {
    if(localStorage.getItem(CODE_VERIFIER)) {
      this.deleteVerifier();
    }
    const encrypted = ''
    //CryptoJS.AES.encrypt(code_verifier, environment.SECRET_ID);
    localStorage.setItem(CODE_VERIFIER, encrypted.toString());
  }

  getVerifier(): string {
    const encrypted = localStorage.getItem(CODE_VERIFIER);
    if(encrypted) {
      const decrypted = ''
      // CryptoJS.AES.decrypt(encrypted, environment.SECRET_ID).toString(CryptoJS.enc.Utf8);
      return decrypted;
    }
    return '';
  }
  
  deleteVerifier(): void {
    localStorage.removeItem(CODE_VERIFIER);
  }

  getUsername (): string {
    const token = this.getAccessToken();
    if(token) {
      const payload = token.split(".")[1];
      const payloadDecoded = atob(payload);
      const values = JSON.parse(payloadDecoded);
      return values.sub;
    }
    return '';
  }

  isTokenExpired(): boolean {
    const date = new Date(0);
    const token = this.getAccessToken();
    
    if(token) {
      const payload = token.split(".")[1];
      const payloadDecoded = atob(payload);
      const decoded = JSON.parse(payloadDecoded);

      if (!decoded.exp) {
        return true;
      }
    
      date.setUTCSeconds(decoded.exp);

      return date.valueOf() < new Date().valueOf();
    }
    return true;
  }
}
