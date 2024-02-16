export interface IPhotoModel {
    photo: string,
    carId: string,
}

export interface IPhotoError {
    errors: {
        photo: [string],
        carId: [string],
        message: string,
    }
}