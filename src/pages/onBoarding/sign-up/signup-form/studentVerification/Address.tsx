import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Select, Typography } from "antd";
const { Option } = Select;
import {
  ArrowDownDark,
  SHSLogo,
  BackButton,
} from "../../../../../assets/images";
import {
  DragAndDropUpload,
  DropDown,
  Notifications,
} from "../../../../../components";
import "../../../styles.scss";
import useCustomHook from "../../../actionHandler";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";
import { CaretDownOutlined } from "@ant-design/icons";

const countries = [
  {
    value: "England",
    label: "England",
  },
  {
    value: "Scotland",
    label: "Scotland",
  },
  {
    value: "Whales",
    label: "Whales",
  },
  {
    value: "Ireland",
    label: "Ireland",
  },
];

const Address = (props: any) => {
  const { currentStep, setCurrentStep, skipStep, isDashboard, updateProgress } =
    props;
  const [dynSkip, setDynSkip] = useState<boolean>(false);
  const [proofFile, setProofFile] = useState([]);
  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [files, setFiles] = useState([]);
  const { verifcationStudent } = useCustomHook();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    values.proofOfAddress = proofFile[0];
    const payloadForm = new FormData();
    Object.keys(values).map((val: any) => {
      payloadForm.append(val, values[val]);
    });
    console.log("address  : ", values);
    const response = await verifcationStudent(payloadForm, {
      step: 5,
      skip: dynSkip,
    });

    setLoading(false);
    if (response.statusCode != 201) {
      Notifications({
        title: "Error",
        description: `Failed to add data`,
        type: "error",
      });
      return;
    }
    if (updateProgress) {
      updateProgress();
    }
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="university-detail">
      <Row className="university-detail-style">
        <Col xxl={isDashboard ? 12 : 9} xl={9} lg={14} md={14} sm={24} xs={24}>
          <div className="logo-wrapper">
            <SHSLogo />
          </div>
          <div className="form-inner-wrapper">
            <div className="main-title-wrapper">
              <Typography className="steps">Step 5 of 7</Typography>
              <div className="flex items-center  mt-3 mb-3">
                <div>
                  <BackButton
                    onClick={() => {
                      setCurrentStep(currentStep - 1);
                    }}
                  />
                </div>
                <div className="mx-auto">
                  <Typography.Title level={3}>Address</Typography.Title>
                </div>
              </div>
              <Typography className="steps-description">
                Provide your address details
              </Typography>
            </div>
            <div className="sign-up-form-wrapper">
              <Form
                layout="vertical"
                name="normal_login"
                className="login-form"
                initialValues={{ remember: !dynSkip }}
                validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
                onFinish={onFinish}
              >
                <Form.Item
                  label="Post Code"
                  name="postCode"
                  rules={[{ type: "string" }, { required: false }]}
                >
                  <Input
                    placeholder="Enter Post code"
                    className="input-style"
                  />
                </Form.Item>
                <Row gutter={20}>
                  <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Form.Item
                      label="Address"
                      name="address"
                      rules={[{ type: "string" }, { required: false }]}
                      className="mb-[20px]"
                    >
                      <Input
                        placeholder="Enter Address line"
                        className="input-style"
                      />
                    </Form.Item>
                  </Col>
                  <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Form.Item
                      label="Street"
                      name="street"
                      rules={[{ type: "string" }, { required: false }]}
                      className="mb-[20px]"
                    >
                      <Input
                        placeholder="Enter Street or location"
                        className="input-style"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Form.Item
                      label="Town"
                      name="town"
                      rules={[{ type: "string" }, { required: false }]}
                      className="mb-[20px]"
                    >
                      <Input
                        placeholder="Enter Town line"
                        className="input-style"
                      />
                    </Form.Item>
                  </Col>
                  <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Form.Item
                      name="country"
                      label="Country"
                      rules={[{ type: "string" }, { required: false }]}
                    >
                      <Select size="middle" suffixIcon={<CaretDownOutlined />}>
                        {countries?.map((option: any) => (
                          <Option key={option.value} value={option.value}>
                            {option.label}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  label="Proof of Address"
                  name="proofOfAddress"
                  rules={[{ type: "string" }, { required: !dynSkip }]}
                  className="mb-[20px]"
                >
                  <div className="dragger">
                    <DragAndDropUpload
                      files={proofFile}
                      setFiles={setProofFile}
                    />
                  </div>
                </Form.Item>
                <Row gutter={[10, 10]}>
                  <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
                    <Button
                      className="btn-cancel btn-cancel-verification"
                      onClick={skipStep}
                    >
                      Skip
                    </Button>
                  </Col>
                  <Col xxl={18} xl={18} lg={18} md={24} sm={24} xs={24}>
                    <Form.Item>
                      <Button
                        loading={loading}
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
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Address;
