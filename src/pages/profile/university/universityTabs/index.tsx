import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { BoxWrapper, DropDown } from "../../../../components";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../config/validationMessages";
import "./styles.scss";
import PhoneInput from "react-phone-input-2";
const { TextArea } = Input;
import "react-phone-input-2/lib/style.css";
import useCustomHook from "../../actionHandler";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserState, universityState } from "../../../../store";
import UserSelector from "../../../../components/UserSelector";
import useCountriesCustomHook from "../../../../helpers/countriesList";
const { Search } = Input;

const options = [
  {
    value: "+91",
    label: "+91",
  },
  {
    value: "+92",
    label: "+92",
  },
];

const UniversityProfileForm = (props: any) => {
  const action = useCustomHook();
  const { userUniversity } = useRecoilValue(currentUserState);
  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [FormInputVal, setFormInputVal] = useState("");
  const { getCountriesList, allCountriesList } = useCountriesCustomHook();
  const [form] = Form.useForm();

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
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('phoneCode', values.phoneCode);
    formData.append('phoneNumber ', (values.phoneNumber).toString());
    formData.append('postCode ', (values.postCode).toString());
    formData.append('address  ', (values.address).toString());
    formData.append('city  ', (values.city).toString());
    formData.append('country  ', (values.country).toString());
    formData.append('logo  ', values.logo);
    formData.append('aboutUni  ', values.aboutUni);
    // action.updateUniversity(userUniversity.id,formData  )
  };

  useEffect(() => {
    if (userUniversity) {
      form.setFieldsValue({
        name: userUniversity?.university?.name,
        email: userUniversity?.university?.email,
        phoneCode: userUniversity?.university?.phoneCode,
        phoneNumber: userUniversity?.university?.phoneNumber,
        postCode: userUniversity?.university?.postCode,
        address: userUniversity?.university?.address,
        city: userUniversity?.university?.city,
        country: userUniversity?.university?.country,
        logoId: '',
        aboutUni: userUniversity?.university?.aboutUni,
      })
    }
  }, [form])

  return (
    <BoxWrapper >
      <div className="uni-profile-form">
        <div className="profile-style">
          <Form
            layout="vertical"
            name="univerisyForm"
            initialValues={{ remember: true }}
            validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
            onFinish={onFinish}
            form={form}
            autoComplete="off"
          >
            <div className="p-4">
              <Typography
                className="main-label font-semibold text-xl text-primary-title-color mb-3">
                Basic Information
              </Typography>
              <Row gutter={[15, 15]}>
                <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                  <Form.Item
                    label="University Name"
                    name="name"
                    rules={[{ required: false }, { type: "string" }]}
                  >
                    <Input
                      placeholder="University of Lincoln"
                      className="input-style"
                    />
                  </Form.Item>
                </Col>
                <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: false }, { type: "email" }]}
                  >
                    <Input placeholder="Enter email" className="input-style" />
                  </Form.Item>
                </Col>
                <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                  <Form.Item
                    name="phoneNumber"
                    label=" Phone Number"
                    rules={[
                      { required: false },
                      {
                        pattern: /^[+\d\s()-]+$/,
                        message: "Please enter valid phone number ",
                      },
                      {
                        min: 6,
                        message:
                          "Please enter a valid phone number with a minimum of 6 digits",
                      },
                    ]}
                  >
                    <Input placeholder="Enter Phone Number" className="input-style" />
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <Typography className=" font-semibold text-xl text-primary-title-color mb-3">Address</Typography>
              <Row gutter={[15, 15]}>
                <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                  <Form.Item
                    label="Post Code"
                    name="postCode"
                    rules={[{ required: false }, { type: "string" }]}
                  >
                    <Input className="input-style" />
                  </Form.Item>
                </Col>
                <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                  <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: false }, { type: "string" }]}
                  >
                    <Input placeholder="Enter address" className="input-style" />
                  </Form.Item>
                </Col>
                <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                  <Form.Item
                    label="City"
                    name="city"
                    rules={[{ required: false }, { type: "string" }]}
                  >
                    <Input placeholder="Enter city" className="input-style" />
                  </Form.Item>
                </Col>
                <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                  <Form.Item
                    label="Country"
                    name="country"
                    rules={[{ required: false }, { type: "string" }]}
                  >
                    <UserSelector
                      options={selectCountry}
                      placeholder="Select Country"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <Typography className="font-semibold text-xl text-primary-title-color mb-3">
                About University
              </Typography>
              <Row>
                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <Form.Item
                    label="Description"
                    name="aboutUni"
                    rules={[{ required: false }, { type: "string" }]}
                  >
                    <TextArea
                      rows={4}
                      placeholder="Write something about the university..."
                      maxLength={6}
                      className="input-style"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex items-center justify-center md:justify-end pt-3">
                <Space>
                  <Button className="btn-cancle">Cancel</Button>
                  <Button className="btn-save" htmlType="submit">
                    Save
                  </Button>
                </Space>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </BoxWrapper>

  );
};

export default UniversityProfileForm;
