import { useState } from "react";
import { Outlet } from "react-router-dom";
import { PageHeader } from "../../../components";
import "../style.scss";
import { Row, Col } from 'antd';
import ProfileCompletion from "./profileCompletion";
import MainDataSide from "./mainDataSide";

const Student = () => {
  return (
    <div className="student-dashboard-main">
      <PageHeader title="Welcome, Maria Sanoid!" />
      <Row gutter={[20,20]}>
        <Col xxl={6} xl={6} lg={8} md={10} sm={10} xs={24}>
          <ProfileCompletion/>
        </Col>
        <Col xxl={18} xl={18} lg={14} md={14} sm={14} xs={24}>
          <MainDataSide/>
        </Col>
      </Row>
    </div>
  )
}

export default Student