import React from "react";
import { Button } from "antd";
import "./Styles.scss";
const GlobalButton = (props: any) => {
  const { onClick, className, name } = props;
  return (
    <Button
      className={`button-style ${className}`}
      name={name}
      onClick={onClick}
    >
      {name}
    </Button>
  );
};

export default GlobalButton;
