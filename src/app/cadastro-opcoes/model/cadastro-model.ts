export interface PhysicalClientDto {
    id: string;
    firstName: string;
    surname: string;
    email: string;
    confirmEmail: string;
    cpf: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    address: Address;
}

export interface LegalClient {
    id: string;
    socialReason: string;
    firstName: string;
    surname: string;
    email: string;
    confirmEmail: string;
    cnpj: string;
    cpf: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    address: Address;
}

export interface Address {
    addressId: string;
    state: string;
    city: string;
    publicPlace: string;
    neighborhood: string;
    number: string;
    zipCode: string;
    complement: string;
}