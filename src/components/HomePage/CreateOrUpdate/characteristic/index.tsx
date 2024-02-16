import { useSearchParams } from "react-router-dom";
import { ICharacteristicModel } from "./types";
import { useEffect, useRef, useState } from "react";
import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import { IErrorFields } from "../../../auth/types";
import { CreateOrUpdateCharacteristic } from "./requests";
import { CharacteristicSchema } from "./validation";
import InputGroup from "../../../common/InputGroup";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { Form as Selector } from "react-bootstrap";
import classNames from "classnames";
import { useActions } from "../../../../hooks/useActions";

const CharacteristicWorker = () => {
    const [searchParams] = useSearchParams();
    const { id, value, propertyName, carId } = Object.fromEntries(Array.from(searchParams.entries()));

    const initialState: ICharacteristicModel = {
        value: value ? value : "",
        propertyName: propertyName ? propertyName : "",
        carId: carId ? carId : "",
    }

    const [error, setError] = useState<string>("");
    const [isSubmitting, setSubmitting] = useState<boolean>(false);
    const selectRef = useRef<HTMLSelectElement>(null);
    const { GetProperties } = useActions();

    useEffect(() => {
        GetProperties();
    }, [])

    const { properties } = useTypedSelector(state => state.home);

    useEffect(() => {
        if (selectRef.current)
            selectRef.current.value = initialState.propertyName;
    }, [selectRef.current, properties])

    const onHandleSubmit = async (
        values: ICharacteristicModel,
        { setFieldError }: FormikHelpers<ICharacteristicModel>
    ) => {
        try {
            setSubmitting(true);
            let fields: IErrorFields = { setFieldError: setFieldError, setError: setError };

            CreateOrUpdateCharacteristic(values, fields, id);
        } catch (ex) { }
        finally {
            setSubmitting(false);
        }
    }

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: CharacteristicSchema,
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
                                    label="Значення"
                                    field="value"
                                    defaultValue={initialState.value}
                                    error={errors.value}
                                    touched={touched.value}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="row">
                                <div style={{ position: "relative" }}>
                                    <label htmlFor="propertyName">
                                        Властивість
                                    </label>
                                    <Selector.Select
                                        name="propertyName"
                                        ref={selectRef}
                                        onChange={handleChange}
                                        className={classNames("w-100 rounded-1 border-0 px-1 py-1",
                                            { "is-invalid": touched.propertyName && errors.propertyName },
                                        )}>
                                        <option></option>
                                        {
                                            properties?.map(p => (
                                                <option key={p.name} value={p.name}>
                                                    {
                                                        p.name
                                                    }
                                                </option>
                                            ))
                                        }
                                    </Selector.Select>
                                    {(touched.propertyName && errors.propertyName) && <div className="invalid-feedback">{errors.propertyName}</div>}
                                </div>
                            </div>
                            <div className="row">
                                <InputGroup
                                    className="w-100 rounded-1 border-0 px-1 py-1"
                                    label="Ідентифікатор машини"
                                    field="carId"
                                    defaultValue={initialState.carId}
                                    error={errors.carId}
                                    touched={touched.carId}
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

export default CharacteristicWorker;