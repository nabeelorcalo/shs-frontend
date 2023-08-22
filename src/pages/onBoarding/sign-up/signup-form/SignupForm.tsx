import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";
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
import { newPasswordUser } from "../../../../store";
import { CalendarIcon } from "../../../../assets/images";
import dayjs from "dayjs";

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
  const [code, setCode] = useState("+44");
  const { getCountriesList, allCountriesList } = useCountriesCustomHook();
  const countries = useRecoilValue(newCountryListState);
  const tempUser: any = useRecoilValue(newPasswordUser);
  const { signup, newPasswordSetup, updateUserProfile, initVerifcation } =
    useCustomHook();
  const [form] = Form.useForm();

  useEffect(() => {
    getCountriesList();
    setCode(form.getFieldValue("phoneCode"));
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

    if (signupRole == constants.UNIVERSITY) {
      setSignupData({ ...values, role: signupRole });
      navigate(`/${ROUTES_CONSTANTS.UNI_VERIFICATION_STEPS}`);
      return;
    }
    const filteredBody = Object.entries({
      ...values,
      DOB: dayjs(values.DOB).format("YYYY-MM-DD"),
      role: signupRole,
    }).reduce((acc: any, [key, value]) => {
      if (typeof value !== "undefined" && value !== null) {
        acc[key] = value;
      }
      return acc;
    }, {});

    if (signupRole == constants.MANAGER || signupRole == constants.SUB_ADMIN) {
      let profilePayload = {
        ...values,
      };
      delete profilePayload.password;
      delete profilePayload.confirmPassword;

      let newPassPayload = {
        session: tempUser?.session,
        email: values.email,
        password: values.password,
        role: tempUser.user.role,
      };

      await newPasswordSetup(newPassPayload);
      await updateUserProfile(tempUser.user.id, profilePayload);
      await initVerifcation({ email: values.email });

      setBtnLoading(false);
      navigate(
        `/${ROUTES_CONSTANTS.VERIFICATION_LINK_SENT}?email=${values.email}`
      );
      return;
    }

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
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={
          signupRole == constants.MANAGER || signupRole == constants.SUB_ADMIN
            ? tempUser.user
            : null
        }
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
            <Select
              showSearch
              options={countries}
              placeholder={"Select Country"}
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
            readOnly={
              signupRole == constants.MANAGER ||
              signupRole == constants.SUB_ADMIN
                ? true
                : false
            }
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
                name="referenceNo"
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
                rules={[{ required: true }, { type: "date" }]}
              >
                <DatePicker
                  disabledDate={disabledDate}
                  format={"DD/MM/YYYY"}
                  popupClassName={`common-datepicker-popup-wrapper`}
                  suffixIcon={<img src={CalendarIcon} alt="icon" />}
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
                <DatePicker
                  disabledDate={disabledDate}
                  format={"DD/MM/YYYY"}
                  popupClassName={`common-datepicker-popup-wrapper`}
                  suffixIcon={<img src={CalendarIcon} alt="icon" />}
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
              <CountryCodeSelect defaultVal={code} key={code} />
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
            Squad's ?{" "}
            <a
              href={`${ROUTES_CONSTANTS.SIGNUP}`}
              className="text-link-color font-semibold"
            >
              Term & Condition{" "}
            </a>{" "}
            and{" "}
            <a
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
