import React, { FC } from "react";
import './style.scss'
import { Typography } from 'antd';

interface PageHeaderProps {
  title: React.ReactNode
  actions?: boolean
  children?: React.ReactNode
  bordered?: boolean
}

const PageHeader: FC<PageHeaderProps> = ({ title, actions=false, children, bordered  }) => actions ?  (
  <div className={`shs-page-header ${bordered? 'bordered': ''}`}>
    <Typography.Title level={3}>
      {title}
    </Typography.Title>
    <div className="shs-page-header-actions">
      {children}
    </div>
  </div>
  ) : (
    <div className={`shs-page-header ${bordered? 'bordered': ''}`}>
      <Typography.Title level={3}>
        {title}
      </Typography.Title>
    </div>
  )

export default PageHeader;
