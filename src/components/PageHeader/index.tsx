import React, { FC } from "react";
import './style.scss'
import { Typography } from 'antd';

interface PageHeaderProps {
  title: string;
}

const PageHeader: FC<PageHeaderProps> = ({ title }) => {
  return (
    <div className="shs-page-header">
      <Typography.Title level={3}>
        {title}
      </Typography.Title>
    </div>
  )
}

export default PageHeader;
