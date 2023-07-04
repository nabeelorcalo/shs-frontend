import { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { PageHeader } from "../../../components";
import ProfileCompletion from "./profileCompletion";
import MainDataSide from "./mainDataSide";
import VerificationForm from "./VerificationFomr";
import "../style.scss";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  currentUserState,
  studentProfileCompletionState,
} from "../../../store";
import VerificationSteps from "../../onBoarding/sign-up/signup-form/studentVerification";

const Student = () => {
  const [hide, setHide] = useState(true);
  const [profileCompletion, setProfileCompletion] = useRecoilState<any>(
    studentProfileCompletionState
  );
  const { firstName, lastName } = useRecoilValue(currentUserState);

  const stepList: any = {
    identityVerification: 1,
    dbsVerification: 2,
    universityDetails: 3,
    identityDocuments: 4,
    addressDetails: 5,
    profilePicture: 6,
    introductionVideo: 7,
  };

  let initStep = 1;
  let foundFirst = false;
  let completed: any = [];

  Object.keys(profileCompletion).map((i: any) => {
    if (profileCompletion[i] == "COMPLETED") {
      completed.push(stepList[i]);
    }
    if (
      (profileCompletion[i] == "SKIPPED" ||
        profileCompletion[i] == "PENDING") &&
      !foundFirst
    ) {
      initStep = stepList[i];
      foundFirst = true;
    }
  });

  console.log(completed);

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
          <ProfileCompletion
            hide={hide}
            setHide={() => setHide((val: boolean) => !val)}
          />
        </Col>
        <Col xxl={18} xl={18} lg={16} md={24} sm={24} xs={24}>
          {!hide ? (
            <VerificationSteps
              isDashboard={true}
              setHide={() => setHide((val: boolean) => !val)}
              initStepState={initStep}
              completedSteps={completed}
            />
          ) : (
            <MainDataSide />
          )}
        </Col>
      </Row>
    </div>
  );
};
export default Student;
