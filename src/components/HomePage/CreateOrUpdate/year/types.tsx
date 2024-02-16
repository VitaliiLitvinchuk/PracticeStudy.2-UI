export interface IYearModel {
    yearOfManufacture: number,
}

export interface IYearError {
    errors: {
        yearOfManufacture: [string],
        message: string,
    }
}