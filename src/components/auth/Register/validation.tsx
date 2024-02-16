import { string, object } from "yup";

export const RegisterSchema = object({
    firstName: string()
        .required("Вкажіть ім'я"),

    secondName: string()
        .required("Вкажіть прізвище"),

    photo: string()
        .required("Виберіть фото"),

    phone: string()
        .required("Вкажіть номер телефону")
        .matches(/^(?:[0-9] ?){6,14}[0-9]$/, 'Неправильний номер телефону'),

    email: string()
        .required("Вкажіть пошту")
        .email("Повинна бути пошта"),

    password: string()
        .required("Вкажіть пароль"),

    password_confirmation: string()
        .required("Підтвердіть пароль")
        .test(
            'passwordConfirm',
            'Потрібно, щоб збігався',
            function () {
                return this.parent.password === this.parent.password_confirmation;
            }
        ),
});