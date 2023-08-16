import React, { useEffect, useState } from 'react'
import { Avatar, Typography, Divider, Modal, Space, Form, Button, Row, Col, Input, Select } from 'antd';
import { BoxWrapper } from '../../../../../../components';
import { DEFAULT_VALIDATIONS_MESSAGES } from '../../../../../../config/validationMessages';
import CountryCodeSelect from '../../../../../../components/CountryCodeSelect';
import UserSelector from '../../../../../../components/UserSelector';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentUserState, settingDepartmentState } from '../../../../../../store';
import useCountriesCustomHook from '../../../../../../helpers/countriesList';
import { ROUTES_CONSTANTS } from '../../../../../../config/constants';
import { useNavigate } from 'react-router-dom';
import '../../../styles.scss';
const { TextArea } = Input;
import { Option } from "antd/es/mentions";
import useCustomHook from '../../../../actionHandler';
import { newCountryListState } from '../../../../../../store/CountryList';

const MainForm = () => {
  const navigate = useNavigate();
  const action = useCustomHook();
  const [form] = Form.useForm();
  const [userState, setUserState] = useRecoilState(currentUserState)
  const countries = useRecoilValue(newCountryListState);
  const { allCountriesList } = useCountriesCustomHook();
  const {
    firstName,
    lastName,
    gender,
    email,
    phoneCode,
    phoneNumber,
    postCode,
    country,
    city,
    departmentId,
    address,
    title } = useRecoilValue(currentUserState);
  const [flagCode, setFlagCode] = useState<any>(phoneCode);
  const departmentData = useRecoilState<any>(settingDepartmentState);

  const departmentIds = departmentData[0]?.map((department: any) => {
    return { name: department?.name, id: department?.id };
  });

  form.setFieldsValue({
    firstName,
    lastName,
    gender,
    phoneCode,
    phoneNumber,
    postCode,
    email,
    address,
    country,
    city,
    departmentId,
    title
  });

  const onFinish = (values: any) => {
    action.updateManagerProfile({
      gender: values.gender,
      phoneCode: flagCode,
      phoneNumber: values.phoneNumber,
      postCode: values.postCode,
      address: values.address,
      country: values.country,
      city: values.city,
      departmentId: values.departmentId,
      title: values.title
    })
    setUserState({ ...userState, ...values })
  }

  const selectCountry = allCountriesList?.map((item: any, index: number) => {
    return (
      {
        key: index,
        value: item?.name?.common,
        label: item?.name?.common,
      }
    )
  })

  const handleChange = (value: string) => {
    console.log("data", value);
  };

  useEffect(() => {
    action.getSettingDepartment(1, "");
  }, []);

  return (
    <BoxWrapper >
      <div className="manager-profile-form">
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
                Personal Details
              </Typography>
              <Row gutter={[15, 15]}>
                <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[{ required: false }, { type: "string" }]}
                  >
                    <Input
                      placeholder="Enter First Name"
                      className="input-style"
                      disabled
                    />
                  </Form.Item>
                </Col>
                <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[{ required: false }, { type: "string" }]}
                  >
                    <Input
                      placeholder="Enter last Name"
                      className="input-style"
                      disabled
                    />
                  </Form.Item>
                </Col>
                <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                  <Form.Item
                    label="Gender"
                    name="gender"
                    rules={[{ required: false }, { type: "string" }]}
                  >
                    <Select placeholder='Select' >
                      <Option value="MALE">Male</Option>
                      <Option value="FEMALE">Female</Option>
                      <Option value="OTHERS">other</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: false }, { type: "email" }]}
                  >
                    <Input placeholder="Enter email" className="input-style" disabled />
                  </Form.Item>
                </Col>
                <Col>
                  <div className="flex items-center flex-wrap sm:flex-nowrap gap-x-2">
                    {flagCode ?
                      <Form.Item label='Phone Code' key={1}>
                        <CountryCodeSelect
                          onChange={(e: any) => setFlagCode(e)}
                          defaultVal={flagCode}
                        />
                      </Form.Item>
                      :
                      <Form.Item label='Phone Code' key={2}>
                        <CountryCodeSelect
                          onChange={(e: any) => setFlagCode(e)}
                        />
                      </Form.Item>
                    }
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
                  </div>
                </Col>
              </Row>
              <Divider />
              <Typography className="font-semibold text-xl text-primary-title-color mb-3">General Information</Typography>
              <Row gutter={[15, 15]}>
                <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                  <Form.Item
                    label="Department"
                    name="departmentId"
                    rules={[{ type: "number" }, { required: true }]}
                  >
                    <Select
                      placeholder="Select"
                      defaultValue=""
                      onChange={handleChange}
                    >
                      {departmentIds?.map((item: any) => {
                        return <Option value={item?.id}>{item?.name}</Option>;
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                  <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: false }, { type: "string" }]}
                  >
                    <Input className="input-style" placeholder='Enter Title' />
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
                    <Input className="input-style" placeholder='Enter Postcode' />
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
                    <Select
                      showSearch
                      options={countries}
                      placeholder={"Select Country"}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex items-center justify-center md:justify-end pt-3">
                <Space>
                  <Button
                    className="btn-cancle"
                    onClick={() => {
                      navigate(`/${ROUTES_CONSTANTS.DASHBOARD}`);
                    }}
                  >
                    Cancel
                  </Button>
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
  )
}

export default MainForm