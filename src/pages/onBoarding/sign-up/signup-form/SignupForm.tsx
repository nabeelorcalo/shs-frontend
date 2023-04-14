import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Select, Space, Typography, AutoComplete } from 'antd';
import { CommonDatePicker } from "../../../../components";
import "../../styles.scss";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../config/validationMessages";
import { useNavigate, useSearchParams } from "react-router-dom";
import constants from "../../../../config/constants";
import useCustomHook from '../../actionHandler';

const SignupForm = ({ signupRole }: any) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();

  const action = useCustomHook();
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    console.log('date',value);
    
    const body:any = {
      "email": values.Email,
      "firstName": values.firstName,
      "lastName": values.lastName,
      "phoneNumber": '090009i090',
      "password": values.password,
      "referenceNo": values.refrenceNumber,
      "gender": values.gender,
      "address": values.address,
      "DOB": value,
      "country": values.country,
      "universityId": values.universityId,
      "role": signupRole,
      "stripeCustomerId": "56494898496874"
    }

    const filteredBody = Object.entries(body)
    .reduce((acc:any, [key, value]) => {
      if (typeof value !== 'undefined' && value !== null) {
        acc[key] = value;
      }
      return acc;
    }, {});

     action.signup(filteredBody)
    console.log("new console: ", filteredBody);
    // navigate('/verification-steps');
    // navigate("/company-admin-verification");
  };

  const { Option } = Select;

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 100 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  return (
    <div className="sign-up-form-wrapper">
      <Form
        layout="vertical"
        name="normal_login"
        className="login-form"
        initialValues={{ remember: false }}
        validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
        onFinish={onFinish}
      >
        <Row gutter={20}>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true }, { type: "string" }]}
            >
              <Input placeholder="First Name" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true }, { type: "string" }]}
            >
              <Input placeholder="Last Name" className="input-style" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
              label="Country"
              name="country"
              rules={[{ required: true }, { type: "string" }]}
            >
              <Input placeholder="country" className="input-style" />
            </Form.Item>
        <Form.Item
          label={signupRole == constants.UNIVERSITY ? "University Email" : "Email"}
          name="Email"
          rules={[{ required: true }, { type: "email" }]}
        >
          <Input
            placeholder={
              signupRole == constants.UNIVERSITY ? "University Email" : "Email"
            }
            className="input-style"
          />
        </Form.Item>
        {[constants.STUDENT].includes(signupRole) && (
          <Row gutter={20}>
            <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                label="Reference Number (optional)"
                name="refrenceNumber"
                rules={[{ required: true }, { type: "string" }]}
                style={{ width: "100%" }}
              >
                <Input
                  placeholder="Reference Number (optional)"
                  className="input-style"
                />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
              {/* <Form.Item
                label="Date of Birth"
                name="DOB"
                rules={[{ required: false }, { type: "date" }]}
              >
                
              </Form.Item> */}
              <CommonDatePicker open={open} setOpen={setOpen} setValue={setValue} />
            </Col>
          </Row>
        )}
        {[constants.DELEGATE_AGENT, constants.AGENT].includes(signupRole) && (
          <Row gutter={20}>

            <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                label="Date of Birth"
                name="dob"
                rules={[{ required: false }, { type: "date" }]}
              >
                <CommonDatePicker open={true}  />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                label="Residentail Address"
                name="residentailAddress"
                rules={[{ required: true }, { type: "string" }]}
                style={{ width: "100%" }}
              >
                <Input
                  placeholder="House#1,Street#1"
                  className="input-style"
                />
              </Form.Item>
            </Col>
          </Row>
        )}

        {[constants.COMPANY_ADMIN].includes(signupRole) && (
          <Row>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label="Reference Number (optional)"
                name="refrenceNumber"
                rules={[{ required: true }, { type: "string" }]}
                style={{ width: "100%" }}
              >
                <Input
                  placeholder="Reference Number (optional)"
                  className="input-style"
                />
              </Form.Item>
            </Col>
          </Row>
        )}
        <Form.Item
          name="phone"
          label="Phone Number"
          
        >
          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item>
        <Row gutter={20}>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true }, { min: 8 }]}
            >
              <Input.Password
                type="password"
                placeholder="Password"
                className="input-style"
              />
            </Form.Item>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              label="Conifirm Password"
              name="confirmpassword"
              rules={[{ required: true }, { min: 8 }]}
            >
              <Input.Password
                type="confirmpassword"
                placeholder="confirmpassword"
                className="input-style"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Sign Up
          </Button>
        </Form.Item>
        <div>
          <Typography className="text-center">
            Already have an account?
            <a href="/login" className="a-tag-signup">
              Sign In
            </a>
          </Typography>
        </div>
        <div style={{ marginTop: "1.5rem" }}>
          <Typography>
            By continuing to create account your are agree to Student Help
            Squad? <span style={{ fontWeight: 600 }}>Term and Condition </span>
            and <span style={{ fontWeight: 600 }}>Privacy</span>
          </Typography>
        </div>
      </Form>
    </div>
  );
};

export default SignupForm;
