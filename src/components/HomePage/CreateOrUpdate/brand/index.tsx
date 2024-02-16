import InputGroup from "../../../common/InputGroup";
import { useFormik, Form, FormikProvider, FormikHelpers } from "formik";
import { IErrorFields } from "../../../auth/types";
import { IBrandModel } from "./types";
import { useState } from "react";
import { BrandSchema } from "./validation";
import { CreateBrand } from "./requests";

const BrandWorker = () => {
    const initialState: IBrandModel = {
        name: "",
    }

    const [error, setError] = useState<string>("");
    const [isSubmitting, setSubmitting] = useState<boolean>(false);

    const onHandleSubmit = async (
        values: IBrandModel,
        { setFieldError }: FormikHelpers<IBrandModel>
    ) => {
        try {
            setSubmitting(true);
            let fields: IErrorFields = { setFieldError: setFieldError, setError: setError };
            CreateBrand(values, fields);
        } catch (ex) {
        }
        finally {
            setSubmitting(false);
        }
    }

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: BrandSchema,
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
                                    label="Бренд"
                                    field="name"
                                    error={errors.name}
                                    touched={touched.name}
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

export default BrandWorker;