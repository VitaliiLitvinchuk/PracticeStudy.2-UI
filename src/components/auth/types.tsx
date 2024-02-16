import { UUID } from "crypto";

export enum AuthActionTypes {
    Token = "Token",
    Logout = "Logout",
}

//////////////

export interface IUser {
    id: UUID,
    email: string,
    photo: string,
    firstName: string,
    secondName: string,
    roles: []
}

export interface IUserToken {
    id: UUID,
    email: string,
    photo: string,
    exp: number,
    firstName: string,
    secondName: string,
    roles: []
}

export interface AuthState {
    user: IUser | null,
    isAuth: boolean;
}

export interface IAuthError {
    errors: {
        password: [string],
        email: [string],
        firstName: [string],
        secondName: [string],
        confirmPassword: [string],
        photo: [string],
        phone: [string],
        authError: string
    };
}

export interface IErrorFields {
    setFieldError: (field: string, message: string | undefined) => void,
    setError: (error: string) => void
}

//////////////

export interface ITokenAction {
    type: AuthActionTypes.Token,
    user: IUser,
}

export interface ILogoutAction {
    type: AuthActionTypes.Logout
}

export type AuthAction = ITokenAction | ILogoutAction;