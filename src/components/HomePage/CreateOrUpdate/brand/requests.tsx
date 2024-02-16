import { IErrorFields } from "../../../auth/types";
import { IBrandError, IBrandModel } from "./types";
import http from '../../../../http_common';
import { IRequestResponse } from "../../types";

export const CreateBrand = (model: IBrandModel, fields: IErrorFields) => {
    http.post<IRequestResponse>('car/add-brand', model).then(x => {
    }, error => {
        let setFieldError = fields.setFieldError;
        let setError = fields.setError;
        let dataResponce = error.response?.data as IBrandError;

        let errorsResponse = dataResponce.errors;

        if (setError)
            if (errorsResponse.message)
                setError(errorsResponse.message);

        if (setFieldError)
            if (errorsResponse.name)
                setFieldError("name", errorsResponse.name[0]);
    });
} 