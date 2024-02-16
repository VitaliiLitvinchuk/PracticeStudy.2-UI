import { string, object } from "yup";

export const PropertySchema = object({
    name: string()
        .required("Вкажіть назву"),

    description: string()
        .required("Вкажіть опис"),
})