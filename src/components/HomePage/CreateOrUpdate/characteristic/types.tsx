export interface ICharacteristicModel {
    value: string,
    propertyName: string,
    carId: string,
}

export interface ICharacteristicError {
    errors: {
        value: [string],
        propertyName: [string],
        carId: [string],
        message: string
    }
}