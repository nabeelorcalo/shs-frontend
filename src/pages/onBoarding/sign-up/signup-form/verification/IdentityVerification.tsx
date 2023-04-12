import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Typography,
  Modal
} from "antd";
import { BackButton, IconCloseModal, SHSLogo } from "../../../../../assets/images";
import step1 from '../../../../../assets/images/login/step1.svg';
import step2 from '../../../../../assets/images/login/step2.svg';
import step3 from '../../../../../assets/images/login/step3.svg';
import "../../../styles.scss";


const IdentityVerification = (props: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const { Option } = Select;
  const { currentStep, setCurrentStep } = props;
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  return (
    <div className="identity">
      <Row className="identity-style">
        <Col xxl={8} xl={8} lg={14} md={18} sm={24} xs={24}>
          <div className="logo-wrapper">
            <SHSLogo />
          </div>
          <div className="form-inner-wrapper">
            <div className="main-title-wrapper">
              <Typography className="steps">Step 1 of 7</Typography>
              <div className="flex items-center mt-3 mb-3">
                <div>
                  <BackButton

                  />
                </div>
                <div className="mx-auto">
                  <Typography.Title level={3}>
                    Identity Verification
                  </Typography.Title>
                </div>
              </div>

              <Typography className="steps-description">
                Verifying your identity makes it easier for employers to
                shortlist candidates
              </Typography>
            </div>
            <div className="sign-up-form-wrapper">

              <Row gutter={20}>
                <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your First Name!",
                      },
                    ]}
                  >
                    <Input placeholder="First Name" className="input-style" />
                  </Form.Item>
                </Col>
                <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Last Name!",
                      },
                    ]}
                  >
                    <Input placeholder="Last Name" className="input-style" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Country"
                name="Country"
                rules={[
                  { required: true, message: "Please input your Country!" },
                ]}
              >
                <Input placeholder="Country" className="input-style" />
              </Form.Item>
              <Form.Item
                label="Document Type"
                name="Document Type"
                rules={[
                  {
                    required: true,
                    message: "Please input your Document Type!",
                  },
                ]}
              >
                <Input placeholder="Document Type" className="input-style" />
              </Form.Item>

              <Row gutter={[130, 10]}>
                <Col xxl={4} xl={4} lg={5} md={24} sm={24} xs={24}>
                  <Button
                    className="btn-cancel btn-cancel-verification"
                  //htmlType="submit"
                  >
                    Skip
                  </Button>
                </Col>
                <Col xxl={18} xl={18} lg={18} md={24} sm={24} xs={24}>
                  <Form.Item>
                    <Button
                      onClick={() => {
                        console.log('hello')
                        setCurrentStep(2);
                      }}
                      type="primary"
                      //htmlType="submit"
                      className="login-form-button"
                    >
                      Next
                    </Button>
                  </Form.Item>
                </Col>
              </Row>

              <div>
                <Typography className="text-center cursor-pointer" onClick={showModal}>
                  Why I need to verify myself?
                </Typography>
              </div>
            </div>
          </div>
        </Col>

      </Row>
      <Modal centered width={700} closeIcon={<IconCloseModal onClick={() => {
        setIsModalOpen(false)
      }} />} open={isModalOpen} footer={null}>
        <div className="verify-modal">
          <Typography className="top-question">Why I need to verfiy myself?</Typography>
          <Typography className="question-description">
            Identity verification ensures that there is a real person behind a process
            and proves that the one is who he or she claims to be, preventing both a
            person from carrying out a process on our behalf without authorization,
            and creating false identities or commit fraud.
          </Typography>
          <div>
            <Typography className="top-question">How it works</Typography>
            <div className="pb-8">
              <Row gutter={40}>
                <Col xxl={8} xl={8} lg={8} md={8} xs={24}>
                  <center>
                    <img src={step1} alt="" />
                    <Typography className="stepnumber pt-2 pb-2">Step 1</Typography>
                    <Typography className="stepdescription">Take a photo of your identity document</Typography>
                  </center>
                </Col>
                <Col xxl={8} xl={8} lg={8} md={8} xs={24}>
                  <center>
                    <img src={step2} alt="" />
                    <Typography className="stepnumber pt-2 pb-2">Step 2</Typography>
                    <Typography className="stepdescription">Take a self-portrait  photo
                      using your phone’s camera or
                      desktop webcam</Typography>
                  </center>
                </Col>
                <Col xxl={8} xl={8} lg={8} md={8} xs={24}>
                  <center className="pt-5">
                    <img src={step3} alt="" />
                    <Typography className="stepnumber pt-7 pb-2">Step 3</Typography>
                    <Typography className="stepdescription">Your photos and ID are verified
                      with our system</Typography>
                  </center>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default IdentityVerification;
