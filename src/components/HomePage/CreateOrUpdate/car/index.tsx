import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import InputGroup from "../../../common/InputGroup";
import { useEffect, useRef, useState } from "react";
import { IErrorFields } from "../../../auth/types";
import { useSearchParams } from "react-router-dom";
import { ICarModel } from "./types";
import { CarSchema } from "./validation";
import { CreateCarOrUpdate } from "./requests";
import classNames from "classnames";
import { Form as Selector } from "react-bootstrap";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

const CarWorker = () => {
    const [searchParams] = useSearchParams();
    const { id, name, year, brandName } = Object.fromEntries(Array.from(searchParams.entries()));

    const initialState: ICarModel = {
        name: name ? name : "",
        year: year ? parseInt(year) : 0,
        brandName: brandName ? brandName : "",
    }

    const [error, setError] = useState<string>("");
    const [isSubmitting, setSubmitting] = useState<boolean>(false);
    const { GetBrands, GetYears } = useActions();
    const selectYearRef = useRef<HTMLSelectElement>(null);
    const selectBrandRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        GetBrands();
        GetYears();
    }, []);

    const { brands, years } = useTypedSelector(state => state.home);
    const { user } = useTypedSelector(state => state.auth);

    useEffect(() => {
        if (selectYearRef.current)
            selectYearRef.current.value = `${initialState.year}`;
    }, [selectYearRef.current, years]);

    useEffect(() => {
        if (selectBrandRef.current)
            selectBrandRef.current.value = initialState.brandName;
    }, [selectBrandRef.current, brands]);

    const onHandleSubmit = async (
        values: ICarModel,
        { setFieldError }: FormikHelpers<ICarModel>
    ) => {
        try {
            setSubmitting(true);
            let fields: IErrorFields = { setFieldError: setFieldError, setError: setError };
            if (user)
                CreateCarOrUpdate(values, user.id, fields, id);
        } catch (ex) { }
        finally {
            setSubmitting(false);
        }
    }

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: CarSchema,
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
                                <div style={{ position: "relative" }}>
                                    <label htmlFor="brandName">
                                        Бренд
                                    </label>
                                    <Selector.Select
                                        ref={selectBrandRef}
                                        name="brandName"
                                        onChange={handleChange}
                                        className={classNames("w-100 rounded-1 border-0 px-1 py-1",
                                            { "is-invalid": touched.brandName && errors.brandName },
                                        )}>
                                        <option></option>
                                        {
                                            brands?.map(b => (
                                                <option key={b.name} value={b.name}>{b.name}</option>
                                            ))
                                        }
                                    </Selector.Select>
                                    {(touched.brandName && errors.brandName) && <div className="invalid-feedback">{errors.brandName}</div>}
                                </div>
                            </div>
                            <div className="row">
                                <div style={{ position: "relative" }}>
                                    <label htmlFor="year">
                                        Рік
                                    </label>
                                    <Selector.Select
                                        ref={selectYearRef}
                                        name="year"
                                        onChange={handleChange}
                                        className={classNames("w-100 rounded-1 border-0 px-1 py-1",
                                            { "is-invalid": touched.year && errors.year },
                                        )}>
                                        <option></option>
                                        {
                                            years?.map(y => (
                                                <option key={y.yearOfManufacture} value={y.yearOfManufacture}>{y.yearOfManufacture}</option>
                                            ))
                                        }
                                    </Selector.Select>
                                    {(touched.year && errors.year) && <div className="invalid-feedback">{errors.year}</div>}
                                </div>
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

export default CarWorker; 