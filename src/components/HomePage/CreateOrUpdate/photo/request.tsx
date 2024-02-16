import { IErrorFields } from "../../../auth/types";
import { IRequestResponse } from "../../types";
import http from '../../../../http_common';
import { IPhotoError, IPhotoModel } from "./types";

const AddPhoto = (model: IPhotoModel, fields: IErrorFields) => {
    http.post<IRequestResponse>('car/add-photo', model).then(x => {
    }, error => {
        let setFieldError = fields.setFieldError;
        let setError = fields.setError;
        let dataResponce = error.response?.data as IPhotoError;

        let errorsResponse = dataResponce.errors;

        if (setError)
            if (errorsResponse.message)
                setError(errorsResponse.message);

        if (setFieldError) {
            if (errorsResponse.photo)
                setFieldError("photo", errorsResponse.photo[0]);

            if (errorsResponse.carId)
                setFieldError("carId", errorsResponse.carId[0]);

        }
    });
}

export default AddPhoto;