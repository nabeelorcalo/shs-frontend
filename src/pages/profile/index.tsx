import { Col, Divider, Row, Typography } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import StudentsTabs from "./students";
import StudentSideBar from "./studentSideBar";
import "./style.scss";

const Profile = () => {
  return (
    <div className="main-student-profile">
      <Row gutter={10}>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div className="title-bar">
            <Typography className="main-profile-title">My Profile</Typography>
          </div>
          <Divider style={{ border: "1px solid #D9DBE9" }} />
        </Col>

        <Col xxl={6} xl={6} lg={10} md={24} sm={24} xs={24}>
          <StudentSideBar />
        </Col>
        <Col xxl={18} xl={18} lg={14} md={24} sm={24} xs={24}>
          <StudentsTabs/>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
