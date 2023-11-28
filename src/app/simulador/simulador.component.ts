import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeTaxService } from '../service/income-tax.service';
import { NotificationService } from '../notification/notification.service';
import { TokenService } from '../core/token/token.service';

@Component({
  selector: 'app-simulador',
  templateUrl: './simulador.component.html',
  styleUrls: ['../cadastro-opcoes/cadastro-opcoes.component.css']
})
export class SimuladorComponent implements OnInit {

  formData!: FormGroup;

  calculation!: any;

  user!: string;

  constructor(private _formBuilder: FormBuilder,
    private _incomeTaxService: IncomeTaxService,
    private _notificationService: NotificationService,
    private _tokenService: TokenService){}
  
  ngOnInit(): void {
    this.buildForm();

    this.user = this._tokenService.getUsername();
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

}
