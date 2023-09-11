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
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import dayjs from "dayjs";
import { Notifications } from "../../../../components";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../config/validationMessages";
import constants, { ROUTES_CONSTANTS } from "../../../../config/constants";
import { newPasswordUser } from "../../../../store";
import { signupUserData } from "../../../../store/Signup";
import { newCountryListState } from "../../../../store/CountryList";
import useCustomHook from "../../actionHandler";
import PasswordCritera from "./PasswordCritera";
import { disabledDate } from "../../../../helpers";
import useCountriesCustomHook from "../../../../helpers/countriesList";
import usePhoneNumberHook from '../../../../helpers/phoneNumber';
import { CalendarIcon } from "../../../../assets/images";
import "../../styles.scss";

const SignupForm = ({ signupRole }: any) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const refNo: any = searchParams.get("referenceNo") || "";
  const [signupData, setSignupData] = useRecoilState(signupUserData);
  const [showPassCriteria, setShowPassCriteria] = React.useState(false);
  const [btnLoading, setBtnLoading] = React.useState(false);
  const [password, setPassword] = useState("");
  const [passwordMatchedMessage, setMatchedPassMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState('');
  const { getCountriesList, allCountriesList } = useCountriesCustomHook();
  const countries = useRecoilValue(newCountryListState);
  const tempUser: any = useRecoilValue(newPasswordUser);
  const { signup, newPasswordSetup, updateUserProfile, initVerifcation } =useCustomHook();
  const {PhoneValidator} = usePhoneNumberHook();
  const [form] = Form.useForm();

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
                initialValue={refNo}
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
          <Col xxl={24} xl={24} lg={24} md={24} xs={24}>
            <Form.Item
              name="phoneNumber"
              label=" Phone Number"
              className={ phone ? 'phone-input' : 'phone-input-error'}
              rules={[
                {
                  validator: (_, value) => PhoneValidator(phone, value)
                }
              ]}
            >

              <PhoneInput
                value={phone}
                className="w-auto"
                defaultCountry="gb"
                // placeholder="+92 312-9966188"
                // disableDialCodePrefill
                onChange={(phone: string, country: any) => {setPhone(phone)}}
              />

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
