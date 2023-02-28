import React from 'react'
import { Input } from 'antd'
import "./style.scss"

interface Props {
    size: "small" | "middle" | "large";
    label: string;

}

export const InputComp = (props: Props) => {
    const { size, label } = props

    return (
        <div className='input-wrapper'>
            <label>{label}</label>
            <Input className='input' placeholder="Enter Goal Name" size={size} />
        </div>
    )
}