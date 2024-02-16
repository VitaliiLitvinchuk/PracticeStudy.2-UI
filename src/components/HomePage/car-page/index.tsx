import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { Navigate, useNavigate } from "react-router-dom";
import { urlImages } from "../../../http_common";
import { useState } from "react";
import { ICharacteristic, IPhoto } from "../types";
import { useActions } from "../../../hooks/useActions";
import { DeleteCharacteristic, DeletePhoto } from "./request";
import { UUID } from "crypto";

const CarPage = () => {
    const { selectedCar } = useTypedSelector(state => state.home);
    const [selectedPhoto, SetPhoto] = useState<IPhoto>({ name: selectedCar?.photos ? selectedCar.photos[0]?.name : "Not Found" });
    const { SelectCar } = useActions();
    const navigate = useNavigate();

    if (!selectedCar)
        return (
            <Navigate to={"/"} />
        );

    const onPhotoCloseClick = () => {
        DeletePhoto(selectedPhoto.name);
        SelectCar({ ...selectedCar, photos: selectedCar.photos?.filter(p => p.name !== selectedPhoto.name) as [IPhoto] });
    }

    const onCharacteristicCloseClick = (id: UUID) => {
        DeleteCharacteristic(id);
        SelectCar({ ...selectedCar, characteristics: selectedCar.characteristics?.filter(c => c.id !== id) as [ICharacteristic] });
    }

    const onCharacteristicEditClick = (characteristic: ICharacteristic) => {
        navigate(`/characteristic?id=${characteristic.id}&value=${characteristic.value}&propertyName=${characteristic.property.name}&carId=${selectedCar.id}`);
    }

    return (
        <div className="container bg-light shadow-lg my-2 rounded-3">
            <div className="row">
                <div className="col-4">
                    <div className="row">
                        {
                            selectedCar.photos?.map(x => {
                                return (
                                    <div key={x.name} className="col-6 col-md-4 p-2" onClick={() => SetPhoto(x)}>
                                        <img className="w-100 btn p-0 rounded-2" src={`${urlImages}${x.name}`} alt="Not Found" />
                                    </div>

                                );
                            })
                        }
                    </div>
                </div>
                <div className="col-8 p-0">
                    <div className="container p-0">
                        <div className="card border-3">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        {
                                            selectedPhoto.name && selectedCar.photos && selectedCar.photos.length > 0 &&
                                            <div className="btn border-0 p-0 position-absolute mt-1 ms-1" onClick={onPhotoCloseClick}>
                                                <i className="fa fa-2x fa-close text-danger"></i>
                                            </div>
                                        }
                                        <img className="w-100 rounded-4 shadow-lg"
                                            src={selectedPhoto.name && selectedCar.photos && selectedCar.photos.length > 0
                                                ? `${urlImages}${selectedPhoto.name}` : "NotFound.jpg"}
                                            alt="Not Found" />
                                    </div>
                                    <div className="col-12 col-md-6 mt-3 mt-md-0">
                                        <h2 className="card-title">{selectedCar.name}</h2>
                                        <p className="card-text">{selectedCar.id}</p>
                                        <p className="card-text">Year of Manufacture: {selectedCar.year.yearOfManufacture}</p>
                                        <p className="card-text">Brand: {selectedCar.brand.name}</p>
                                        <h3>Характеристики:</h3>
                                        {
                                            selectedCar.characteristics &&
                                            <div className="row">
                                                {
                                                    selectedCar.characteristics.map(characteristic => (
                                                        <div key={characteristic.id} className="row">
                                                            <div className="col-9">
                                                                <span>
                                                                    {characteristic.property.name} - {characteristic.value}
                                                                </span>
                                                            </div>
                                                            <div className="col-3 text-end">
                                                                <div className="btn border-0 p-0 me-2" onClick={() => onCharacteristicEditClick(characteristic)}>
                                                                    <i className="fa fa-edit text-warning" />
                                                                </div>
                                                                <div className="btn border-0 p-0" onClick={() => onCharacteristicCloseClick(characteristic.id)}>
                                                                    <i className="fa fa-close text-danger" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CarPage;