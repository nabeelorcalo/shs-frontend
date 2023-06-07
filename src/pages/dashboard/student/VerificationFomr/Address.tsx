import { useState } from "react";
import { Button, Col, Form, Input, Row, Typography, Select } from 'antd';
import { BackButton } from "../../../../assets/images";
import { DragAndDropUpload, DropDown } from "../../../../components";
import { CaretDownOutlined } from '@ant-design/icons';
import useCustomHook from "../../actionHandler";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../config/validationMessages";

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
  const [dynSkip, setDynSkip] = useState<boolean>(false);
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

    action.verifcationStudentData(formData, { skip: dynSkip, step: currentStep })
    setCurrentStep(currentStep+1);
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
                    setCurrentStep(currentStep - 1);
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
                validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
                initialValues={{ remember: !dynSkip }}
                onFinish={onFinish}
              >
                <Form.Item
                  label="Post Code"
                  name="postcode"
                  rules={[{ type: "string" }, { required: !dynSkip }]}
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
                      rules={[{ type: "string" }, { required: !dynSkip }]}
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
                          required: !dynSkip,
                          message: "Please input your Street!",
                        },
                      ]}
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
                          required: !dynSkip,
                          message: "Please input your Town!",
                        },
                      ]}
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
                      rules={[{ type: "string" }, { required: !dynSkip }]}
                    >
                      <Select
                        placeholder='Select Country type'
                        size="middle"
                        suffixIcon={<CaretDownOutlined />}
                      >
                        {countryOptions.map((option: any) => (
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
                  className="mb-[20px]"
                  rules={[{ type: "string" }, { required: !dynSkip }]}
                >
                  <div className="dragger">
                    <DragAndDropUpload files={proofFile} setFiles={setProofFile} />
                  </div>
                </Form.Item>
                <Row gutter={[10, 10]}>
                  <Col xs={24} md={24} lg={12} xl={8}>
                    <Button className="btn-cancel btn-cancel-verification"
                      onClick={() => {
                        setDynSkip(true);
                      }}
                      htmlType="submit"
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
