import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CadastroOpcoesComponent } from './cadastro-opcoes/cadastro-opcoes.component';
import { CadastroPessoaFisicaComponent } from './cadastro-pessoa-fisica/cadastro-pessoa-fisica.component';
import { CadastroPessoaJuridicaComponent } from './cadastro-pessoa-juridica/cadastro-pessoa-juridica.component';
import { CadastroEnderecoComponent } from './cadastro-endereco/cadastro-endereco.component';
import { SimuladorComponent } from './simulador/simulador.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cadastro-opcoes',
    component: CadastroOpcoesComponent
  },
  {
    path: 'cadastro/pessoa-fisica',
    component: CadastroPessoaFisicaComponent
  },
  {
    path: 'cadastro/pessoa-juridica',
    component: CadastroPessoaJuridicaComponent
  },
  {
    path: 'cadastro/pessoa-fisica/endereco',
    component: CadastroEnderecoComponent
  },
  {
    path: 'simulador',
    component: SimuladorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
