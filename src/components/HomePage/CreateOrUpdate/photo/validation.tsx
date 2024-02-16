import { string, object } from "yup";

export const PhotoSchema = object({
    photo: string()
        .required("Оберіть фото"),

    carId: string()
        .required("Оберіть автомобіль"),
});