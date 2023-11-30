import { LegalClient, PhysicalClientDto } from "src/app/cadastro-opcoes/model/cadastro-model";
import { IUserViewDTO } from "./oauth-model";

export interface AuthState {
    user: LegalClient | PhysicalClientDto |null;
}

export const initialAuthState: AuthState = {
    user: null
}