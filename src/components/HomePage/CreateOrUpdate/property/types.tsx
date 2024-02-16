export interface IPropertyModel {
    name: string,
    description: string,
}

export interface IPropertyError {
    errors: {
        name: [string],
        description: [string],
        message: string,
    }
}