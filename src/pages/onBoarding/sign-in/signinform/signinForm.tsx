import React, { useEffect, useState } from "react";
import { Button, Checkbox, Col, Form, Input, Row, Typography } from "antd";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../config/validationMessages";
import useCustomHook from "../actionHandler";
import SelectUserType from "../../userType";
import constants, { ROUTES_CONSTANTS } from "../../../../config/constants";
import { useRecoilState } from "recoil";
import { rememberMeState } from "../../../../store";

enum VeriffStatus {
  NOT_STARTED = "not started",
  STARTED = "started",
  SUBMITTED = "submitted",
  CREATED = "created",
  APPROVED = "approved",
  ABANDONED = "abandoned",
  DECLINED = "declined",
  EXPIRED = "expired",
}

const SigninForm = (props: any) => {
  const [searchParams] = useSearchParams();
  const signup = searchParams.get("signup");
  const [rememberMe, setRememberMe] = useRecoilState(rememberMeState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const navigate = useNavigate();
  const action = useCustomHook();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (signup) showModal();
  }, []);

  const onFinish = (values: any) => {
    setBtnLoading(true);
    console.log("Received values of form: ", values);
    const { Email, password } = values;
    action
      .login({
        email: Email,
        password: password,
      })
      .then((data: any) => {
        setBtnLoading(false);

        if (data.challengeName == "NEW_PASSWORD_REQUIRED") {
          return navigate(
            `/${ROUTES_CONSTANTS.SIGNUP}?signupRole=${data.user.role}`
          );
        }

        if (
          data.user.firstLogin == true &&
          (data.user.role == constants.STUDENT ||
            data.user.role == constants.INTERN)
        )
          return navigate(`/${ROUTES_CONSTANTS.VERIFICATION_STEPS}`);
        if (
          data.user.role == constants.COMPANY_ADMIN &&
          data.user.firstLogin == true
        )
          return navigate(`/${ROUTES_CONSTANTS.COMPANY_VERIFICATION_STEPS}`);
        // data.accessToken && navigate(`/${ROUTES_CONSTANTS.DASHBOARD}`);
        if (data.accessToken) {
          window.location.replace(
            `${constants.WEBSITE_URL}?accessToken=${data.accessToken}&refreshToken=${data.refreshToken}&cognitoId=${data?.user?.cognitoId}`
          );
        }
      })
      .catch((err) => {
        setBtnLoading(false);
        console.log(err);
      });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <div className="form-wrapper">
        <Form
          layout="vertical"
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="Email"
            rules={[{ type: "email" }, { required: true }]}
          >
            <Input
              placeholder="Enter Email"
              className="input-style"
              onChange={handleChange}
              name="Email"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password
              type="password"
              placeholder="Enter Password"
              className="input-style"
              onChange={handleChange}
              name="password"
            />
          </Form.Item>
          <Row className="flex">
            <Col
              xxl={12}
              xl={12}
              lg={12}
              md={12}
              sm={24}
              xs={24}
              className="text-center sm:text-start"
            >
              <Form.Item
                name="remember"
                valuePropName="checked"
                noStyle
                className="text-center "
              >
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                >
                  <span className="text-teriary-color text-base font-normal">
                    Remember me
                  </span>
                </Checkbox>
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item>
                <a
                  className="login-form-forgot text-center md:text-end"
                  href="/forgot-password"
                >
                  <Typography className="primary-color">
                    Forgot password ?
                  </Typography>
                </a>
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
              Sign In
            </Button>
          </Form.Item>
          <div>
            <Typography
              className="text-center primary-color text-base"
              onClick={showModal}
            >
              Don’t have an account?{" "}
              <span className="a-tag-signup cursor-pointer font-semibold">
                Sign up
              </span>
            </Typography>
          </div>
        </Form>
      </div>
      <SelectUserType
        showModal={showModal}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default SigninForm;
