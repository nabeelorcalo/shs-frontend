import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row,Typography } from "antd";
import { CommonDatePicker, Notifications } from "../../../../components";
import "../../styles.scss";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../config/validationMessages";
import { useNavigate } from "react-router-dom";
import constants, { ROUTES_CONSTANTS } from "../../../../config/constants";
import useCustomHook from "../../actionHandler";
import "react-phone-input-2/lib/style.css";
import PasswordCritera from "./PasswordCritera";
import useCountriesCustomHook from "../../../../helpers/countriesList";
import UserSelector from "../../../../components/UserSelector";
import CountryCodeSelect from "../../../../components/CountryCodeSelect";
import { useRecoilState, useRecoilValue } from "recoil";
import { signupUserData } from "../../../../store/Signup";
import { disabledDate } from "../../../../helpers";
import { newCountryListState } from "../../../../store/CountryList";

const SignupForm = ({ signupRole }: any) => {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useRecoilState(signupUserData);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [showPassCriteria, setShowPassCriteria] = React.useState(false);
  const [btnLoading, setBtnLoading] = React.useState(false);
  const [password, setPassword] = useState("");
  const [passwordMatchedMessage, setMatchedPassMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { getCountriesList, allCountriesList } = useCountriesCustomHook();
  const countries = useRecoilValue(newCountryListState);
  const { signup } = useCustomHook();

  useEffect(() => {
    getCountriesList();
  }, []);

  const handleConfirmPasswordChange = (e: any) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (password === value) {
      setMatchedPassMessage("Password matched");
    } else {
      setMatchedPassMessage("Password does not match");
    }
  };

  const validateConfirmPassword = (_: any, value: any) => {
    if (password === value) {
      return Promise.resolve();
    }
    return Promise.reject(passwordMatchedMessage);
  };

  const onFinish = async (values: any) => {
    setBtnLoading(true);
    const { password, confirmpassword } = values;

    if (password != confirmpassword) {
      Notifications({
        title: "Error",
        description: `Passwords do not match`,
        type: "error",
      });
      return;
    }
    console.log("values", values);
    if (signupRole == constants.UNIVERSITY) {
      setSignupData({ ...values, role: signupRole });
      navigate(`/${ROUTES_CONSTANTS.UNI_VERIFICATION_STEPS}`);
      return;
    }
    const filteredBody = Object.entries({
      ...values,
      DOB: value,
      role: signupRole,
    }).reduce((acc: any, [key, value]) => {
      if (typeof value !== "undefined" && value !== null) {
        acc[key] = value;
      }
      return acc;
    }, {});

    try {
      await signup(filteredBody);
      setBtnLoading(false);
    } catch (error) {
      setBtnLoading(false);
      console.error(error);
    }
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
              // initialValue={'Test'}
              rules={[{ required: true }, { type: "string" }]}
            >
              <Input placeholder="Enter First Name" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              label="Last Name"
              name="lastName"
              // initialValue={'Test2'}
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
            rules={[{ required: true }, { type: "string" }]}
          >
            <UserSelector
              showInnerSearch={true}
              options={countries}
              placeholder="Select Country"
            />
          </Form.Item>
        )}
        <Form.Item
          label={
            signupRole == constants.UNIVERSITY ? "University Email" : "Email"
          }
          name="email"
          // initialValue={'testing@test.com'}
          rules={[{ required: true }, { type: "email" }]}
        >
          <Input
            placeholder={
              signupRole == constants.UNIVERSITY
                ? "Enter University Email"
                : "Enter Email"
            }
            className="input-style"
          />
        </Form.Item>
        {[constants.STUDENT, constants.COMPANY_ADMIN].includes(signupRole) && (
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
                // initialValue={'2000-05-10'}
                rules={[{ required: true }, { type: "date" }]}
              >
                <CommonDatePicker
                  open={open}
                  setOpen={setOpen}
                  disabledDates={disabledDate}
                  setValue={setValue}
                />
              </Form.Item>
            </Col>
          </Row>
        )}
        {[constants.DELEGATE_AGENT, constants.AGENT].includes(signupRole) && (
          <Row gutter={20}>
            <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                label="Date of Birth"
                name="Dob"
                rules={[{ required: false }, { type: "date" }]}
              >
                <CommonDatePicker 
                  open={open}
                  setOpen={setOpen}
                  disabledDates={disabledDate}
                  setValue={setValue}
                />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                label="Residentail Address"
                name="residentailAddress"
                rules={[{ required: false }, { type: "string" }]}
              >
                <Input placeholder="Enter Address" className="input-style" />
              </Form.Item>
            </Col>
          </Row>
        )}
        <Row gutter={20}>
          <Col xxl={7} xl={8} lg={8} md={8} xs={24}>
            <Form.Item name="phoneCode" label="Phone Code" initialValue={"+44"}>
              <CountryCodeSelect />
            </Form.Item>
          </Col>
          <Col xxl={17} xl={16} lg={16} md={16} xs={24}>
            <Form.Item
              name="phoneNumber"
              label=" Phone Number"
              rules={[
                { required: true },
                {
                  pattern: /^[+\d\s()-]+$/,
                  message: "Please enter valid phone number  ",
                },
                {
                  min: 6,
                  message:
                    "Please enter a valid phone number with a minimum of 6 digits",
                },
              ]}
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
                  setPassword(e.target.value);
                  setMatchedPassMessage("");
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
              rules={[
                { required: true },
                { validator: validateConfirmPassword },
              ]}
            >
              <Input.Password
                type="confirmpassword"
                value={confirmPassword}
                placeholder="Re-enter Password"
                className="input-style"
                onChange={handleConfirmPasswordChange}
              />
            </Form.Item>
            {/* <Typography>{passwordMatchedMessage}</Typography> */}
          </Col>
        </Row>
        <Form.Item>
          <Button
            type="primary"
            loading={btnLoading}
            htmlType="submit"
            className="login-form-button"
          >
            Sign Up
          </Button>
        </Form.Item>
        <div>
          <Typography className="text-center primary-color text-base">
            Already have an account?&nbsp;
            <a
              href={`${ROUTES_CONSTANTS.LOGIN}`}
              className="a-tag-signup cursor-pointer font-semibold"
            >
              Sign In
            </a>
          </Typography>
        </div>
        <div className="mt-[1.5rem] text-center">
          <Typography className="text-teriary-color font-normal text-base">
            By continuing to create account your are agree to Student Help
            Squad's ? <a
              href={`${ROUTES_CONSTANTS.SIGNUP}`}
              className="text-link-color font-semibold"
            >
              Term & Condition </a> and <a
                href={`${ROUTES_CONSTANTS.SIGNUP}`}
                className="text-link-color font-semibold"
              >
              Privacy
            </a>
          </Typography>
        </div>
      </Form>
    </div>
  );
};

export default SignupForm;
