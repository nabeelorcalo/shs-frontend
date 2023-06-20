import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Typography, Select } from "antd";
import { SHSLogo, BackButton } from "../../../../../assets/images";
import {
  CommonDatePicker,
  DragAndDropUpload,
  DropDown,
  Notifications,
} from "../../../../../components";
import "../../../styles.scss";
import { CaretDownOutlined } from "@ant-design/icons";
import useCustomHook from "../../../actionHandler";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";
import CustomAutoComplete from "../../../../../components/CustomAutoComplete";
import dayjs from "dayjs";
import UserSelector from "../../../../../components/UserSelector";
import useCountriesCustomHook from "../../../../../helpers/countriesList";
import { useRecoilValue } from "recoil";
import { signupUserData } from "../../../../../store/Signup";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const SelctUniversity = (props: any) => {
  const navigate = useNavigate();
  const signupData = useRecoilValue(signupUserData);
  const { currentStep, setCurrentStep } = props;
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const { globalUniList, signup } = useCustomHook();
  const { getCountriesList, allCountriesList } = useCountriesCustomHook();
  const [form] = Form.useForm();

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
    try {
      await signup({ ...values, ...signupData });
      setBtnLoading(false);
    } catch (error) {
      setBtnLoading(false);
      console.error(error);
    }
  };

  const handleUniSelect = (item: any) => {
    console.log(item);
    form.setFieldValue("university", item.id);
  };

  const handleUniSearch = (text: string) => {
    return globalUniList({ country: form.getFieldValue("country"), text });
  };

  return (
    <div className="verify-form-signup">
      <div className="university-detail">
        <Row className="university-detail-style">
          <Col xxl={8} xl={9} lg={14} md={18} sm={24} xs={22}>
            <div className="logo-wrapper">
              <SHSLogo />
            </div>
            <div className="form-inner-wrapper">
              <div className="main-title-wrapper pt-2">
                <Typography.Title level={2}>
                  Select Univerisity
                </Typography.Title>
              </div>
              <div className="sign-up-form-wrapper mt-12">
                <Form
                  form={form}
                  layout="vertical"
                  name="normal_login"
                  className="login-form"
                  validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
                  onFinish={onFinish}
                >
                  <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                    <Form.Item
                      label="Country"
                      name="country"
                      initialValue={"United Kingdom"}
                      rules={[{ required: true }, { type: "string" }]}
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
                  <Form.Item
                    label="University"
                    name="university"
                    rules={[{ required: true }]}
                    className="w-full mb-20"
                  >
                    <CustomAutoComplete
                      fetchData={handleUniSearch}
                      selectItem={handleUniSelect}
                    />
                  </Form.Item>
                  <Row gutter={[10, 10]}>
                    <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                      <Form.Item>
                        <Button
                          loading={btnLoading}
                          type="primary"
                          htmlType="submit"
                          className="login-form-button"
                        >
                          Continue
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
    </div>
  );
};

export default SelctUniversity;
