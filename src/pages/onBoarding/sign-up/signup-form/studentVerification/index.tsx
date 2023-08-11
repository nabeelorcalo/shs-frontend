import React, { useEffect, useState } from "react";
import IdentityVerification from "./IdentityVerification";
import Address from "./Address";
import Documents from "./Documents";
import DbsVerification from "./DbsVerification";
import UniversityDetails from "./UniversityDetails";
import Photograph from "./Photograph";
import Video from "./Video";
import useCustomHook from "../../../actionHandler";
import { studentProfileCompletionState } from "../../../../../store/profile";
import { useRecoilState } from "recoil";
import { isUndefined } from "lodash";
import { ROUTES_CONSTANTS } from "../../../../../config/constants";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface StepProps {
  isDashboard?: boolean;
  setHide?: Function;
  initStepState?: any;
  completedSteps?: any;
}

function VerificationSteps(props: StepProps) {
  const navigate = useNavigate();
  const {
    isDashboard = false,
    setHide,
    initStepState,
    completedSteps = [],
  } = props;
  const [currentStep, setCurrentStep] = useState(
    initStepState ? initStepState : 2
  );
  const [progress, setProgress] = useRecoilState<any>(
    studentProfileCompletionState
  );
  const { verifcationStudent } = useCustomHook();

  console.log(completedSteps);

  useEffect(() => {
    if (completedSteps.includes(currentStep)) {
      if (currentStep == 7) {
        if (!isUndefined(setHide)) {
          setHide();
        }
      } else {
        setCurrentStep((prev: any) => prev + 1);
      }
    }
  }, [currentStep]);

  const updateProgressState = (updates: any) => {
    if (!isUndefined(setProgress)) {
      setProgress((prev: any) => {
        return { ...prev, ...updates };
      });
    }
    if (updates["introductionVideo"] == "COMPLETED") {
      if (!isUndefined(setHide)) {
        setHide();
      } else {
        navigate(`/${ROUTES_CONSTANTS.DASHBOARD}`);
      }
    }
    return;
  };

  const skipStep = async () => {
    if (currentStep == 7) navigate(`/${ROUTES_CONSTANTS.DASHBOARD}`);
    try {
      const data = await verifcationStudent(
        {},
        { step: currentStep, skip: true }
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div className="verify-form-signup">
      {completedSteps.includes(currentStep) ? (
        <>
          <Spin indicator={antIcon} />
        </>
      ) : (
        <>
          {currentStep == 1 && (
            <IdentityVerification
              updateProgress={updateProgressState}
              isDashboard={isDashboard}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              skipStep={skipStep}
            />
          )}
          {currentStep == 2 && (
            <DbsVerification
              updateProgress={updateProgressState}
              isDashboard={isDashboard}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              skipStep={skipStep}
            />
          )}
          {currentStep == 3 && (
            <UniversityDetails
              updateProgress={updateProgressState}
              isDashboard={isDashboard}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              skipStep={skipStep}
            />
          )}
          {currentStep == 4 && (
            <Documents
              updateProgress={updateProgressState}
              isDashboard={isDashboard}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              skipStep={skipStep}
            />
          )}
          {currentStep == 5 && (
            <Address
              updateProgress={updateProgressState}
              isDashboard={isDashboard}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              skipStep={skipStep}
            />
          )}
          {currentStep == 6 && (
            <Photograph
              updateProgress={updateProgressState}
              isDashboard={isDashboard}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              skipStep={skipStep}
            />
          )}
          {currentStep == 7 && (
            <Video
              updateProgress={updateProgressState}
              isDashboard={isDashboard}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              skipStep={skipStep}
            />
          )}
        </>
      )}
    </div>
  );
}

export default VerificationSteps;
