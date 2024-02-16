import { Dispatch } from "react";
import { AuthAction, IErrorFields } from "../types";
import { IRegisterModel, IRegisterResponse } from "./types";
import http from '../../../http_common'
import { UserFromToken } from "../actions";
import { ErrorSetter } from "../functions";

export const UserRegister = (model: IRegisterModel, fields: IErrorFields) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        let token: string = "";
        const shortModel = {
            email: model.email,
            password: model.password,
            confirmPassword: model.password_confirmation,
            firstName: model.firstName,
            secondName: model.secondName,
            phone: model.phone,
            photo: model.photo
        };
        http.post<IRegisterResponse>('auth/register', shortModel).then(x => {
            token = `${x.data.token}`;
            localStorage.token = token;
            UserFromToken(token, dispatch);
        }, error => {
            ErrorSetter(error, fields)
        });
        return Promise.resolve();
    }
}