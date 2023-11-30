import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as bcrypt from 'bcryptjs';

import { matchEmailValidator, matchPasswordValidator, patternValidator } from '../util/form-builder-validation-util';
import { LegalClient, PhysicalClientDto } from '../cadastro-opcoes/model/cadastro-model';
import { ClientService } from '../service/client.service';
import { Router } from '@angular/router';
import { NotificationService } from '../notification/notification.service';
import { AuthState } from '../core/state/oauth.state';
import { Store } from '@ngrx/store';
import { selectUser } from '../core/state/oauth.selectors';

@Component({
  selector: 'app-cadastro-pessoa-fisica',
  templateUrl: './cadastro-pessoa-fisica.component.html',
  styleUrls: [
      '../cadastro-opcoes/cadastro-opcoes.component.css'
    ]
})
export class CadastroPessoaFisicaComponent implements OnInit {

  public formDataRegister!: FormGroup;
  public formaDataAddress!: any;

  public step = 1;
  public saltRounds = 10;

  user!: LegalClient | PhysicalClientDto;

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private _clientService: ClientService,
    private _notificationService: NotificationService,
    private _oauthStore: Store<AuthState>,
  ){}
  
  ngOnInit(): void {
    this.buildFormRegister();

   this._oauthStore.select(selectUser)
    .subscribe(userLogged => {
      if(userLogged) { 
        this.user = userLogged;
        if(this.user) {
          this.formDataRegister.patchValue(this.user);
        }
      }
    })

  }

  submit() {
    let clientDto: PhysicalClientDto = {
      id: this.user?.id,
      ...this.formDataRegister.getRawValue(),
      address: { addressId: this.user?.address?.addressId, ...this.formaDataAddress.getRawValue()}
    }

    this._clientService.savePhysicalClient(clientDto)
    .subscribe({
      next: resp => {
        this._notificationService.success("Usuário cadastrado com sucesso!");
  
        setTimeout(() => {
          if(this.user) {
            this._router.navigate(['/simulador']);
          } else {
            this._router.navigate(['/login']);
          }
        }, 500)
      }
    });

  }
  
  private buildFormRegister() {
    const dataRegister = this.formDataRegister?.value;

    this.formDataRegister = this.formBuilder.group({
      firstName: [null, Validators.required],
      surname: [null, Validators.required],
      email: ['', [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ],
      ],
      phoneNumber: [null, Validators.required],
      confirmEmail:['', Validators.compose([Validators.required, matchEmailValidator])],
      cpf: [null, Validators.required],
      password: ['', Validators.compose([ Validators.required, patternValidator()])],
      confirmPassword: ['', Validators.compose([Validators.required, matchPasswordValidator])],
    });

    if(dataRegister) {
      this.formDataRegister.patchValue(dataRegister);
    } else if(this.user) {
      this.formDataRegister.patchValue(this.user);
    }
  }

}
