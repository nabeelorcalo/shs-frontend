import { Button, Col, Form, Input, Row, Select, Typography } from "antd";
import "./verifications.scss";
import useCustomHook from "../../actionHandler";
import { CaretDownOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../config/validationMessages";
import UserSelector from "../../../../components/UserSelector";
import useCountriesCustomHook from "../../../../helpers/countriesList";
const { Option } = Select;
const StatusOptions = [
  {
    key: "1",
    value: "ID_CARD",
  },
  {
    key: "2",
    value: "PASSPORT",
  },
  {
    key: "3",
    value: "DRIVING_LICENCE",
  },
  {
    key: "4",
    value: "RESIDENCE_PERMIT",
  },
];

const IdentityVerification = (props: any) => {
  const { currentStep, setCurrentStep } = props;
  const [dynSkip, setDynSkip] = useState<boolean>(false);
  const action = useCustomHook();
  const { getCountriesList, allCountriesList } = useCountriesCustomHook();

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

    const { firstName, lastName, country, documentType } = values;
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("country", country);
    formData.append("documentType", documentType);
    action.verifcationStudentData(formData, { skip: dynSkip, step: currentStep })
    setCurrentStep(currentStep + 1);
  }
  return (
    <div className="identity">
      <Row gutter={[20, 20]} className="identity-style">
        <Col xxl={12} xl={12} lg={14} md={18} sm={24} xs={24}>
          <div className="form-wrapper">
            <div className="main-title-wrapper">
              <div className="flex items-center mt-3 mb-3">
                <div className="mx-auto">
                  <Typography className="main-heading-verify">
                    Identity Verification
                  </Typography>
                </div>
              </div>
              <Typography className="steps-description">
                Verifying your identity makes it easier for employers to
                shortlist candidates
              </Typography>
            </div>
            <div className="sign-up-form-wrapper mt-2">
              <Form
                layout="vertical"
                name="normal_login"
                className="login-form"
                validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
                initialValues={{ remember: !dynSkip }}
                onFinish={onFinish}
              >
                <Row gutter={[20, 20]} className="sign-up-form-wrapper">
                  <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
                    <Form.Item
                      label="First Name"
                      name="firstName"
                      rules={[{ type: "string" }, { required: !dynSkip }]}
                    >
                      <Input placeholder="First Name" className="input-style" />
                    </Form.Item>
                  </Col>
                  <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
                    <Form.Item
                      label="Last Name"
                      name="lastName"
                      rules={[{ type: "string" }, { required: !dynSkip }]}
                    >
                      <Input placeholder="Last Name" className="input-style" />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item
                      label="Country"
                      name="country"
                      rules={[{ type: "string" }, { required: !dynSkip }]}
                    >
                      <UserSelector
                        options={selectCountry}
                        placeholder="Select Country"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item
                      label="Document Type"
                      name="documentType"
                      rules={[{ type: "string" }, { required: !dynSkip }]}
                    >
                      <Select
                        placeholder='Select document type'
                        size="middle"
                        suffixIcon={<CaretDownOutlined />}
                      >
                        {StatusOptions.map((option: any) => (
                          <Option key={option.value} value={option.value}>
                            {option.label}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Row gutter={[20, 20]}>
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
                            htmlType="submit"
                            type="primary"
                            className="login-form-button">
                            Next
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
              <Typography className="font-normal text-base primary-color">
                Why i need to verify myself ?
              </Typography>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default IdentityVerification;
