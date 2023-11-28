import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';

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

  constructor(private _formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.buildForm();   
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
    }  
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
