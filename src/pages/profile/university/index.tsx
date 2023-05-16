import { useState } from "react";
import { Col, Divider, Row } from "antd";
import { PageHeader } from "../../../components";
import ChangePassword from "./changePassword";
import StudentSideBar from "./sidebar";
import UniversityProfileForm from "./universityTabs";
import "../style.scss";
import StudentProfileSideBar from "./sidebar/studentProfileSideBar/StudentProfileSideBar";

const UniversityProfile = () => {
  const [showSideViewType, setShowSideViewType] = useState("university-form");

  return (
    <div className="main-student-profile">
      <Row gutter={10}>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div className="title-bar">
            <PageHeader title="My Profile" bordered={true} />
          </div>
          <Divider className="border-0 border-solid border-[#D9DBE9]" />
        </Col>
        <Col xxl={6} xl={10} lg={24} md={24} sm={24} xs={24}>
          {/* <StudentSideBar setShowSideViewType={setShowSideViewType} /> */}
          <StudentProfileSideBar />
        </Col>
        <Col xxl={18} xl={14} lg={24} md={24} sm={24} xs={24}>
          {showSideViewType === "change-password" && <ChangePassword />}

          {showSideViewType === "university-form" && <UniversityProfileForm />}
        </Col>
      </Row>
    </div>
  );
};

export default UniversityProfile;
