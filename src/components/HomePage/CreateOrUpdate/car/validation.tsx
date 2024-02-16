import { string, number, object } from "yup";

export const CarSchema = object({
    name: string()
        .required("Вкажіть назву"),

    year: number()
        .required("Оберіть рік"),

    brandName: string()
        .required("Оберіть назву бренду"),
});