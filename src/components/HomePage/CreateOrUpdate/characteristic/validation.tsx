import { object, string } from "yup";

export const CharacteristicSchema = object({
    value: string()
        .required("Вкажіть значення"),

    propertyName: string()
        .required("Оберіть властивість"),

    carId: string()
        .required("Оберіть машину"),
});