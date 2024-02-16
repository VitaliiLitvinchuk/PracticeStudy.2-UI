import { UUID } from "crypto";

export enum HomePageTypes {
    GetCars = "GetCars",
    GetBrands = "GetBrands",
    GetYears = "GetYears",
    GetProperties = "GetProperties",
    SelectCar = "SelectCar",
    SetPagination = "SetPagination",
    SetCars = "SetCars",
    SetBrands = "SetBrands",
    SetYears = "SetYears",
    SetProperties = "SetProperties",
};

///

export interface IYear {
    yearOfManufacture: number,
};

export interface IBrand {
    name: string,
};

export interface IPhoto {
    name: string,
}

export interface ICharacteristic {
    id: UUID,
    value: string,
    property: IPropery,
}

export interface IPropery {
    name: string,
    description: string,
}

export interface ICar {
    id: UUID,
    name: string,
    year: IYear,
    brand: IBrand,
    photos: [IPhoto] | null,
    characteristics: [ICharacteristic] | null,
};

export interface ICarPagination {
    pageSize: number,
    page: number,
    year: number | null,
    brandName: string | null,
}

///

export interface IHomePageState {
    cars: [ICar] | null,
    brands: [IBrand] | null,
    years: [IYear] | null,
    properties: [IPropery] | null,
    pagination: ICarPagination,
    selectedCar: ICar | null
}

export interface IGetCarsAction {
    type: HomePageTypes.GetCars,
    cars: [ICar],
}

export interface ISelectCarAction {
    type: HomePageTypes.SelectCar,
    selected: ICar,
}

export interface IGetYearsAction {
    type: HomePageTypes.GetYears,
    years: [IYear],
}

export interface IGetBrandsAction {
    type: HomePageTypes.GetBrands,
    brands: [IBrand],
}

export interface IGetPropertiesAction {
    type: HomePageTypes.GetProperties,
    properties: [IPropery],
}

export interface ISetPagination {
    type: HomePageTypes.SetPagination,
    pagination: ICarPagination,
}

export interface ISetCars {
    type: HomePageTypes.SetCars,
    cars: [ICar] | null,
}

export interface ISetBrands {
    type: HomePageTypes.SetBrands,
    brands: [IBrand] | null,

}

export interface ISetYears {
    type: HomePageTypes.SetYears,
    years: [IYear] | null,

}

export interface ISetProperties {
    type: HomePageTypes.SetProperties,
    properties: [IPropery] | null,
}

///

export interface IGetCarsReponse {
    data: [ICar],
}

export interface IGetYearsReponse {
    data: [IYear],
}

export interface IGetBrandsReponse {
    data: [IBrand],
}

export interface IGetPropertiesReponse {
    data: [IPropery],
}

export interface IRequestResponse {
    data: string,
}

export type HomeAction =
    IGetCarsAction | ISelectCarAction | IGetBrandsAction | IGetYearsAction | IGetPropertiesAction
    | ISetPagination | ISetCars | ISetBrands | ISetYears | ISetProperties;
