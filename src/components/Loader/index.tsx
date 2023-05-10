import React, { FC } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import './style.scss'
import { Spin } from 'antd';


export const Loader = () => {
  return (
    <div className="spinner-container">    
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    </div>
  )
}

export default Loader;
