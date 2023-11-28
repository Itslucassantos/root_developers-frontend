import { IUserViewDTO } from "./oauth-model";

export interface AuthState {
    user: IUserViewDTO |null;
}

export const initialAuthState: AuthState = {
    user: null
}