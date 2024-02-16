import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import InputGroup from "../../../common/InputGroup";
import { IPropertyModel } from "./types";
import { IErrorFields } from "../../../auth/types";
import { CreateOrUpdateProperty } from "./requests";
import { useSearchParams } from "react-router-dom";
import { PropertySchema } from "./validation";
import { useState } from "react";

const PropertyWorker = () => {
    const [searchParams] = useSearchParams();
    const { name, description } = Object.fromEntries(Array.from(searchParams.entries()));
    const isUpdate: boolean = (name && description) ? true : false;

    const initialState: IPropertyModel = {
        name: name ? name : "",
        description: description ? description : "",
    }

    const [error, setError] = useState<string>("");
    const [isSubmitting, setSubmitting] = useState<boolean>(false);

    const onHandleSubmit = async (
        values: IPropertyModel,
        { setFieldError }: FormikHelpers<IPropertyModel>
    ) => {
        try {
            setSubmitting(true);
            let fields: IErrorFields = { setFieldError: setFieldError, setError: setError };

            if (isUpdate && initialState.name !== values.name)
                alert("Змінено назву");
            else if (initialState.description !== values.description)
                CreateOrUpdateProperty(values, fields, isUpdate);
            else
                alert("Немає змін");
        } catch (ex) { }
        finally {
            setSubmitting(false);
        }
    }

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: PropertySchema,
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
                                    label="Назва"
                                    field="name"
                                    defaultValue={initialState.name}
                                    error={errors.name}
                                    touched={touched.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="row">
                                <InputGroup
                                    className="w-100 rounded-1 border-0 px-1 py-1"
                                    label="Опис"
                                    field="description"
                                    defaultValue={initialState.description}
                                    error={errors.description}
                                    touched={touched.description}
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

export default PropertyWorker; 