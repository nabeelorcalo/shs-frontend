import React, { useState } from 'react'
import { Form } from 'antd';
import AboutBuisness from './AboutBuisness'
import RegisteredCompany from './RegisteredCompany';
import OwnerVerification from './OwnerVerification';

const CompanyAdminVerification = (props:any) => {
  const [currentStep, setCurrentStep] = useState(1);
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  return (
      <div>
      <Form
        layout='vertical'
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        {currentStep == 1 && (
          <AboutBuisness
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep == 2 && (
          <RegisteredCompany
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          /> 
          
        )}
         {currentStep == 3 && (
          <OwnerVerification
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          /> 
          
       )}
      
        </Form>

    </div>
  )
}

export default CompanyAdminVerification