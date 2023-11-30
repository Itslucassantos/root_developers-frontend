import { createAction, props } from '@ngrx/store';
import { LegalClient, PhysicalClientDto } from 'src/app/cadastro-opcoes/model/cadastro-model';

export const login = createAction('[Auth] Login', props<{ user: LegalClient | PhysicalClientDto | null}>());
export const logout = createAction('[Auth] Logout');
