import { Col, Divider, Row, Typography } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import StudentsTabs from "./students";
import AddVideo from "./students/addVideo";
import ChangePassword from "./students/changePassword";
import StudentSideBar from "./studentSideBar";
import "./style.scss";

const Profile = () => {
  const [showSideViewType, setShowSideViewType] = useState("student-tabs");

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
          <StudentSideBar setShowSideViewType={setShowSideViewType} />
        </Col>
        <Col xxl={18} xl={18} lg={14} md={24} sm={24} xs={24}>
          {showSideViewType === "add-video" && <AddVideo />}

          {showSideViewType === "student-tabs" && <StudentsTabs />}
          {showSideViewType === "change-password" && <ChangePassword />}
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
