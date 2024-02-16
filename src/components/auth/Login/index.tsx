import { useState } from "react";
import { useActions } from "../../../hooks/useActions";
import InputGroup from "../../common/InputGroup";
import { ILoginModel } from "./types";
import { useFormik, Form, FormikProvider, FormikHelpers } from "formik";
import { IErrorFields } from "../types";
import { LoginSchema } from './validation';

const LoginPage = () => {
    const initialState: ILoginModel = {
        email: "",
        password: "",
    }

    const [error, setError] = useState<string>("");
    const [isSubmitting, setSubmitting] = useState<boolean>(false);
    const { UserLogin } = useActions();

    const onHandleSubmit = async (
        values: ILoginModel,
        { setFieldError }: FormikHelpers<ILoginModel>
    ) => {
        try {
            setSubmitting(true);
            let fields: IErrorFields = { setFieldError: setFieldError, setError: setError };

            UserLogin(values, fields);
        } catch (ex) {
        }
        finally {
            setSubmitting(false);
        }
    }

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: LoginSchema,
        onSubmit: onHandleSubmit
    });

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
                                    label="Пароль"
                                    field="password"
                                    type="password"
                                    error={errors.password}
                                    touched={touched.password}
                                    onChange={handleChange}
                                />
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

export default LoginPage;