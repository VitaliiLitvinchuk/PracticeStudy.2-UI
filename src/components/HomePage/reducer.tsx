import { IHomePageState, HomeAction, HomePageTypes } from "./types";

const initialState: IHomePageState = {
    cars: null,
    selectedCar: null,
    brands: null,
    years: null,
    pagination: { page: 1, pageSize: 5, brandName: null, year: null },
    properties: null,
}

export const homePageReducer = (state = initialState, action: HomeAction) => {
    switch (action.type) {
        case HomePageTypes.GetCars:
            return {
                ...state,
                cars: action.cars,
            }
        case HomePageTypes.SelectCar:
            return {
                ...state,
                selectedCar: action.selected,
            }
        case HomePageTypes.GetBrands:
            return {
                ...state,
                brands: action.brands,
            }
        case HomePageTypes.GetYears:
            return {
                ...state,
                years: action.years,
            }
        case HomePageTypes.GetProperties:
            return {
                ...state,
                properties: action.properties,
            }
        case HomePageTypes.SetPagination:
            return {
                ...state,
                pagination: action.pagination,
            }
        case HomePageTypes.SetCars:
            return {
                ...state,
                cars: action.cars,
            }
        case HomePageTypes.SetBrands:
            return {
                ...state,
                brands: action.brands,
            }
        case HomePageTypes.SetYears:
            return {
                ...state,
                years: action.years,
            }
        case HomePageTypes.SetProperties:
            return {
                ...state,
                properties: action.properties,
            }
        default: return state;
    }
}