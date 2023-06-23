import React, { useState } from "react";
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

function VerificationSteps(props: any) {
  const { isDashboard = false, updateProgress, setHide } = props;
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useRecoilState<any>(
    studentProfileCompletionState
  );
  const { verifcationStudent } = useCustomHook();

  const updateProgressState = (updates: any) => {
    updateProgress((prev: any) => {
      return { ...prev, ...updates };
    });
    if (updates["introductionVideo"] == "COMPLETED") {
      setHide(false);
    }
    return;
  };

  const skipStep = () => {
    verifcationStudent({}, { step: currentStep, skip: true }).then(
      (data: any) => {
        setCurrentStep(currentStep + 1);
      }
    );
  };

  return (
    <div className="verify-form-signup">
      {currentStep == 1 && (
        <IdentityVerification
          updateProgress={updateProgressState({
            identityVerification: "COMPLETED",
          })}
          isDashboard={isDashboard}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          skipStep={skipStep}
        />
      )}
      {currentStep == 2 && (
        <DbsVerification
          updateProgress={updateProgressState({ dbsVerification: "COMPLETED" })}
          isDashboard={isDashboard}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          skipStep={skipStep}
        />
      )}
      {currentStep == 3 && (
        <UniversityDetails
          updateProgress={updateProgressState({
            universityDetails: "COMPLETED",
          })}
          isDashboard={isDashboard}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          skipStep={skipStep}
        />
      )}
      {currentStep == 4 && (
        <Documents
          updateProgress={updateProgressState({
            identityDocuments: "COMPLETED",
          })}
          isDashboard={isDashboard}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          skipStep={skipStep}
        />
      )}
      {currentStep == 5 && (
        <Address
          updateProgress={updateProgressState({ addressDetails: "COMPLETED" })}
          isDashboard={isDashboard}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          skipStep={skipStep}
        />
      )}
      {currentStep == 6 && (
        <Photograph
          updateProgress={updateProgressState({ profilePicture: "COMPLETED" })}
          isDashboard={isDashboard}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          skipStep={skipStep}
        />
      )}
      {currentStep == 7 && (
        <Video
          updateProgress={updateProgressState({
            introductionVideo: "COMPLETED",
          })}
          isDashboard={isDashboard}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          skipStep={skipStep}
        />
      )}
    </div>
  );
}

export default VerificationSteps;
