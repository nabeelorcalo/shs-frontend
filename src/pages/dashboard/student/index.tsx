import { useState } from "react";
import { Row, Col } from "antd";
import { PageHeader } from "../../../components";
import ProfileCompletion from "./profileCompletion";
import MainDataSide from "./mainDataSide";
import VerificationForm from "./VerificationFomr";
import "../style.scss";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../../store";
import VerificationSteps from "../../onBoarding/sign-up/signup-form/studentVerification";

const Student = () => {
  const [hide, setHide] = useState(true);
  const { firstName, lastName } = useRecoilValue(currentUserState);

  return (
    <div className="student-dashboard-main">
      <PageHeader
        title={
          <span>
            Welcome,{" "}
            <span className="page-header-secondary-color">
              {`${firstName} ${lastName}`} !
            </span>
          </span>
        }
      />
      <Row gutter={[20, 20]}>
        <Col xxl={6} xl={6} lg={8} md={24} sm={24} xs={24}>
          <ProfileCompletion hide={hide} setHide={setHide} />
        </Col>
        <Col xxl={18} xl={18} lg={16} md={24} sm={24} xs={24}>
          {!hide === true ? (
            <VerificationSteps isDashboard={true} />
          ) : (
            <MainDataSide />
          )}
        </Col>
      </Row>
    </div>
  );
};
export default Student;
