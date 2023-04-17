import React from "react";
import { Input as AntInput } from "antd";
import "../Input/Styles.scss";

const Input = (props: any) => {
  const {
    prefix,
    placeholder,
    className,
    name,
    value,
    onChange,
    id,
    suffix,
    ...rest
  } = props;
  return (
    <div>
      <AntInput
        prefix={prefix}
        name={name}
        value={value}
        id={id}
        placeholder={placeholder}
        className={`input-field-wrapper font-normal text-lg ${className}`}
        onChange={onChange}
        suffix={suffix}
        {...rest}
      />
    </div>
  );
};

export default Input;
