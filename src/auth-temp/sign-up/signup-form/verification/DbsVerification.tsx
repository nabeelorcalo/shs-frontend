import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import React from "react";
import logo from "../../../../assets/login/shslogo.svg";
import "./Verification.scss";
import back from "../../../../assets/login/BackLoginButton.svg";

const DbsVerification = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  const { Option } = Select;
  return (
    <div className="identity">
      <Row className="identity-style">
        <Col xxl={10} xl={10} lg={14} md={18} sm={24} xs={24}>
          <div className="logo-wrapper">
            <img src={logo} alt="error" />
          </div>
          <div
            style={{
              border: "1px solid #D9DBE9",
              boxShadow: "0px 0px 8px 1px rgba(9, 161, 218, 0.1)",
              borderRadius: "16px",
              padding: "2rem",
            }}
          >
            <div className="main-title-wrapper">
              <Typography className="steps">Step 1 of 7</Typography>
              <div className="flex align-center justify-around">
                <img src={back} alt="" />
                <Typography.Title level={3}>DBS Verification</Typography.Title>
              </div>

              <Typography
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#4E4B66",
                  textAlign: "center",
                }}
              >
                Provide your background details
              </Typography>
            </div>
            <div className="sign-up-form-wrapper">
              <Form
                layout="vertical"
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <Form.Item
                  label="Upload"
                  name="uploadDocument"
                  rules={[
                    {
                      required: true,
                      message: "Please Upload Valid Document!",
                    },
                  ]}
                  style={{ width: "100%", marginBottom: "20px" }}
                >
                  <div style={{ border: "2px dashed black", height: "60px" }}>
                    <Input type="file" style={{ display: "none" }} />
                  </div>
                </Form.Item>
                <Typography style={{ marginBottom: "20px" }}>
                  or <a href="">Apply Now</a>
                </Typography>
                <Typography style={{ marginBottom: "20px" }}>
                  You must be 16 or over to apply. It usually takes up to 14
                  days to receive your certificate.
                </Typography>
                <Space>
                  <Button className="btn-cancel" htmlType="submit">
                    Skip
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="btn-primary"
                  >
                    Next
                  </Button>
                </Space>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DbsVerification;
