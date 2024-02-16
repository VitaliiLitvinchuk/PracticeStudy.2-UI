import { IErrorFields } from "../../../auth/types";
import http from '../../../../http_common';
import { IRequestResponse } from "../../types";
import { ICarError, ICarModel } from "./types";

export const CreateCarOrUpdate = (model: ICarModel, userId: string, fields: IErrorFields, carId?: string) => {
    http.post<IRequestResponse>(`car/${carId ? "update" : "add"}-car?id=${carId ? carId : ""}`, { ...model, year: { yearOfManufacture: model.year }, brand: { name: model.brandName }, userId: userId }).then(x => {
    }, error => {
        let setFieldError = fields.setFieldError;
        let setError = fields.setError;
        let dataResponce = error.response?.data as ICarError;

        let errorsResponse = dataResponce.errors;

        if (setError)
            if (errorsResponse.message)
                setError(errorsResponse.message);

        if (setFieldError) {
            if (errorsResponse.brand)
                setFieldError("brandName", errorsResponse.brand[0]);

            if (errorsResponse.name)
                setFieldError("name", errorsResponse.name[0]);

            if (errorsResponse.year)
                setFieldError("year", errorsResponse.year[0]);

        }
    });
}