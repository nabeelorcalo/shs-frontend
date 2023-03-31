import { useState } from "react";
import { Col, Divider, Row, Typography } from "antd";
import { PageHeader } from "../../components";
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
            <PageHeader title='My Profile' bordered={true} />
          </div>
          <Divider className="border-0 border-solid border-[#D9DBE9]" />
        </Col>
        <Col xxl={6} xl={10} lg={24} md={24} sm={24} xs={24}>
          <StudentSideBar setShowSideViewType={setShowSideViewType} />
        </Col>
        <Col xxl={18} xl={14} lg={24} md={24} sm={24} xs={24}>
          {showSideViewType === "add-video" && <AddVideo />}
          {showSideViewType === "change-password" && <ChangePassword />}

          {showSideViewType === "student-tabs" && <StudentsTabs />}
          
        

        </Col>
      </Row>
    </div>
  );
};

export default Profile;
