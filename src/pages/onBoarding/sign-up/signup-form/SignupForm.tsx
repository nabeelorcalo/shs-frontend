import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Select, Space, Typography } from 'antd';
import { CommonDatePicker } from "../../../../components";
import "../../styles.scss";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../config/validationMessages";
import { useNavigate } from "react-router-dom";
import constants, { ROUTES_CONSTANTS } from "../../../../config/constants";
import useCustomHook from '../../actionHandler';
import "react-phone-input-2/lib/style.css";
import PhoneInput from 'react-phone-input-2';
import PasswordCritera from "./PasswordCritera";
import useCountriesCustomHook from "../../../../helpers/countriesList";
import UserSelector from "../../../../components/UserSelector";

const SignupForm = ({ signupRole }: any) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [codeValue, setCodeValue] = useState<any>(undefined);
  const [showPassCriteria, setShowPassCriteria] = React.useState(false);
  const [password, setPassword] = useState("");
  const [passwordMatchedMessage, setMatchedPassMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { getCountriesList, allCountriesList } = useCountriesCustomHook();
  const action = useCustomHook();

  useEffect(() => {
    getCountriesList()
  }, [])

  const selectCountry = allCountriesList?.map((item: any, index: number) => {
    return (
      {
        key: index,
        value: item?.name?.common,
        label: item?.name?.common,
      }
    )
  })


  const onFinish = (values: any) => {
    const body: any = {
      "email": values.Email,
      "firstName": values.firstName,
      "lastName": values.lastName,
      "phoneNumber": values.phoneNumber,
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
      .reduce((acc: any, [key, value]) => {
        if (typeof value !== 'undefined' && value !== null) {
          acc[key] = value;
        }
        return acc;
      }, {});
    action.signup(filteredBody)
  };

  return (
    <div className="sign-up-form-wrapper">
      <Form
        layout="vertical"
        name="normal_login"
        className="login-form"
        initialValues={{ remember: false }}
        validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row gutter={20}>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true }, { type: "string" }]}
            >
              <Input placeholder="Enter First Name" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true }, { type: "string" }]}
            >
              <Input placeholder="Enter Last Name" className="input-style" />
            </Form.Item>
          </Col>
        </Row>
        {[constants.STUDENT].includes(signupRole) && (
          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true }, { type: "string" }]}>
            <UserSelector
              options={selectCountry}
              placeholder="Select Country"
            />
          </Form.Item>
        )}
        <Form.Item
          label={signupRole == constants.UNIVERSITY ? "University Email" : "Email"}
          name="Email"
          rules={[{ required: true }, { type: "email" }]}>
          <Input
            placeholder={
              signupRole == constants.UNIVERSITY ? "Enter University Email" : "Enter Email"
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
                rules={[{ required: false }, { type: "string" }]}
              >
                <Input
                  placeholder="Reference Number (optional)"
                  className="input-style"
                />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                label="Date of Birth"
                name="DOB"
                rules={[{ required: false }, { type: "date" }]}
              >
                <CommonDatePicker
                  open={open}
                  setOpen={setOpen}
                  setValue={setValue} />
              </Form.Item>
            </Col>
          </Row>
        )}
        {[constants.DELEGATE_AGENT, constants.AGENT].includes(signupRole) && (
          <Row gutter={20}>
            <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                label="Date of Birth"
                name="dob"
                rules={[{ required: false }, { type: "date" }]}>
                <CommonDatePicker open={true} />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                label="Residentail Address"
                name="residentailAddress"
                rules={[{ required: false }, { type: "string" }]}
              >
                <Input
                  placeholder="Enter Address"
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
                rules={[{ required: false }, { type: "string" }]}
              >
                <Input
                  placeholder="Reference Number (optional)"
                  className="input-style"
                />
              </Form.Item>
            </Col>
          </Row>
        )}
        <Row>
          <Col xxl={24} xl={24} lg={24} md={24} xs={24}>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[{ required: true }, { type: "string" }]}
            >
              <Input placeholder="Enter Phone Number" className="input-style" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true }]}
            >
              <Input.Password
                type="password"
                value={password}
                placeholder="Enter Password"
                className="input-style"
                onFocus={() => setShowPassCriteria(true)}
                onChange={(e) => {
                  console.log(e.target.value);
                  setPassword(e.target.value);
                }}
              />
            </Form.Item>
            {showPassCriteria && (
              <div className="mt-[22px] mb-[22px]">
                <PasswordCritera value={password} />
              </div>
            )}
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              label="Confirm Password"
              name="confirmpassword"
              rules={[{ required: true }]}
            >
              <Input.Password
                type="confirmpassword"
                value={confirmPassword}
                placeholder="Re-enter Password"
                className="input-style"
                onChange={(e) => {
                  console.log(e.target.value);
                  setConfirmPassword(e.target.value);
                  password === e.target.value
                    ? setMatchedPassMessage("Password matched")
                    : setMatchedPassMessage("Password not matched");
                }}
              />
            </Form.Item>
            <Typography>{passwordMatchedMessage}</Typography>
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
          <Typography className="text-center primary-color text-base">
            Already have an account?&nbsp;
            <a href={`${ROUTES_CONSTANTS.LOGIN}`} className="a-tag-signup cursor-pointer font-semibold">
              Sign In
            </a>
          </Typography>
        </div>
        <div style={{ marginTop: "1.5rem" }}>
          <Typography className="text-teriary-color font-normal text-base">
            By continuing to create account your are agree to Student Help
            Squad's ? &nbsp;
            <a href={`${ROUTES_CONSTANTS.SIGNUP}`}
              className='text-link-color font-semibold'>
              Term and Condition
            </a>
            &nbsp; and &nbsp;
            <a href={`${ROUTES_CONSTANTS.SIGNUP}`}
              className='text-link-color font-semibold'>
              Privacy
            </a>
          </Typography>
        </div>
      </Form>
    </div>
  );
};

export default SignupForm;
