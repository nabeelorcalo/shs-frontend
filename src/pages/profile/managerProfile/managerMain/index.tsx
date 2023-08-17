import React, { useState } from 'react'
import { Row, Col, Divider } from 'antd';
import { PageHeader } from '../../../../components';
import ManagerSidebar from './managerSidebar';
import MainForm from './dataSection/managerForm';
import ChangePassword from './dataSection/changePassword';

const ManagerMainProfile = () => {
  const [showSideViewType, setShowSideViewType] = useState("manager-form");
  return (
    <div className="main-student-profile">
      <Row gutter={10}>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div className="title-bar">
            <PageHeader title="My Profile" bordered={true} />
          </div>
          <Divider className="border-0 border-solid border-[#D9DBE9]" />
        </Col>
        <Col xxl={6} xl={8} lg={9} md={8} sm={24} xs={24}>
          <ManagerSidebar setShowSideViewType={setShowSideViewType} />
        </Col>
        <Col xxl={18} xl={16} lg={15} md={16} sm={24} xs={24}>
          {showSideViewType === "change-password" &&
            <ChangePassword setShowSideViewType={setShowSideViewType} />
          }
          {showSideViewType === "manager-form" && <MainForm />}
        </Col>
      </Row>
    </div>
  );
}

export default ManagerMainProfile