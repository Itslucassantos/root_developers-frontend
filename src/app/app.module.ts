import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CadastroOpcoesComponent } from './cadastro-opcoes/cadastro-opcoes.component';
import { CadastroPessoaFisicaComponent } from './cadastro-pessoa-fisica/cadastro-pessoa-fisica.component';
import { CadastroPessoaJuridicaComponent } from './cadastro-pessoa-juridica/cadastro-pessoa-juridica.component';
import { CadastroEnderecoComponent } from './cadastro-endereco/cadastro-endereco.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ResourceInterceptor } from './core/http/http.interceptor';
import { SimuladorComponent } from './simulador/simulador.component';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './core/state/oauth.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CadastroOpcoesComponent,
    CadastroPessoaFisicaComponent,
    CadastroPessoaJuridicaComponent,
    CadastroEnderecoComponent,
    SimuladorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    StoreModule.forRoot({ auth: authReducer}),
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: ResourceInterceptor, multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
