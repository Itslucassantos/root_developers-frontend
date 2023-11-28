export interface IUserViewDTO {
    id: string;
    name: string;
    givenName: string;
    familyName: string;
    phone: string;
    email: string;
    enabled: boolean;
    rolesIds: [];
    firstAccessPassword: boolean;
    dateCreated: string;
    roleNome: string;
    pictureUrl: string;
}

export interface IUserCreationDTO extends IUserViewDTO {
    username: string;
    password: string;
}