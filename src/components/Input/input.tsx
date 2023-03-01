import React from 'react'
import { Input as AntInput } from 'antd'
import "./style.scss"

interface Props {
    id?: string;
    size?: "small" | "middle" | "large";
    label?: string;
    height?: string;
    name?: string;
    className?: string;
    value?: string;
    handleChange({ }): void

}

export const Input = (props: Props) => {
    const { id, size, label, height = '48px', name, value, className, handleChange } = props

    return (
        <div className='input-wrapper'>
            {label && <label className='label'>{label}</label>}
            <AntInput
                id={id}
                name={name}
                value={value}
                className={`input ${{ className }}`}
                placeholder="Enter Goal Name"
                onChange={handleChange}
                size={size}
                style={{ height: height }}
            />
        </div>
    )
}