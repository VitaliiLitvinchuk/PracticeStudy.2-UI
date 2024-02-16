import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import { useState } from "react";
import { useActions } from "../../../hooks/useActions";
import InputGroup from "../../common/InputGroup";
import { IErrorFields } from "../types";
import { IRegisterModel } from "./types";
import { RegisterSchema } from "./validation";
import InputPhoto from "../../common/InputPhoto";

const RegisterPage = () => {
    const initialState: IRegisterModel = {
        firstName: "",
        secondName: "",
        phone: "",
        email: "",
        password: "",
        photo: "",
        password_confirmation: "",
    }

    const [error, setError] = useState<string>("");
    const [isSubmitting, setSubmitting] = useState<boolean>(false);
    const { UserRegister } = useActions();

    const onHandleSubmit = async (
        values: IRegisterModel,
        { setFieldError }: FormikHelpers<IRegisterModel>
    ) => {
        try {
            setSubmitting(true);
            let fields: IErrorFields = { setFieldError: setFieldError, setError: setError };

            UserRegister(values, fields);
        } catch (ex) { }
        finally {
            setSubmitting(false);
        }
    };

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: RegisterSchema,
        onSubmit: onHandleSubmit
    });

    const onChangePhoto = (photo: string) => {
        formik.setFieldValue('photo', photo.split(',')[1]);
    }
    const { errors, touched, handleChange, handleSubmit } = formik;

    return (
        <div className="container">
            <div className="row mt-5 justify-content-center">
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
                                    label="Ім'я"
                                    field="firstName"
                                    error={errors.firstName}
                                    touched={touched.firstName}
                                    onChange={handleChange} />
                            </div>
                            <div className="row">
                                <InputGroup
                                    className="w-100 rounded-1 border-0 px-1 py-1"
                                    label="Прізвище"
                                    field="secondName"
                                    error={errors.secondName}
                                    touched={touched.secondName}
                                    onChange={handleChange} />
                            </div>
                            <div className="row mt-2">
                                <InputGroup
                                    className="w-100 rounded-1 border-0 px-1 py-1"
                                    label="Пошта"
                                    field="email"
                                    error={errors.email}
                                    touched={touched.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="row mt-2">
                                <InputGroup
                                    className="w-100 rounded-1 border-0 px-1 py-1"
                                    label="Номер телефону"
                                    field="phone"
                                    type="tel"
                                    error={errors.phone}
                                    touched={touched.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="row mt-2">
                                <InputGroup
                                    className="w-100 rounded-1 border-0 px-1 py-1"
                                    label="Пароль"
                                    field="password"
                                    type="password"
                                    error={errors.password}
                                    touched={touched.password}
                                    onChange={handleChange} />
                            </div>
                            <div className="row mt-2">
                                <InputGroup
                                    className="w-100 rounded-1 border-0 px-1 py-1"
                                    label="Підтвердження паролю"
                                    field="password_confirmation"
                                    type="password"
                                    error={errors.password_confirmation}
                                    touched={touched.password_confirmation}
                                    onChange={handleChange} />
                            </div>
                            <div className="row mt-2">
                                <InputPhoto
                                    className="w-100 rounded-1 border-0 px-1 py-1"
                                    label="Фото"
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

export default RegisterPage;