import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../service/client.service';
import { matchEmailValidator, matchPasswordValidator, patternValidator } from '../util/form-builder-validation-util';
import { LegalClient } from '../cadastro-opcoes/model/cadastro-model';

@Component({
  selector: 'app-cadastro-pessoa-juridica',
  templateUrl: './cadastro-pessoa-juridica.component.html',
  styleUrls: ['../cadastro-opcoes/cadastro-opcoes.component.css']
})
export class CadastroPessoaJuridicaComponent implements OnInit {

  public formDataRegister!: FormGroup;
  public formaDataAddress!: any;

  public step = 1;

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private _clientService: ClientService
  ){}

  ngOnInit(): void {
    this.buildFormRegister();
  }

  submit() {
    let clientDto: LegalClient = {
      ...this.formDataRegister.getRawValue(),
      address: this.formaDataAddress.getRawValue()
    }

      this._clientService.saveLegalClient(clientDto)
      .subscribe(resp => {
        console.log('salvou');
        this._router.navigate(['/login']);
      });

  }
  

  private buildFormRegister() {
    const dataRegister = this.formDataRegister?.value;

    this.formDataRegister = this.formBuilder.group({
      socialReason: [null, Validators.required],
      cnpj: [null, Validators.required],
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
