import { IErrorFields } from "../../../auth/types";
import { IRequestResponse } from "../../types";
import { IPropertyError, IPropertyModel } from "./types";
import http from '../../../../http_common';

export const CreateOrUpdateProperty = (model: IPropertyModel, fields: IErrorFields, update: boolean) => {
    http.post<IRequestResponse>(`car/${update ? "update" : "add"}-property`, model).then(x => {
    }, error => {
        let setFieldError = fields.setFieldError;
        let setError = fields.setError;
        let dataResponce = error.response?.data as IPropertyError;

        let errorsResponse = dataResponce.errors;

        if (setError)
            if (errorsResponse.message)
                setError(errorsResponse.message);

        if (setFieldError) {

            if (errorsResponse.name)
                setFieldError("name", errorsResponse.name[0]);

            if (errorsResponse.description)
                setFieldError("description", errorsResponse.description[0]);
        }
    });
} 