import React, { useState } from "react";
import IdentityVerification from "./IdentityVerification";
import Address from "./Address";
import Documents from "./Documents";
import DbsVerification from "./DbsVerification";
import UniversityDetails from "./UniversityDetails";
import Photograph from "./Photograph";
import Video from "./Video";
import useCustomHook from "../../../actionHandler";

function VerificationSteps(props: any) {
  const { isDashboard = false } = props;
  const [currentStep, setCurrentStep] = useState(1);
  const { verifcationStudent } = useCustomHook();

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
          isDashboard={isDashboard}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          skipStep={skipStep}
        />
      )}
      {currentStep == 2 && (
        <DbsVerification
          isDashboard={isDashboard}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          skipStep={skipStep}
        />
      )}
      {currentStep == 3 && (
        <UniversityDetails
          isDashboard={isDashboard}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          skipStep={skipStep}
        />
      )}
      {currentStep == 4 && (
        <Documents
          isDashboard={isDashboard}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          skipStep={skipStep}
        />
      )}
      {currentStep == 5 && (
        <Address
          isDashboard={isDashboard}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          skipStep={skipStep}
        />
      )}
      {currentStep == 6 && (
        <Photograph
          isDashboard={isDashboard}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          skipStep={skipStep}
        />
      )}
      {currentStep == 7 && (
        <Video
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
