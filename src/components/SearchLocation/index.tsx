import React, { FC } from "react";
import './style.scss'
import { Typography } from 'antd';

interface SearchLocationProps {
  title: React.ReactNode;
  actions?: boolean;
  children?: React.ReactNode 
}

const SearchLocation: FC<SearchLocationProps> = ({ title, actions=false, children  }) => actions ?  (
  <div className="shs-search-location">
    <Typography.Title level={3}>
      {title}
    </Typography.Title>
    <div className="shs-page-header-actions">
      {children}
    </div>
  </div>
  ) : (
    <div className="shs-page-header">
      <Typography.Title level={3}>
        {title}
      </Typography.Title>
    </div>
  )

export default SearchLocation;
