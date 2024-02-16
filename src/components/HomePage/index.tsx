import { useEffect, useState, FC, useRef } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import CarCard from "./car-card";
import { Form } from "react-bootstrap";

const HomePage = () => {
    const [waiting, SetWaiting] = useState<boolean>(false);
    const { pagination } = useTypedSelector(state => state.home);
    const { GetCars, SetPagination } = useActions();
    const { cars } = useTypedSelector(state => state.home);

    useEffect(() => {
        try {
            SetWaiting(true);
            GetCars(pagination);
            SetWaiting(false);
        } catch (ex) {
            console.log(ex);
        }
    }, [pagination])

    const increasePagination = (by: number): void => {
        SetPagination({ ...pagination, page: pagination.page + by });
    }

    const Pagination = (first: boolean) => {
        return (
            <PaginationButtons buttonPrevious={{ isDisabled: waiting || pagination.page < 2, paginate: () => increasePagination(-1) }}
                buttonNext={{ isDisabled: waiting || cars === null || cars.length < pagination.pageSize, paginate: () => increasePagination(1) }} first={first} />
        )
    }

    return (
        <div className="my-5 container">
            {
                Pagination(true)
            }
            {
                cars?.map(x => {
                    return (
                        <CarCard key={x.id} car={x} />
                    )
                })
            }
            {
                Pagination(false)
            }
        </div>
    )
}

interface IPaginationButton {
    isDisabled: boolean,
    paginate: () => void
}

const PaginationButtons: FC<{ buttonNext: IPaginationButton; buttonPrevious: IPaginationButton; first: boolean }> = ({ buttonNext, buttonPrevious, first = false }) => {
    const { brands, years, pagination } = useTypedSelector(state => state.home);
    const { GetBrands, GetYears, SetPagination } = useActions();
    const brandRef = useRef<HTMLSelectElement>(null);
    const yearRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        if (!brands)
            GetBrands();
        if (!years)
            GetYears();
    }, [brands, years]);

    const onBrandChange = () => {
        let value = brandRef.current?.value;

        if (value !== undefined && value !== "")
            SetPagination({ ...pagination, page: 1, brandName: value });
        else
            SetPagination({ ...pagination, page: 1, brandName: null });
    }

    const onYearChange = () => {
        let value = yearRef.current?.value;

        if (value !== undefined && value !== "")
            SetPagination({ ...pagination, page: 1, year: Number(value) });
        else
            SetPagination({ ...pagination, page: 1, year: null });
    }

    return (
        <div className="row">
            <div className="col">
                <button className="btn btn-outline-primary bg-dark-subtle px-4" disabled={buttonPrevious.isDisabled} onClick={buttonPrevious.paginate}>
                    <i className="fa fa-arrow-circle-o-left" /> Previous
                </button>
            </div>
            {
                first &&
                <div className="col">
                    <div className="row">
                        <div className="col-8">
                            <Form.Select
                                ref={brandRef}
                                onChange={onBrandChange}
                                className="w-100 rounded-1 border-0 px-1 py-1">
                                <option></option>
                                {
                                    brands?.map(b => (
                                        <option key={b.name} value={b.name}>
                                            {
                                                b.name
                                            }
                                        </option>
                                    ))
                                }
                            </Form.Select>
                        </div>
                        <div className="col-4 p-0">
                            <Form.Select
                                ref={yearRef}
                                onChange={onYearChange}
                                className="w-100 rounded-1 border-0 px-1 py-1">
                                <option></option>
                                {
                                    years?.map(y => (
                                        <option key={y.yearOfManufacture} value={y.yearOfManufacture}>
                                            {
                                                y.yearOfManufacture
                                            }
                                        </option>
                                    ))
                                }
                            </Form.Select>
                        </div>
                    </div>
                </div>
            }
            <div className="col text-end">
                <button className="btn btn-outline-primary bg-dark-subtle px-5" disabled={buttonNext.isDisabled} onClick={buttonNext.paginate}>
                    Next <i className="fa fa-arrow-circle-o-right" />
                </button>
            </div>
        </div>
    )
}

export default HomePage;