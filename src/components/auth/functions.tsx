import { AxiosError } from "axios";
import { IAuthError, IErrorFields } from "./types";

export const ErrorSetter = (error: AxiosError, fields: IErrorFields) => {
    let setError = fields.setError;
    let setFieldError = fields.setFieldError;
    let dataResponce = error.response?.data as IAuthError;

    let errorsResponse = dataResponce.errors;

    if (errorsResponse.authError && setError)
        setError(errorsResponse.authError);

    if (setFieldError) {
        if (errorsResponse.email)
            setFieldError("email", errorsResponse.email[0]);

        if (errorsResponse.password)
            setFieldError("password", errorsResponse.password[0]);

        if (errorsResponse.confirmPassword)
            setFieldError("password_confirmation", errorsResponse.confirmPassword[0]);

        if (errorsResponse.firstName)
            setFieldError("firstName", errorsResponse.firstName[0]);

        if (errorsResponse.secondName)
            setFieldError("secondName", errorsResponse.secondName[0]);

        if (errorsResponse.photo)
            setFieldError("photo", errorsResponse.photo[0]);
    }
};