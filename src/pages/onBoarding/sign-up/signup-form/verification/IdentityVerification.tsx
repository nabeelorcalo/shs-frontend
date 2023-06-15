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
import { BackButton, IconCloseModal, SHSLogo, Step1, Step2, Step3 } from "../../../../../assets/images";
import "../../../styles.scss";
import { CaretDownOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { ROUTES_CONSTANTS } from "../../../../../config/constants";
import useCustomHook from "../../../actionHandler";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../../../../store";
import { createVeriffFrame, MESSAGES } from '@veriff/incontext-sdk';
import { Notifications } from "../../../../../components";
const { Option } = Select;

const StatusOptions = [
  {
    key: "1",
    value: "ID_CARD",
  },
  {
    key: "2",
    value: "PASSPORT",
  },
  {
    key: "3",
    value: "DRIVING_LICENSE",
  },
  {
    key: "4",
    value: "RESIDENCE_PERMIT",
  },
];

const countryOptions = [
  {
    key: "1",
    value: "PK",
    label: "Pakistan"
  },
  {
    key: "2",
    value: "UK",
    label: "United Kingdom"
  },
  {
    key: "3",
    value: "Bj",
    label: "Beljium"
  },

]

const IdentityVerification = (props: any) => {
  const currentUser = useRecoilValue(currentUserState)
  const { verifcationStudent, initiateVeriff } = useCustomHook();
  const { currentStep, setCurrentStep } = props;
  const [dynSkip, setDynSkip] = useState<boolean>(false);
  const navigate = useNavigate();
  const [statusValue, setStatusValue] = useState("Select");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const onFinish = async (values: any) => {
    console.log('identity verification  : ', values)
    const response: any = await initiateVeriff({ ...values, cognitoId: currentUser.cognitoId })

    if(!response && response?.statusCode == 200) {
      Notifications({
        title: "Error",
        description: `Failed to initiate veriff`,
        type: "error",
      });
      return 
    }

    console.log('THIS', response.data)
    
    const { url } = response.data.verification    
    const veriffFrame = createVeriffFrame({
      url: url,
      onEvent: (msg:any) => {
        switch (msg) {
          case MESSAGES.CANCELED:
            //
            break;
          case MESSAGES.FINISHED:
            veriffFrame.close();
            verifcationStudent({}, { step: 1, skip: dynSkip }).then((data: any) => {
              setCurrentStep(currentStep + 1);
            })
            break;
        }
      }
    })
  }
  // setCurrentStep(currentStep + 1);
  // if(response.statusCode == 400)

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
                <BackButton onClick={() => {
                  navigate(`/${ROUTES_CONSTANTS.SIGNUP}`)
                }} />
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
            <Form
              layout='vertical'
              name='normal_login'
              className='login-form'
              initialValues={{ remember: !dynSkip }}
              validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
              onFinish={onFinish}
            >
              <Row gutter={20}>
                <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    initialValue={currentUser.firstName}
                    rules={[{ type: "string" }, { required: !dynSkip }]}
                  >
                    <Input placeholder="First Name" className="input-style" />
                  </Form.Item>
                </Col>
                <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    initialValue={currentUser.lastName}
                    rules={[{ type: "string" }, { required: !dynSkip }]}
                  >
                    <Input placeholder="Last Name" className="input-style" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label="Country"
                name="country"
                rules={[{ type: "string" }, { required: !dynSkip }]}
              >
                <Select
                  placeholder='Select Country type'
                  size="middle"
                  style={{ width: "100%" }}
                  suffixIcon={<CaretDownOutlined />}
                >
                  {countryOptions.map((option: any) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Document Type"
                name="documentType"
                rules={[{ type: "string" }, { required: !dynSkip }]}
              >
                <Select
                  placeholder='Select document type'
                  size="middle"
                  style={{ width: "100%" }}
                  suffixIcon={<CaretDownOutlined />}
                >
                  {StatusOptions.map((option: any) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Row gutter={[130, 10]}>
                <Col xxl={4} xl={4} lg={5} md={24} sm={24} xs={24}>
                  <Button
                    className="btn-cancel btn-cancel-verification"
                    onClick={() => {
                      setDynSkip(true);
                    }}
                    htmlType="submit"
                  >
                    Skip
                  </Button>
                </Col>
                <Col xxl={18} xl={18} lg={18} md={24} sm={24} xs={24}>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                    >
                      Next
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <div>
              <Typography className="text-center cursor-pointer" onClick={showModal}>
                Why I need to verify myself?
              </Typography>
            </div>
          </div>
        </div>
      </Col>
    </Row>
    <Modal
      centered
      width={700}
      closeIcon={
        <IconCloseModal onClick={() => {
          setIsModalOpen(false)
        }}
        />
      }
      open={isModalOpen}
      footer={null}>
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
                  <Step1 />
                  <Typography className="stepnumber pt-2 pb-2">Step 1</Typography>
                  <Typography className="stepdescription">Take a photo of your identity document</Typography>
                </center>
              </Col>
              <Col xxl={8} xl={8} lg={8} md={8} xs={24}>
                <center>
                  <Step2 />
                  <Typography className="stepnumber pt-2 pb-2">Step 2</Typography>
                  <Typography className="stepdescription">Take a self-portrait  photo
                    using your phone’s camera or
                    desktop webcam</Typography>
                </center>
              </Col>
              <Col xxl={8} xl={8} lg={8} md={8} xs={24}>
                <center className="pt-5">
                  <Step3 />
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
