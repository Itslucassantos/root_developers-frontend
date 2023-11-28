import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './oauth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);
