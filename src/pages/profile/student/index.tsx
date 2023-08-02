import { useEffect, useState } from "react";
import { Card, Col, Divider, Row } from "antd";
import { Loader, PageHeader } from "../../../components";
import StudentsTabs from "./StudentTabs";
import AddVideo from "./addVideo";
import ChangePassword from "./changePassword";
import StudentSideBar from "./sidebar";
import "../style.scss";
import { useRecoilValue } from "recoil";
import { studentProfileState } from "../../../store";
import useCustomHook from "../actionHandler";

const Profile = () => {
  const { getStudentProfile } = useCustomHook()
  const [showSideViewType, setShowSideViewType] = useState("student-tabs");
  const userProfile = useRecoilValue(studentProfileState)
  const [pageLoad, setPageLoad] = useState(true)

  useEffect(() => {
    (async () => {
      await getStudentProfile()
      setPageLoad(false)
    })()
  }, [])

  return (
    <div className="main-student-profile">
      <Row gutter={[10, 10]}>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div className="title-bar">
            <PageHeader title="My Profile" bordered={true} />
          </div>
          <Divider className="border-0 border-solid border-[#D9DBE9]" />
        </Col>
        {pageLoad ?
          <Loader />
          : (
            <>
              <Col xxl={6} xl={7} lg={7} md={7} sm={24} xs={24}>
                <StudentSideBar setShowSideViewType={setShowSideViewType} />
              </Col>
              <Col xxl={18} xl={17} lg={17} md={17} sm={24} xs={24}>
                {showSideViewType === "add-video" && <AddVideo />}
                {showSideViewType === "change-password" && <ChangePassword  setShowSideViewType={setShowSideViewType}/>}
                {showSideViewType === "student-tabs" && <StudentsTabs />}
              </Col>
            </>
          )}
      </Row>
    </div>
  );
};

export default Profile;
