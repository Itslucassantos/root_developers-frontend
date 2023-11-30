import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { AuthState } from '../core/state/oauth.state';
import { Store } from '@ngrx/store';
import { LegalClient, PhysicalClientDto } from '../cadastro-opcoes/model/cadastro-model';
import { selectUser } from '../core/state/oauth.selectors';

@Component({
  selector: 'app-cadastro-endereco',
  templateUrl: './cadastro-endereco.component.html',
  styleUrls: ['../cadastro-opcoes/cadastro-opcoes.component.css']
})
export class CadastroEnderecoComponent implements OnInit {

  @Output() goBack = new EventEmitter();
  @Output() finished = new EventEmitter();
  @Output() formDataChange = new EventEmitter<FormGroup>();

  @Input()
  formData!: FormGroup;

  user!: LegalClient | PhysicalClientDto;

  constructor(
    private _formBuilder: FormBuilder,
    private _oauthStore: Store<AuthState>,
    ){}

  ngOnInit(): void {
    this.buildForm(); 
    this._oauthStore.select(selectUser)
    .subscribe(userLogged => {
      if(userLogged) { 
        this.user = userLogged;

        if(this.user) {
          this.formData.patchValue(this.user.address);
        }
        this.formDataChange.emit(this.formData); 
      }

    })

    this.subscriptionValueChanges();

   
  }

  private buildForm() {
    let value = this.formData?.value;

    this.formData = this._formBuilder.group({
        state: [null, Validators.required],
        city: [null, Validators.required],
        publicPlace: [null, Validators.required],
        neighborhood: [null, Validators.required],
        number: [null, Validators.required],
        zipCode: [null, Validators.required],
        complement: [null, Validators.required],
    });

    if(value) {
        this.formData.patchValue(value);
    } else if(this.user) {
      this.formData.patchValue(this.user.address);
    }
    this.formDataChange.emit(this.formData);
  }

  private subscriptionValueChanges() {
    this.formData.statusChanges
        .pipe(debounceTime(1000))
        .subscribe(e => {
            if(e === 'VALID') {
                this.formDataChange.emit(this.formData);
            }
        });
  }

}
