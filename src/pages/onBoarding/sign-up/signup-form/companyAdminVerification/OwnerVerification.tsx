import React, { useEffect, useState } from "react";
import { Col, Row, Typography, Form, Input, Button, Select } from "antd";
import { BackButton, SHSLogo } from "../../../../../assets/images";
import { CommonDatePicker, Notifications } from "../../../../../components";
import "../../../styles.scss";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";
import useCustomHook from "../../../actionHandler";
import useCountriesCustomHook from "../../../../../helpers/countriesList";
import UserSelector from "../../../../../components/UserSelector";
import dayjs from "dayjs";
import { useRecoilState, useRecoilValue } from "recoil";
import { companyStepperData } from "../../../../../store/Signup";
import { RangePickerProps } from "antd/es/date-picker";
import { useNavigate } from "react-router-dom";
import { ROUTES_CONSTANTS } from "../../../../../config/constants";
import { currentUserState } from "../../../../../store";

const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  return current && current > dayjs().endOf("day");
};

const OwnerVerification = (props: any) => {
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useRecoilState(companyStepperData);
  const [user, setUser] = useRecoilState(currentUserState);
  const [btnLoading, setBtnLoading] = useState(false);
  const [value, setValue] = useState<string>();
  const [open, setOpen] = useState(false);
  const { currentStep, setCurrentStep } = props;
  const { addCompanyInfo } = useCustomHook();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    setBtnLoading(true);
    console.log("Form Items: ", values);
    values.ownerDOB = dayjs(values.ownerDOB).format("YYYY-MM-DD");

    const response = await addCompanyInfo({ ...initialValues, ...values });
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

    setUser((old: any) => {
      return {
        ...old,
        company: { ...initialValues, ...values },
      };
    });

    navigate(`/${ROUTES_CONSTANTS.DASHBOARD}`);
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
              <Typography className="steps">Step 3 of 3</Typography>
              <div className="flex items-center mt-3 mb-3">
                <div className="hover:cursor-pointer">
                  <BackButton
                    onClick={() => {
                      setCurrentStep((currVal: number) => currVal - 1);
                    }}
                  />
                </div>
                <div className="mx-auto">
                  <Typography.Title level={3}>
                    Owner Verification
                  </Typography.Title>
                </div>
              </div>
            </div>
            <div className="secondary-form-wrapper">
              <Form
                layout="vertical"
                name="company_address"
                form={form}
                className="address-form"
                requiredMark={false}
                initialValues={{ remember: true }}
                validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
                onFinish={onFinish}
              >
                <Form.Item
                  label="Name"
                  name="ownerName"
                  initialValue={initialValues.ownerName}
                >
                  <Input
                    placeholder="Enter Name"
                    className="text-input-bg-color"
                  />
                </Form.Item>
                <Form.Item
                  label="Role"
                  name="ownerRole"
                  initialValue={initialValues.ownerRole}
                >
                  <Input
                    placeholder="Enter Role"
                    className="text-input-bg-color"
                  />
                </Form.Item>
                <Form.Item
                  label="Correspondence Address"
                  name="ownerAddress"
                  initialValue={initialValues.ownerAddress}
                >
                  <Input
                    placeholder="Enter Address"
                    className="text-input-bg-color"
                  />
                </Form.Item>
                <Form.Item
                  label="Date of Birth"
                  name="ownerDOB"
                  initialValue={initialValues.ownerDOB}
                >
                  <CommonDatePicker
                    open={open}
                    setOpen={setOpen}
                    setValue={setValue}
                    initialDate={initialValues.dateOfIncorporation}
                    disabledDates={disabledDate}
                  />
                </Form.Item>
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

export default OwnerVerification;
