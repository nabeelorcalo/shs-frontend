import React from 'react'
import { Input as AntInput } from 'antd'
import "./style.scss"

interface Props {
    id?: string;
    size?: "small" | "middle" | "large";
    label?: string;
    name?: string;
    className?: string;
    value?: string;
    handleChange({ }): void;
    required?: boolean;
    type: string;
    placeholder?: string;

}

export const Input = (props: any) => {
  const { required, id, size, label, name, value, type, placeholder, className, disabled, handleChange, ...rest } = props;

    return (
        <div className='input-wrapper'>
            {label && <label className='label'>{label} {required && <span>*</span>}</label>}
            <AntInput
                id={id}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                className={`input ${className}`}
                onChange={handleChange}
                size={size}
                {...rest}
            />
        </div>
    )
}