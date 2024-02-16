import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import AddPhoto from "./request";
import { IPhotoModel } from "./types";
import { PhotoSchema } from "./validation";
import InputGroup from "../../../common/InputGroup";
import { IErrorFields } from "../../../auth/types";
import { useState } from "react";
import InputPhoto from "../../../common/InputPhoto";

const CreatePhoto = () => {
    const initialState: IPhotoModel = {
        carId: "",
        photo: "",
    }

    const [error, setError] = useState<string>("");
    const [isSubmitting, setSubmitting] = useState<boolean>(false);

    const onChangePhoto = (photo: string) => {
        formik.setFieldValue('photo', photo.split(',')[1]);
    }

    const onHandleSubmit = async (
        values: IPhotoModel,
        { setFieldError }: FormikHelpers<IPhotoModel>
    ) => {
        try {
            setSubmitting(true);
            let fields: IErrorFields = { setFieldError: setFieldError, setError: setError };

            AddPhoto(values, fields);
        } catch (ex) { }
        finally {
            setSubmitting(false);
        }
    }

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: PhotoSchema,
        onSubmit: onHandleSubmit
    });

    const { errors, touched, handleChange, handleSubmit } = formik;

    return (
        <div className="container">
            <div className="row my-5 justify-content-center">
                {
                    error &&
                    <div className="col-lg-6 col-md-8 col-12 text-center alert-danger m-1 p-2 rounded shadow-lg">
                        {error}
                    </div>
                }
                <div className="col-lg-6 col-md-8 col-12 p-5 rounded-3 shadow-lg">
                    <FormikProvider value={formik}>
                        <Form onSubmit={handleSubmit}>
                            <div className="row">
                                <InputGroup
                                    className="w-100 rounded-1 border-0 px-1 py-1"
                                    label="Ідентифікатор автомобіля"
                                    field="carId"
                                    error={errors.carId}
                                    touched={touched.carId}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="row">
                                <InputPhoto
                                    className="w-100 rounded-1 border-0 px-1 py-1"
                                    label="Photo"
                                    field="photo"
                                    error={errors.photo}
                                    touched={touched.photo}
                                    onChange={onChangePhoto} />
                            </div>
                            <div className="container text-center mt-3">
                                <button type="submit" className="btn btn-info w-50" disabled={isSubmitting}>
                                    Submit
                                </button>
                            </div>
                        </Form>
                    </FormikProvider>
                </div>
            </div>
        </div>
    );
}

export default CreatePhoto;