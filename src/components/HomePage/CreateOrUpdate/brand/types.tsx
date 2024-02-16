export interface IBrandModel {
    name: string,
}

export interface IBrandError {
    errors: {
        name: [string],
        message: string,
    }
}