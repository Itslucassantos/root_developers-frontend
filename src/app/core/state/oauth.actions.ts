import { createAction, props } from '@ngrx/store';
import { IUserViewDTO } from './oauth-model';

export const login = createAction('[Auth] Login', props<{ user: IUserViewDTO | null}>());
export const logout = createAction('[Auth] Logout');
