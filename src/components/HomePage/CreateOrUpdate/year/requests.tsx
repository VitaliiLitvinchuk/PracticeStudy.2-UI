import { IErrorFields } from "../../../auth/types";
import { IYearError, IYearModel } from "./types";
import http from '../../../../http_common';
import { IRequestResponse } from "../../types";

export const CreateYear = (model: IYearModel, fields: IErrorFields) => {
    http.post<IRequestResponse>('car/add-year', model).then(x => { },
        error => {
            let setFieldError = fields.setFieldError;
            let setError = fields.setError;
            let dataResponce = error.response?.data as IYearError;

            let errorsResponse = dataResponce.errors;

            if (setError)
                if (errorsResponse.message)
                    setError(errorsResponse.message);

            if (setFieldError)
                if (errorsResponse.yearOfManufacture)
                    setFieldError("yearOfManufacture", errorsResponse.yearOfManufacture[0]);
        });
} 