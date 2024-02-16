import { useActions } from "../../../hooks/useActions";
import { urlImages } from "../../../http_common";
import { ICar } from "../types";
import { Link, useNavigate } from "react-router-dom";
import { DeleteCar } from "./request";
import { useState } from "react";
import classNames from "classnames";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const CarCard = ({ car }: { car: ICar }) => {
    const [isDisabled, SetDisabled] = useState<boolean>(false);
    let photo: string = car.photos?.at(0)?.name ? `${urlImages}${car.photos?.at(0)?.name}` : "NotFound.jpg";
    const navigate = useNavigate();
    const { cars } = useTypedSelector(state => state.home)
    const { isAuth } = useTypedSelector(state => state.auth)
    const { SelectCar, SetCars } = useActions();

    const SetSelectedCar = () => {
        SelectCar(car);
    }

    const onCloseClick = () => {
        SetDisabled(true);
        DeleteCar(car.id);
        SetCars(cars?.filter(c => c.id !== car.id) as [ICar]);
        SetDisabled(false);
    }

    const onEditClick = () => {
        SetDisabled(true);
        navigate(`/car?id=${car.id}&name=${car.name}&year=${car.year.yearOfManufacture}&brandName=${car.brand.name}`);
        SetDisabled(false);
    }

    return (
        <>
            <div className="container p-3">
                <div className="row bg-light rounded-3 border border-1 border-black shadow-lg py-4 px-3">
                    <div className="col-12 col-md-4">
                        <Link to={"/car-page"} onClick={SetSelectedCar} className="w-100">
                            <img src={photo} className="w-100 shadow-sm rounded-4" alt="Фото" />
                        </Link>
                    </div>
                    <div className="clo-12 col-md-8">
                        {
                            isAuth &&
                            <div className="row text-end">
                                <div className="col">
                                    <div className={classNames("btn border-0 p-0 me-2", isDisabled && "disabled")} onClick={onEditClick}>
                                        <i className="fa fa-2x fa-edit text-warning"></i>
                                    </div>
                                    <div className={classNames("btn border-0 p-0", isDisabled && "disabled")} onClick={onCloseClick}>
                                        <i className="fa fa-2x fa-close text-danger"></i>
                                    </div>
                                </div>
                            </div>
                        }
                        <h5 className="card-title">{car.name}</h5>
                        <p className="card-text">Бренд: <span className="text-muted">{car.brand.name}</span></p>
                        <p className="card-text">Рік: <span className="text-muted">{car.year.yearOfManufacture}</span></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CarCard;