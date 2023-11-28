import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as bcrypt from 'bcryptjs';

import { matchEmailValidator, matchPasswordValidator, patternValidator } from '../util/form-builder-validation-util';
import { PhysicalClientDto } from '../cadastro-opcoes/model/cadastro-model';
import { ClientService } from '../service/client.service';
import { Router } from '@angular/router';
import { NotificationService } from '../notification/notification.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private _clientService: ClientService,
    private _notificationService: NotificationService
  ){}
  
  ngOnInit(): void {
   this.buildFormRegister();
  }

  submit() {
    let clientDto: PhysicalClientDto = {
      ...this.formDataRegister.getRawValue(),
      address: this.formaDataAddress.getRawValue()
    }

    bcrypt.hash(clientDto.confirmPassword, this.saltRounds, (err, hash) => {
      if (err) {
          console.error('Erro ao gerar o hash da senha:', err);
      } else {
          
          this._clientService.savePhysicalClient(clientDto)
          .subscribe(resp => {
            this._notificationService.success("Usuário cadastrado com sucesso!");
    
            setTimeout(() => {
              this._router.navigate(['/login']);
            }, 500)
          });

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
      genero: [null, Validators.required],
    });

    if(dataRegister) {
      this.formDataRegister.patchValue(dataRegister);
    }
  }

}
