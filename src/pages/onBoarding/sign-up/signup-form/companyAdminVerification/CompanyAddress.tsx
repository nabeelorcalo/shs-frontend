import React, { useEffect, useState } from "react";
import { Col, Row, Typography, Form, Input, Button, Select } from "antd";
import { BackButton, SHSLogo } from "../../../../../assets/images";
import { Notifications } from "../../../../../components";
import "../../../styles.scss";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";
import useCustomHook from "../../../actionHandler";
import useCountriesCustomHook from "../../../../../helpers/countriesList";
import UserSelector from "../../../../../components/UserSelector";
import dayjs from "dayjs";
import { useRecoilState } from "recoil";
import { companyStepperData } from "../../../../../store/Signup";

const CompanyAddress = (props: any) => {
  const [initialValues, setInitialValues] = useRecoilState(companyStepperData);
  const [btnLoading, setBtnLoading] = useState(false);
  const { getCountriesList, allCountriesList } = useCountriesCustomHook();
  const { currentStep, setCurrentStep } = props;
  const { companyVerification } = useCustomHook();

  useEffect(() => {
    getCountriesList();
  }, []);

  const selectCountry = allCountriesList?.map((item: any, index: number) => {
    return {
      key: index,
      value: item?.name?.common,
      label: item?.name?.common,
    };
  });

  const onFinish = async (values: any) => {
    setBtnLoading(true);
    values.dateOfIncorporation = dayjs(values.dateOfIncorporation).format(
      "YYYY-MM-DD"
    );
    console.log("Form Items: ", values);

    const response = await companyVerification(values, 2);
    console.log(response);
    if (!response || response.statusCode != 200) {
      setBtnLoading(false);
      Notifications({
        title: "Error",
        description: `Failed to update date`,
        type: "error",
      });
      return;
    }
    setBtnLoading(false);
    setInitialValues({ ...initialValues, ...values });
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="about-buisness">
      <Row className="about-buisness-style">
        <Col xxl={8} xl={8} lg={14} md={18} sm={24} xs={24}>
          <div className="logo-wrapper">
            <SHSLogo />
          </div>
          <div className="form-inner-wrapper">
            <div className="main-title-wrapper">
              <Typography className="steps">Step 2 of 3</Typography>
              <div className="flex items-center mt-3 mb-3">
                <div className="hover:cursor-pointer">
                  <BackButton
                    onClick={() =>
                      setCurrentStep((currVal: number) => currVal - 1)
                    }
                  />
                </div>
                <div className="mx-auto">
                  <Typography.Title level={3}>
                    Registered Company Address
                  </Typography.Title>
                </div>
              </div>
            </div>
            <div className="secondary-form-wrapper">
              <Form
                layout="vertical"
                name="company_address"
                requiredMark={false}
                className="address-form"
                initialValues={{ remember: true }}
                validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
                onFinish={onFinish}
              >
                <Form.Item
                  label="Post Code"
                  name="postCode"
                  initialValue={initialValues.postCode}
                >
                  <Input
                    placeholder="Enter Post Code"
                    className="text-input-bg-color"
                  />
                </Form.Item>
                <Row gutter={25}>
                  <Col xxl={12} xl={12} lg={10} md={12} sm={12} xs={12}>
                    <Form.Item
                      label="Address"
                      name="address"
                      initialValue={initialValues.address}
                    >
                      <Input
                        placeholder="Enter Address"
                        className="text-input-bg-color"
                      />
                    </Form.Item>
                  </Col>
                  <Col xxl={12} xl={12} lg={10} md={12} sm={12} xs={12}>
                    <Form.Item
                      label="Street"
                      name="street"
                      initialValue={initialValues.street}
                    >
                      <Input
                        placeholder="Enter Street"
                        className="text-input-bg-color"
                      />
                    </Form.Item>
                  </Col>
                  <Col xxl={12} xl={12} lg={10} md={12} sm={12} xs={12}>
                    <Form.Item
                      label="Town"
                      name="town"
                      initialValue={initialValues.town}
                    >
                      <Input
                        placeholder="Enter Town"
                        className="text-input-bg-color"
                      />
                    </Form.Item>
                  </Col>
                  <Col xxl={12} xl={12} lg={10} md={12} sm={12} xs={12}>
                    <Form.Item
                      label="Country"
                      name="country"
                      initialValue={initialValues.country}
                    >
                      <UserSelector
                        showInnerSearch={true}
                        options={selectCountry.sort((a, b) =>
                          a.label.localeCompare(b.label)
                        )}
                        placeholder="Select"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={btnLoading}
                  >
                    Next
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CompanyAddress;
