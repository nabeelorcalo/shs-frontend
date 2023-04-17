import { Button, Col, Form, Input, Row, Select, Typography } from "antd";
// import { BackButton,SHSLogo  } from "../../../../../assets/images";
import "./verifications.scss";

const IdentityVerification = (props: any) => {

  const { Option } = Select;
  const { currentStep, setCurrentStep } = props;
  // const prefixSelector = (
  //   <Form.Item name="prefix" noStyle>
  //     <Select style={{ width: 70 }}>
  //       <Option value="86">+86</Option>
  //       <Option value="87">+87</Option>
  //     </Select>
  //   </Form.Item>
  // );
  return (
    <div className="identity">
      <Row gutter={[20, 20]} className="identity-style">
        <Col xxl={12} xl={12} lg={14} md={18} sm={24} xs={24}>
          <div className="form-wrapper">
            <div className="main-title-wrapper">
              <div className="flex items-center mt-3 mb-3">
                <div className="mx-auto">
                  <Typography.Title level={1}>
                    Identity Verification
                  </Typography.Title>
                </div>
              </div>

              <Typography className="steps-description">
                Verifying your identity makes it easier for employers to
                shortlist candidates
              </Typography>
            </div>
            <Row gutter={[20, 20]} className="sign-up-form-wrapper">
              <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
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
              <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
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
              <Col xs={24}>
                <Form.Item
                  label="Country"
                  name="Country"
                  rules={[
                    { required: true, message: "Please input your Country!" },
                  ]}
                >
                  <Input placeholder="Country" className="input-style" />
                </Form.Item>
              </Col>
              <Col xs={24}>
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
              </Col>
              <Col xs={24}>
                <Row gutter={[20, 20]}>
                  <Col xs={24} md={24} lg={12} xl={8}>
                    <Button className="btn-cancel btn-cancel-verification">
                      Skip
                    </Button>
                  </Col>
                  <Col xs={24} md={24} lg={12} xl={16}>
                    <Form.Item>
                      <Button
                        onClick={() => { setCurrentStep(2) }}
                        type="primary"
                        className="login-form-button">
                        Next
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Typography className="text-center">
              Why I need to verify myself?
            </Typography>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default IdentityVerification;
