import { Dispatch } from "react";
import { AuthAction, AuthActionTypes, IUserToken } from "./types";
import { jwtDecode } from "jwt-decode";

export const UserFromToken = (token: string, dispatch: Dispatch<AuthAction>) => {
    const user = jwtDecode(token) as IUserToken;
    let currentDate = new Date();
    if (!(user.exp * 1000 < currentDate.getTime())) {
        dispatch({
            type: AuthActionTypes.Token,
            user: { id: user.id, email: user.email, firstName: user.firstName, secondName: user.secondName, photo: user.photo, roles: user.roles }
        });
    }
}