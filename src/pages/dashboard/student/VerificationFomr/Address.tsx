import { useState } from "react";
import { Button, Col, Form, Input, Row, Typography, Select } from 'antd';
import {  BackButton } from "../../../../assets/images";
import { DragAndDropUpload, DropDown } from "../../../../components";
import { CaretDownOutlined } from '@ant-design/icons';
import useCustomHook from "../../actionHandler";

const countryOptions = [
  {
    key: "1",
    value: "PK",
    label: "Pakistan"
  },
  {
    key: "2",
    value: "UK",
    label: "United Kingdom"
  },
  {
    key: "3",
    value: "Bj",
    label: "Beljium"
  },

]
const { Option } = Select;

const Address = (props: any) => {
  const { currentStep, setCurrentStep } = props;
  const [proofFile, setProofFile] = useState([])
  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const action = useCustomHook();
  const onFinish = (values: any) => {
    console.log('identity verification  : ', values)
    const { postcode, address, street, town, country } = values;
    const formData = new FormData();
    formData.append("universityName", 'postcode');
    formData.append("lastName", address);
    formData.append("country", street);
    formData.append("documentType", town);
    formData.append("documentType", country);
    formData.append("document", proofFile[0]);

    action.verifcationStudentData(formData, { skip: false, step: 5 })
    setCurrentStep(6);
  }

  return (
    <div className="university-detail">
      <Row className="university-detail-style">
        <Col xxl={12} xl={12} lg={14} md={14} sm={24} xs={24}>
          <div className="form-wrapper">
            <div className="main-title-wrapper">
              <div className="flex">
                <div>
                  <BackButton onClick={() => {
                    setCurrentStep(4);
                  }} />
                </div>
                <div className="mx-auto">
                  <Typography className="main-heading-verify">Address</Typography>
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
                onFinish={onFinish}
              >
                <Form.Item
                  label="Post Code"
                  name="postcode"
                  rules={[
                    {
                      required: false,
                      message: "Please Select Valid Code!",
                    },
                  ]}
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
                  <Col xxl={12} xl={12} xs={24}>
                    <Form.Item
                      label="Address"
                      name="address"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Address!",
                        },
                      ]}
                      style={{ width: "100%" }}
                    >
                      <Input
                        placeholder="Enter Address line"
                        className="input-style"
                      />
                    </Form.Item>
                  </Col>
                  <Col xxl={12} xl={12} xs={24}>
                    <Form.Item
                      label="Street"
                      name="street"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Street!",
                        },
                      ]}
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
                  <Col xxl={12} xl={12} xs={24}>
                    <Form.Item
                      label="Town"
                      name="town"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Town!",
                        },
                      ]}
                      style={{ width: "100%" }}
                    >
                      <Input
                        placeholder="Enter Town line"
                        className="input-style"
                      />
                    </Form.Item>
                  </Col>
                  <Col xxl={12} xl={12} xs={24}>
                    <Form.Item
                      label="Country"
                      name="country"
                      rules={[
                        { required: true, message: "Please input your Country!" },
                      ]}
                    >
                      <Select
                        placeholder='Select Country type'
                        size="middle"
                        style={{ width: "100%" }}
                        suffixIcon={<CaretDownOutlined />}
                      >
                        {countryOptions.map((option: any) => (
                          <Option key={option.value} value={option.value}>
                            {option.label}
                          </Option>
                        ))}
                      </Select>
                      {/* <Input placeholder="Country" className="input-style" /> */}
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  label="Proof of Address"
                  name="proofOfAddress"
                  rules={[
                    {
                      required: true,
                      message: "Please Upload Valid Document!",
                    },
                  ]}
                  style={{ width: "100%", marginBottom: "20px" }}
                >
                  <div className="dragger">
                    <DragAndDropUpload files={proofFile} setFiles={setProofFile} />
                  </div>
                </Form.Item>
                <Row gutter={[10, 10]}>
                  <Col xs={24} md={24} lg={12} xl={8}>
                    <Button className="btn-cancel btn-cancel-verification"
                      onClick={() => {
                        setCurrentStep(6);
                      }}
                    >
                      Skip
                    </Button>
                  </Col>
                  <Col xs={24} md={24} lg={12} xl={16}>
                    <Form.Item>
                      <Button
                        type="primary"
                        className="login-form-button"
                        htmlType="submit"
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
