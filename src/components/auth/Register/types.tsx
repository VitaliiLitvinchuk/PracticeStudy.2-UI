
export interface IRegisterModel {
    firstName: string,
    secondName: string,
    phone: string,
    photo: string,
    email: string,
    password: string,
    password_confirmation: string,
}

export interface IRegisterResponse {
    token: string,
}