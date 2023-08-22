import React, { useEffect, useState } from "react";
import {
  AutoComplete,
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Typography,
  Avatar,
  Space
} from "antd";
import { IconEmail, IconPhone, IconLocation, Pf } from "../../../assets/images/"
import { Breadcrumb, ButtonThemePrimary, ButtonThemeSecondary, DropDown, Notifications, PageHeader } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import { Option } from "antd/es/mentions";
import constants, { ROUTES_CONSTANTS } from "../../../config/constants";
import useCustomHook from "../actionHandler";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserState, settingDepartmentState } from "../../../store";
import { newCountryListState } from "../../../store/CountryList";
import UserSelector from "../../../components/UserSelector";
import CountryCodeSelect from "../../../components/CountryCodeSelect";
import '../style.scss';

const gender = [
  {
    key: "1",
    value: "male",
    label: "Male"
  },
  {
    key: "2",
    value: "female",
    label: "Female"
  },
  {
    key: "3",
    value: "others",
    label: "Other"
  }
];

const ManagerProfile = () => {
  const { id } = useParams();
  const [managerIdData, setManagerIdData] = useState<any>();
  const [flagCode, setFlagCode] = useState<any>();
  const action = useCustomHook();
  const navigate = useNavigate();
  const departmentData = useRecoilState<any>(settingDepartmentState);
  const countries = useRecoilValue(newCountryListState);
  const departmentIds = departmentData[0]?.map((department: any) => {
    return { name: department.name, id: department.id };
  });
  const [form] = Form.useForm();

  useEffect(() => {
    action.getSettingDepartment(1, "");
    action.getManagerDetailId(id).then((data: any) => {
      setManagerIdData(data);
      form.setFieldsValue({
        firstName: data?.companyManager?.firstName,
        lastName: data?.companyManager?.lastName,
        gender: data?.companyManager?.gender,
        phoneNumber: data?.companyManager?.phoneNumber,
        phoneCode: data?.companyManager?.phoneCode,
        department: data?.department?.name,
        email: data?.companyManager?.email,
        title: data?.title,
        postCode: data?.companyManager?.postCode,
        address: data?.companyManager?.address,
        city: data?.companyManager?.city,
        country: data?.companyManager?.country
      });
      setFlagCode(data?.companyManager?.phoneCode)
    })
  }, [form])
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onFinish = (values: any) => {
    action.updateManagerProfile(managerIdData?.managerId, {
      gender: values.gender,
      phoneCode: flagCode,
      phoneNumber: values.phoneNumber,
      departmentId: values.department,
      title: values.title,
      postCode: values.postCode,
      address: values.address,
      city: values.city,
      country: values.country
    })
  };

  const breadcrumbArray = [
    { name: managerIdData?.companyManager?.firstName + ' ' + managerIdData?.companyManager?.lastName },
    { name: "Managers", onClickNavigateTo: `/${ROUTES_CONSTANTS.MANAGERS}` },
  ];

  return (
    <div className="manager-profile">
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <Breadcrumb breadCrumbData={breadcrumbArray} />
        </Col>
      </Row>
      <Divider />
      <Row gutter={[20, 10]}>
        <Col xxl={6} xl={6} lg={8} md={8} sm={24} xs={24}>
          <div className="pt-6 card-style">
            <center>
              <Avatar size={90}
                src={`${constants.MEDIA_URL}/${managerIdData?.companyManager?.profileImage?.mediaId}.${managerIdData?.companyManager?.profileImage?.metaData?.extension}`}>
                {managerIdData?.companyManager?.firstName.charAt(0)}
                {managerIdData?.companyManager?.lastName.charAt(0)}
              </Avatar>
              <Typography className="font-semibold text-xl text-primary-color">
                {managerIdData?.companyManager?.firstName}  {managerIdData?.companyManager?.lastName}
              </Typography>
              <Typography className="font-medium text-base text-secondary-color">
                {managerIdData?.title}
              </Typography>
              <Typography className="font-medium text-base text-secondary-color">
                {managerIdData?.department.description}
              </Typography>
            </center>
            <Divider />
            <div className="social-info">
              <div className="social-icon flex  items-center mt-3 ml-7">
                <IconEmail />
                <Typography className="font-normal text-sm text-secondary-color  ml-4">
                  {managerIdData?.companyManager?.email}
                </Typography>
              </div>
              <div className="social-icon flex items-center mt-3 ml-7 ">
                <IconPhone />
                <Typography className="font-normal text-sm text-secondary-color  ml-4">
                {managerIdData?.companyManager?.phoneCode} {managerIdData?.companyManager?.phoneNumber}
                </Typography>
              </div>
              <div className="social-icon flex items-center mt-3 pb-10 ml-6">
                <IconLocation />
                <Typography className="font-normal text-sm text-secondary-color  ml-4">
                  {managerIdData?.companyManager?.address} {managerIdData?.companyManager?.city}
                </Typography>
              </div>
            </div>
          </div>
        </Col>
        <Col xxl={18} xl={18} lg={16} md={16} sm={24} xs={24}>
          <div className="pl-4 pr-4 pt-6 pb-6 card-style">
            <Form
              layout="vertical"
              initialValues={{
                rememberMe: true
              }}
              onFinish={onFinish}
              autoComplete="off"
              form={form}
            >
              <Row gutter={[10, 15]}>
                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <Typography className="text-xl font-semibold text-primary-color ">
                    Personal Details
                  </Typography>
                </Col>
                <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item label="First Name" name="firstName">
                    <Input placeholder="Enter First Name"
                      className="text-input-bg-color light-grey-color pl-2 text-base" disabled />
                  </Form.Item>
                </Col>
                <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item label="Last Name" name="lastName">
                    <Input placeholder="Enter Last Name"
                      className="text-input-bg-color light-grey-color pl-2 text-base" disabled />
                  </Form.Item>
                </Col>
                <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item
                    label="Gender"
                    name='gender'
                    rules={[{ required: false }, { type: "string" }
                    ]}
                  >
                    <Select placeholder='Select' onChange={handleChange} disabled>
                      {gender?.map((item: any) => (
                        <Option key={item.value} value={item.value}>{item.label}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item label="Email" name="email">
                    <Input
                      placeholder="Enter Email"
                      className="text-input-bg-color light-grey-color pl-2 text-base"
                      disabled
                    />
                  </Form.Item>
                </Col>
                <Col >
                  <div className="flex items-center gap-x-2 flex-wrap sm:flex-nowrap">
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
                  <Form.Item label="Phone Number" name="phoneNumber"
                    rules={[
                      { required: false },
                      {
                        pattern: /^[+\d\s()-]+$/,
                        message: "Please enter valid phone number  ",
                      },
                      {
                        min: 6,
                        message: "Please enter a valid phone number with a minimum of 6 digits",
                      },
                    ]}
                  >
                    <Input
                      className="text-input-bg-color light-grey-color pl-2 text-base w-[full]"
                      placeholder="Phone Number"
                    />
                  </Form.Item>
                  </div>
                </Col>
              </Row>
              <Divider />
              <Row gutter={[10, 15]}>
                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <Typography className="text-xl font-semibold text-primary-color ">
                    General Information
                  </Typography>
                </Col>
                <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item
                    label="Department"
                    name='department'
                    rules={[
                      { required: false },
                    ]}
                  >
                    <Select
                      placeholder="Select"
                      onChange={handleChange}
                    >
                      {departmentIds?.map((item: any) => {
                        return <Option value={item?.id}>{item?.name}</Option>;
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item label="Title" name="title">
                    <Input
                      placeholder="Enter Title"
                      className="text-input-bg-color light-grey-color pl-2 text-base"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <Row gutter={[10, 15]}>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <Typography className="text-xl font-semibold text-primary-color ">
                    Address
                  </Typography>
                </Col>
                <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item label="Post Code" name="postCode">
                    <Input placeholder="Enter Post Code" className="text-input-bg-color light-grey-color pl-2 text-base" />
                  </Form.Item>
                </Col>
                <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item label="Address" name="address">
                    <Input
                      placeholder="Enter Address"
                      className="text-input-bg-color light-grey-color pl-2 text-base"
                    />
                  </Form.Item>
                </Col>
                <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item label="City" name="city">
                    <Input placeholder="Enter City"
                      className="text-input-bg-color light-grey-color pl-2 text-base" />
                  </Form.Item>
                </Col>
                <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item label="Country" name="country">
                    <UserSelector
                      hasSearch
                      options={countries}
                      placeholder="Select Country"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Space className="flex justify-center md:justify-end">
                <ButtonThemeSecondary
                  onClick={() => {
                    navigate(`/${ROUTES_CONSTANTS.MANAGERS}`)
                  }}
                >
                  Cancel
                </ButtonThemeSecondary>
                <ButtonThemePrimary
                  htmlType="submit"
                >
                  Submit
                </ButtonThemePrimary>
                </Space>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ManagerProfile;
