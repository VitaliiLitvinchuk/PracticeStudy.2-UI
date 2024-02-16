import { string, object } from "yup";

export const BrandSchema = object({
    name: string()
        .required("Вкажіть назву"),
});