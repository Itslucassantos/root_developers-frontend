import { Component, OnInit } from '@angular/core';

import { AuthenticationDataDto, LoginService } from '../service/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../core/token/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../cadastro-opcoes/cadastro-opcoes.component.css']
})
export class LoginComponent implements OnInit {
  public formDataLogin!: FormGroup;

  saltRounds = 10;
  hasError = false;

  constructor(
      private formBuilder: FormBuilder,
      private _loginService: LoginService,
      private _tokenService: TokenService,
      private _router: Router
    ) {
  }
  
  ngOnInit(): void {
    this.formDataLogin = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }


  onLogin() {
    let dto : AuthenticationDataDto = {
      email: this.formDataLogin.get('email')?.value,
      password: this.formDataLogin.get('password')?.value,
    }

    this._loginService.login(dto).subscribe({
      next: (resp) => {
        this._tokenService.setTokens(resp.tokenJWT, '');
        this._router.navigate(['/simulador'])
      },
      error: () => {
        this.hasError = true
      }
    })
  }

}
