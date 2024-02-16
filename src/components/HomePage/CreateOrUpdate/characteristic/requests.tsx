import { IErrorFields } from "../../../auth/types";
import { ICharacteristicError, ICharacteristicModel } from "./types";
import http from '../../../../http_common';
import { IRequestResponse } from "../../types";

export const CreateOrUpdateCharacteristic = (model: ICharacteristicModel, fields: IErrorFields, id?: string) => {
    http.post<IRequestResponse>(`car/${id ? "update" : "add"}-characteristic${id ? `?id=${id}` : ""}`, model).then(x => {
    }, error => {
        let setFieldError = fields.setFieldError;
        let setError = fields.setError;
        let dataResponce = error.response?.data as ICharacteristicError;

        let errorsResponse = dataResponce.errors;

        if (setError)
            if (errorsResponse.message)
                setError(errorsResponse.message);

        if (setFieldError) {
            if (errorsResponse.value)
                setFieldError("value", errorsResponse.value[0]);

            if (errorsResponse.propertyName)
                setFieldError("propertyName", errorsResponse.propertyName[0]);

            if (errorsResponse.carId)
                setFieldError("carId", errorsResponse.carId[0]);
        }
    });
}