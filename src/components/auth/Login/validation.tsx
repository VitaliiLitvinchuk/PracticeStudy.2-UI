import { string, object } from "yup";

export const LoginSchema = object({
    email: string()
        .required("Вкажіть пошту")
        .email("Повинна бути пошта"),

    password: string()
        .required("Вкажіть пароль"),
});