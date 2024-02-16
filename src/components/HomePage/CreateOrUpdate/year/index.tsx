import InputGroup from "../../../common/InputGroup";
import { useFormik, Form, FormikProvider, FormikHelpers } from "formik";
import { IErrorFields } from "../../../auth/types";
import { IYearModel } from "./types";
import { useState } from "react";
import { CreateYear } from "./requests";

const YearWorker = () => {
    const initialState: IYearModel = {
        yearOfManufacture: 0
    }

    const [error, setError] = useState<string>("");
    const [isSubmitting, setSubmitting] = useState<boolean>(false);

    const onHandleSubmit = async (
        values: IYearModel,
        { setFieldError }: FormikHelpers<IYearModel>
    ) => {
        try {
            setSubmitting(true);
            let fields: IErrorFields = { setFieldError: setFieldError, setError: setError };
            CreateYear(values, fields);
        } catch (ex) { }
        finally {
            setSubmitting(false);
        }
    }

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: null,
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
                                    label="Рік"
                                    field="yearOfManufacture"
                                    type="number"
                                    error={errors.yearOfManufacture}
                                    touched={touched.yearOfManufacture}
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

export default YearWorker;