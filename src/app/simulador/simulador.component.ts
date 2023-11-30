import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeTaxService } from '../service/income-tax.service';
import { NotificationService } from '../notification/notification.service';
import { TokenService } from '../core/token/token.service';
import { ClientService } from '../service/client.service';
import { Router } from '@angular/router';
import { AuthState } from '../core/state/oauth.state';
import { Store } from '@ngrx/store';
import { selectUser } from '../core/state/oauth.selectors';
import { LegalClient, PhysicalClientDto } from '../cadastro-opcoes/model/cadastro-model';
import { login, logout } from '../core/state/oauth.actions';

@Component({
  selector: 'app-simulador',
  templateUrl: './simulador.component.html',
  styleUrls: ['../cadastro-opcoes/cadastro-opcoes.component.css']
})
export class SimuladorComponent implements OnInit {

  formData!: FormGroup;

  calculation!: any;

  userName!: string | undefined;
  user!: LegalClient | PhysicalClientDto;

  constructor(
    private _formBuilder: FormBuilder,
    private _incomeTaxService: IncomeTaxService,
    private _clientService: ClientService,
    private _notificationService: NotificationService,
    private _tokenService: TokenService,
    private _router: Router,
    private _oauthStore: Store<AuthState>,
  ){}
  
  ngOnInit(): void {
    this.buildForm();

    this.userName = this._tokenService.getUsername();

    this._oauthStore.select(selectUser)
      .subscribe(userLogged => {
        if(userLogged) { 
          this.user = userLogged;
        }
      })

  }

  private buildForm() {

    this.formData = this._formBuilder.group({
      monthlyIncome: [null, Validators.required],
      totalDependents: [0, Validators.required],
      monthlyAlimonyExpense: [0, Validators.required],
      monthlyEducationExpense: [0, Validators.required],
      monthlyMedicalExpense: [0, Validators.required],
      otherDeductions: [0, Validators.required],
    }); 
  }

  simulator() {
    this._incomeTaxService.calculateTax(this.formData.getRawValue())
    .subscribe(resp => {
      this._notificationService.success("Calculado com sucesso")
      this.calculation = resp;
    })
  }

  onDelete() {
    if(this.user) {

      this._clientService.delete(this.user.id).subscribe(resp => {
        this.userName = undefined;
        this._oauthStore.dispatch(logout());
        this._tokenService.clear();

        this._notificationService.success("Conta excluída com sucesso");
        this._router.navigate(['/home']);
      });
    }
  }

  onLogout() {
    this._tokenService.clear();
    this._oauthStore.dispatch(logout());
    this._router.navigate(['/home']);
  }

}
