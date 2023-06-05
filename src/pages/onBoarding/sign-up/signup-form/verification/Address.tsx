import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import {
  ArrowDownDark,
  SHSLogo,
  BackButton,
} from "../../../../../assets/images";
import { DragAndDropUpload, DropDown } from "../../../../../components";
import "../../../styles.scss";
import useCustomHook from "../../../actionHandler";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";

const Address = (props: any) => {
  const { currentStep, setCurrentStep } = props;
  const [proofFile, setProofFile] = useState([])
  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [files, setFiles] = useState([]);
  const action = useCustomHook();
  console.log("files", files);
  const onFinish = (values: any) => {
    console.log('address  : ', values)
    //  action.verifcationStudent({values,currentStep})
    setCurrentStep(6);
  }

  return (
    <div className="university-detail">
      <Row className="university-detail-style">
        <Col xxl={9} xl={9} lg={14} md={14} sm={24} xs={24}>
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
                      setCurrentStep(4);
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
                layout='vertical'
                name='normal_login'
                className='login-form'
                initialValues={{ remember: true }}
                validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
                onFinish={onFinish}
              >
                <Form.Item
                  label="Post Code"
                  name="postCode"
                  rules={[{ type: "string" }, { required: false }]}
                >
                  <DropDown
                    name="Search"
                    value={value}
                    options={["search", "item 1"]}
                    setValue={setValue}
                    requireSearchBar
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                  />
                </Form.Item>
                <Row gutter={20}>
                  <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Form.Item
                      label="Address"
                      name="address"
                      rules={[{ type: "string" }, { required: true }]}
                      style={{ width: "100%" }}
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
                      rules={[{ type: "string" }, { required: true }]}
                      style={{ width: "100%" }}
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
                      rules={[{ type: "string" }, { required: true }]}
                      style={{ width: "100%" }}
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
                      <DropDown
                        name="Select"
                        value={value}
                        options={["item 1", "item 2", "item 3"]}
                        setValue={setValue}
                        startIcon={ArrowDownDark}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  label="Proof of Address"
                  name="proofOfAddress"
                  rules={[{ type: "string" }, { required: true }]}
                  style={{ width: "100%", marginBottom: "20px" }}
                >
                  <div className="dragger">
                    <DragAndDropUpload files={proofFile} setFiles={setProofFile} />
                  </div>
                </Form.Item>
                <Row gutter={[10, 10]}>
                  <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
                    <Button
                      onClick={() => {
                        setCurrentStep(6);
                      }}
                      className="btn-cancel btn-cancel-verification"
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
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Address;
