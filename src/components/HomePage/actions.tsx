import { Dispatch } from "react";
import { HomeAction, HomePageTypes, IBrand, ICar, ICarPagination, IGetBrandsReponse, IGetCarsReponse, IGetPropertiesReponse, IGetYearsReponse, IPropery, IYear } from "./types";
import http from "../../http_common"

export const GetCars = (pagination: ICarPagination) => {
    return async (dispatch: Dispatch<HomeAction>) => {
        http.post<IGetCarsReponse>('car/get-cars', pagination).then(x => {
            dispatch({
                type: HomePageTypes.GetCars,
                cars: x.data.data,
            });
            return x.data.data;
        })

        return Promise.resolve();
    }
}
export const GetBrands = () => {
    return async (dispatch: Dispatch<HomeAction>) => {
        http.post<IGetBrandsReponse>('car/get-brands').then(x => {
            dispatch({
                type: HomePageTypes.GetBrands,
                brands: x.data.data,
            });
            return x.data.data;
        })

        return Promise.resolve();
    }
}

export const GetYears = () => {
    return async (dispatch: Dispatch<HomeAction>) => {
        http.post<IGetYearsReponse>('car/get-years').then(x => {
            dispatch({
                type: HomePageTypes.GetYears,
                years: x.data.data,
            });
            return x.data.data;
        })

        return Promise.resolve();
    }
}

export const GetProperties = () => {
    return async (dispatch: Dispatch<HomeAction>) => {
        http.post<IGetPropertiesReponse>('car/get-properties').then(x => {
            dispatch({
                type: HomePageTypes.GetProperties,
                properties: x.data.data,
            });
            return x.data.data;
        })

        return Promise.resolve();
    }
}

export const SelectCar = (car: ICar) => {
    return (dispatch: Dispatch<HomeAction>) => {
        dispatch({
            type: HomePageTypes.SelectCar,
            selected: car,
        });
    }
}

export const SetPagination = (pagination: ICarPagination) => {
    return (dispatch: Dispatch<HomeAction>) => {
        dispatch({
            type: HomePageTypes.SetPagination,
            pagination: pagination
        });
    }
}

export const SetCars = (cars: [ICar] | null) => {
    return (dispatch: Dispatch<HomeAction>) => {
        dispatch({
            type: HomePageTypes.SetCars,
            cars: cars
        });
    }
}

export const SetBrands = (brands: [IBrand] | null) => {
    return (dispatch: Dispatch<HomeAction>) => {
        dispatch({
            type: HomePageTypes.SetBrands,
            brands: brands
        });
    }
}

export const SetYears = (years: [IYear] | null) => {
    return (dispatch: Dispatch<HomeAction>) => {
        dispatch({
            type: HomePageTypes.SetYears,
            years: years
        });
    }
}

export const SetProperties = (properties: [IPropery] | null) => {
    return (dispatch: Dispatch<HomeAction>) => {
        dispatch({
            type: HomePageTypes.SetProperties,
            properties: properties
        });
    }
}