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
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          skipStep={skipStep}
        />
      )}
      {currentStep == 2 && (
        <DbsVerification
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          skipStep={skipStep}
        />
      )}
      {currentStep == 3 && (
        <UniversityDetails
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          skipStep={skipStep}
        />
      )}
      {currentStep == 4 && (
        <Documents
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          skipStep={skipStep}
        />
      )}
      {currentStep == 5 && (
        <Address
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          skipStep={skipStep}
        />
      )}
      {currentStep == 6 && (
        <Photograph
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          skipStep={skipStep}
        />
      )}
      {currentStep == 7 && (
        <Video
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          skipStep={skipStep}
        />
      )}
    </div>
  );
}

export default VerificationSteps;
