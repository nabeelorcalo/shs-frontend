import React, { useState } from "react";
import IdentityVerification from "./IdentityVerification";
import Address from "./Address";
import Documents from "./Documents";
import DbsVerification from "./DbsVerification";
import UniversityDetails from "./UniversityDetails";
import Photograph from "./Photograph";
import Video from "./Video";
import { Form } from "antd";

function VerificationSteps(props: any) {

  const [currentStep, setCurrentStep] = useState(1);
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="verify-form-signup">
      <Form
        layout="vertical"
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
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
          <Documents
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep == 5 && (
          <Address
            currentStep={currentStep}
            setCurrentStep={setCurrentStep} />
        )}
        {currentStep == 6 && (
          <Photograph
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep == 7 && (
          <Video
            currentStep={currentStep}
            setCurrentStep={setCurrentStep} />
        )}
      </Form>
    </div>
  );
}

export default VerificationSteps;
