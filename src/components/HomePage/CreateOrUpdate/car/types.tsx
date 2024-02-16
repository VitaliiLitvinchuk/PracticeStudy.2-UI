export interface ICarModel {
    name: string,
    year: number,
    brandName: string,
};

export interface ICarError {
    errors: {
        name: [string],
        year: [string],
        brand: [string],
        message: string,
    }
}