import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './oauth.state';
import { login, logout } from './oauth.actions';

export const authReducer = createReducer(
  initialAuthState,
  on(login, (state, { user }) => ({ ...state, user })),
  on(logout, (state) => ({ ...state, user: null }))
);
