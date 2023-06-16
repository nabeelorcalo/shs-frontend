import React, { useState } from "react";
import IdentityVerification from "./IdentityVerification";
import Address from "./Address";
import Documents from "./Documents";
import DbsVerification from "./DbsVerification";
import UniversityDetails from "./UniversityDetails";
import Photograph from "./Photograph";
import Video from "./Video";

function VerificationSteps(props: any) {
  const [currentStep, setCurrentStep] = useState(3);
  return (
    <div className="verify-form-signup">
      {currentStep == 1 && (
        <IdentityVerification
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      )}
      {currentStep == 2 && (
        <DbsVerification
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      )}
      {currentStep == 3 && (
        <UniversityDetails
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      )}
      {currentStep == 4 && (
        <Documents currentStep={currentStep} setCurrentStep={setCurrentStep} />
      )}
      {currentStep == 5 && (
        <Address currentStep={currentStep} setCurrentStep={setCurrentStep} />
      )}
      {currentStep == 6 && (
        <Photograph currentStep={currentStep} setCurrentStep={setCurrentStep} />
      )}
      {currentStep == 7 && (
        <Video currentStep={currentStep} setCurrentStep={setCurrentStep} />
      )}
    </div>
  );
}

export default VerificationSteps;
