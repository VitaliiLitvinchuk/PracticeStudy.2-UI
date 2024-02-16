import React, { useState } from 'react';
import { FC } from "react";
import classNames from 'classnames';

interface InputPhotoProps {
    label: string,
    field: string,
    className?: string,
    touched?: boolean | null,
    error?: string | null,
    onChange: (base64Image: string) => void,
}

const InputPhoto: FC<InputPhotoProps> = ({ label, field, className, onChange, touched = null, error = null }: InputPhotoProps) => {
    const [base64Image, setBase64Image] = useState('');

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files === null)
            return;

        const file = event.target.files.item(0);

        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result?.toString();

            onChange(base64String!);
            setBase64Image(base64String!);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div style={{ position: "relative" }}>
            <label htmlFor={field}>
                {label}
            </label>
            <input
                type="file"
                name={field}
                className={classNames(className,
                    { "is-invalid": touched && error },
                    { "is-valid": touched && !error }
                )}
                id={field}
                onChange={handleFileInputChange} />
            {base64Image && (
                <div>
                    <img className='w-100' src={base64Image} alt="Uploaded" />
                </div>
            )}
            {(touched && error) && <div className="invalid-feedback">{error}</div>}
        </div >
    );
}

export default InputPhoto;