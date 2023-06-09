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
} from "antd";
import { IconEmail, IconPhone, IconLocation, Pf } from "../../../assets/images/"
import { Breadcrumb, DropDown, PageHeader } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import { Option } from "antd/es/mentions";
import constants, { ROUTES_CONSTANTS } from "../../../config/constants";
import useCustomHook from "../actionHandler";
import { useRecoilState, useRecoilValue } from "recoil";
import { settingDepartmentState } from "../../../store";

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

const breadcrumbArray = [
  { name: 'Amelia Parker' },
  { name: "Managers", onClickNavigateTo: `/${ROUTES_CONSTANTS.MANAGERS}` },
];

const commonObj = {
  moduleName: "University of Lincoln",
  type: "Univesity",
  depName: "University of Lincoln",
  area: "Lincoln, United Kingdom",
  logo: Pf,
  personName: "Amelia Parker",
  iconEmail: IconEmail,
  iconPhone: IconPhone,
  iconLocation: IconLocation,
  email: "enquiries@lincoln.ac.uk",
  phone: "+44 7700 900077",
  location: "Brayford Way, Brayford, Pool, Lincoln LN6 7TS, United Kingdom",
  basic: {
    name: "University of Lincoln",
    email: "enquiries@lincoln.ac.uk",
    mobile: "+44 7700 900077",
    regIntern: "234",
  },
  address: {
    postCode: "LN6 7TS",
    address: "Brayford Way, Brayford, Pool, Lincoln LN6 7TS, United Kingdom",
    city: "Lincoln",
    country: "United Kingdom",
  },
  about: {
    description:
      "Situated in the heart of a beautiful and historic city, we are placed among the top 30 universities in the UK for student satisfaction in the Guardian University Guide 2023.Employers are increasingly looking for individuals who can make a difference in today’s global workplace. With our expert staff, modern facilities, close links with business, and world-leading research we aim to provide the tools you need to achieve your career aspirations. Whether you are thinking about coming to study or undertake research with us, you can be confident that you are joining a university that places the quality of the student experience at the heart of everything it does.",
  },
};

const ManagerProfile = () => {
  const { id } = useParams();
  const [managerIdData, setManagerIdData] = useState<any>();
  const action = useCustomHook();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [value, setValue] = useState("");
  const departmentData = useRecoilState<any>(settingDepartmentState);
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
        department: data?.department?.name,
        email: data?.companyManager?.email,
        title: data?.title,
        postCode: data?.companyManager?.postCode,
        address: data?.companyManager?.address,
        city: data?.companyManager?.city,
        country:data?.companyManager?.country
      });
    })
  }, [form])
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onFinish = (values: any) => {
 const updateForm = {  gender: values.gender,
    phoneCode: values.phoneCode,
    phoneNumber: values.phoneNumber,
    departmentId: values.departmentId,
    title: values.title,
    postCode: "",
    address: values.address,
    city: values.city,
    country:values.country}
    console.log("Success:", values);
    // action.updateManagerProfile({updateForm,managerId})
  };
  return (
    <div className="manager-profile">
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <Breadcrumb breadCrumbData={breadcrumbArray} />
        </Col>
      </Row>
      <Divider />
      <Row gutter={[5, 10]}>
        <Col xxl={8} xl={8} lg={10} md={24} sm={24} xs={24}>
          <div className="pt-6 shadow-[0px 0px 8px 1px rgba(9, 161, 218, 0.1)] white-bg-color rounded-2xl">
            <center>
              <Pf />
              <Typography className="font-semibold text-xl text-primary-color">
                {managerIdData?.companyManager?.firstName}{managerIdData?.companyManager?.lastName}
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
                  {managerIdData?.companyManager?.phoneNumber}
                </Typography>
              </div>
              <div className="social-icon flex items-center mt-3 pb-10 ml-6">
                <IconLocation />
                <Typography className="font-normal text-sm text-secondary-color  ml-4">
                  {managerIdData?.companyManager?.address}
                </Typography>
              </div>
            </div>
          </div>
        </Col>
        <Col xxl={16} xl={16} lg={14} md={24} sm={24} xs={24}>
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
                      className="text-input-bg-color light-grey-color pl-2 text-base" />
                  </Form.Item>
                </Col>
                <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item label="Last Name" name="lastName">
                    <Input placeholder="Enter Last Name"
                      className="text-input-bg-color light-grey-color pl-2 text-base" />
                  </Form.Item>
                </Col>
                <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item
                    label="Gender"
                    name='gender'
                    rules={[
                      {
                        required: true,
                      },
                      {
                        type:"string"
                      }
                    ]}
                  >
                    <Select placeholder='Select' onChange={handleChange} >
                      {gender?.map((item: any) => (
                        <Option key={item.value} value={item.value}>{item.label}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item label="Email" name="email">
                    <Input placeholder="Enter Email"
                      className="text-input-bg-color light-grey-color pl-2 text-base" />
                  </Form.Item>
                </Col>
                <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item label="Phone Number" name="phoneNumber">
                    <Input.Group compact>
                      <Select defaultValue="+92" style={{ width: "30%" }}>
                        <Option value="+92">+92</Option>
                        <Option value="+91">+91</Option>
                      </Select>
                      <AutoComplete
                        style={{ width: "70%" }}
                        placeholder="Phone Number"
                      />
                    </Input.Group>
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <Row gutter={[10, 15]}>
                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <Typography className="text-xl font-semibold text-primary-color ">
                    GeneralInformation
                  </Typography>
                </Col>
                <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item
                    label="Department"
                    name='department'
                    rules={[
                      { required: true, },{ type: 'string'},
                    ]}
                  >
                     <Select
                  placeholder="Select"
                  defaultValue=""
                  onChange={handleChange}
                >
                  {departmentIds.map((item: any) => {
                    return <Option value={item.id}>{item.name}</Option>;
                  })}
                </Select>
                  </Form.Item>
                </Col>
                <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item label="Title" name="title">
                    <Input placeholder="Enter Title"
                      className="text-input-bg-color light-grey-color pl-2 text-base" />
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <Row gutter={[10, 15]}>
                <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item label="Post Code" name="postCode">
                    <DropDown
                      name="Enter Post Code"
                      value={value}
                      options={["search", "item 1"]}
                      setValue={setValue}
                      requireSearchBar
                      searchValue={searchValue}
                      setSearchValue={setSearchValue}
                    />
                  </Form.Item>
                </Col>
                <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item label="Address" name="address">
                    <Input placeholder="Enter Address"
                      className="text-input-bg-color light-grey-color pl-2 text-base" />
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
                  <Select
                  placeholder="Select"
                  defaultValue=""
                  onChange={handleChange}
                >
                  <Option value="England">England</Option>
                  <Option value="Scotland">Scotland</Option>
                  <Option value="Wales">Wales</Option>
                  <Option value="Ireland">Ireland</Option>
                </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item className="flex justify-center sm:justify-end items-center">
                <Button
                  onClick={() => { navigate(`/${ROUTES_CONSTANTS.MANAGERS}`) }}
                  className="border-1 border-solid border-[#4a9d77] 
                text-green-color pt-0 pb-0 pr-5 pl-5 ml-5">
                  Cancel
                </Button>
                <Button
                  // onClick={() => {
                  //   navigate(`/${ROUTES_CONSTANTS.MANAGERS}`)
                  // }}
                  htmlType="submit"
                  className="teriary-bg-color  white-color border-1 border-solid 
                  border-[#4a9d77] pt-0 pb-0 pr-5 pl-5 ml-5"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ManagerProfile;
