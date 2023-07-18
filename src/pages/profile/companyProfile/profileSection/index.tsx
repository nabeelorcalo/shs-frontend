import React, { useState } from 'react'
import { Col, Divider, Row } from "antd";
import { PageHeader } from '../../../../components';
import CompanySideBar from './CompanySideBar';
import CompanyTabs from './tabs/CompanyTabs';
import ChangePassword from './changePassword';


const MainProfileSection = () => {
    const [showSideViewType, setShowSideViewType] = useState('company-tabs');
  return (
      <div className='main-profile-section'>
     <Row gutter={10}>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div className="title-bar">
            <PageHeader title="My Profile" bordered={true} />
          </div>
          <Divider className="border-0 border-solid border-[#D9DBE9]" />
        </Col>
        <Col xxl={6} xl={8} lg={9} md={8} sm={24} xs={24}>
          <CompanySideBar setShowSideViewType={setShowSideViewType} />
        </Col>
        <Col xxl={18} xl={16} lg={15} md={16} sm={24} xs={24}>
          {showSideViewType === "change-password" && <ChangePassword />}
          {showSideViewType === "company-tabs" && <CompanyTabs />}
        </Col>
      </Row>
      </div>
  )
}

export default MainProfileSection