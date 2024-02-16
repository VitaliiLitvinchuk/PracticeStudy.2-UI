import { FC, InputHTMLAttributes } from "react";
import classNames from 'classnames';

interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string,
    field: string,
    className?: string,
    touched?: boolean | null,
    error?: string | null,
    defaultValue?: string,
    type?: "text" | "email" | "password" | "tel" | "number"
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const InputGroup: FC<InputGroupProps> = ({ label, field, className, onChange, touched = null, error = null, type = "text", defaultValue = "" }: InputGroupProps) => {
    return (
        <div style={{ position: "relative" }}>
            <label htmlFor={field}>
                {label}
            </label>
            <input
                type={type}
                name={field}
                className={classNames(className,
                    { "is-invalid": touched && error },
                    { "is-valid": touched && !error }
                )}
                defaultValue={defaultValue}
                id={field}
                onChange={onChange}
            />
            {(touched && error) && <div className="invalid-feedback">{error}</div>}
        </div>
    );
}

export default InputGroup;