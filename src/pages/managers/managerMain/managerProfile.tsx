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
import React, { useState } from "react";
import pf from "../../../assets/images/profile/university/pf.svg";
import iconEmail from "../../../assets/images/profile/student/email.svg";
import iconPhone from "../../../assets/images/profile/student/Phone.svg";
import iconLocation from "../../../assets/images/profile/student/location.svg";
import { DropDown } from "../../../components";
import { Option } from "antd/es/mentions";

const commonObj = {
  moduleName: "University of Lincoln",
  type: "Univesity",
  depName: "University of Lincoln",
  area: "Lincoln, United Kingdom",
  logo: pf,
  personName: "Arlene McCoy",
  // personImg: person,
  iconEmail: iconEmail,
  iconPhone: iconPhone,
  iconLocation: iconLocation,
  email: "enquiries@lincoln.ac.uk",
  phone: "+44 7700 900077",
  location: "Brayford Way, Brayford, Pool, Lincoln LN6 7TS, United Kingdom",
  //     breadCrumbs: {
  //         [
  //             {

  //             },
  //        ]`
  //    },
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
  const [searchValue, setSearchValue] = useState("");
  const [value, setValue] = useState("");
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const name = "Amelia Parker";
  const role = "Manager";
  return (
    <div className="manager-profile">
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div>
            <span className="font-semibold text-2xl text-[#363565]">
              {name}
            </span>
            <Divider type="vertical" />
            <span className="font-semibold text-base text-[#4E4B66]">
              {role}
            </span>
          </div>
        </Col>
      </Row>
      <Divider />
      <Row gutter={[5, 10]}>
        <Col xxl={8} xl={8} lg={10} md={24} sm={24} xs={24}>
          <div className=" pt-6 shadow-[0px 0px 8px 1px rgba(9, 161, 218, 0.1)] bg-white rounded-2xl">
            <center>
              <img src={pf} alt="" />
              <Typography className="font-semibold text-xl text-[#14142A] font-[outfit]">
                {commonObj.personName}
              </Typography>
              <Typography className="font-medium text-base text-[#4E4B66] font-[outfit]">
                UI/UX Designer
              </Typography>
              <Typography className="font-medium text-base text-[#4E4B66] font-[outfit]">
                Design
              </Typography>
            </center>
            <Divider />
            <div className="social-info">
              <div className="social-icon flex  items-center mt-3 ml-7">
                <img src={commonObj.iconEmail} alt="" />
                <Typography className=" font-[outfit] font-normal text-sm text-[#4E4B66] ml-4">
                  {commonObj.email}
                </Typography>
              </div>
              <div className="social-icon flex items-center mt-3 ml-7 ">
                <img src={commonObj.iconPhone} alt="" />
                <Typography className=" font-[outfit] font-normal text-sm text-[#4E4B66] ml-4">
                  {commonObj.phone}
                </Typography>
              </div>
              <div className="social-icon flex items-center mt-3 pb-10 ml-6">
                <img src={commonObj.iconLocation} alt="" />
                <Typography className=" font-[outfit] font-normal text-sm text-[#4E4B66] ml-4">
                  {commonObj.location}
                </Typography>
              </div>
            </div>
          </div>
        </Col>
        <Col xxl={16} xl={16} lg={14} md={24} sm={24} xs={24}>
          <div className="pl-4 pr-4 pt-6 pb-6 shadow-[0px 0px 8px 1px rgba(9, 161, 218, 0.1)] bg-white rounded-2xl">
            <Form
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Row gutter={[10, 15]}>
                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <Typography className="text-xl font-semibold text-[#14142A]">
                    Personal Details
                  </Typography>
                </Col>
                <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item label="First Name" name="firstName">
                    <Input className="bg-[#E6F4F9] text-[#A0A3BD] pl-2 text-base" />
                  </Form.Item>
                </Col>
                <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item label="Last Name" name="lastName">
                    <Input className="bg-[#E6F4F9] text-[#A0A3BD] pl-2 text-base" />
                  </Form.Item>
                </Col>
                <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item
                    label="Gender"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Last name!",
                      },
                    ]}
                  >
                    <DropDown
                      name="Select"
                      value={value}
                      options={["item 1", "item 2", "item 3"]}
                      setValue={setValue}
                    />
                  </Form.Item>
                </Col>
                <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item label="Email" name="email">
                    <Input className="bg-[#E6F4F9] text-[#A0A3BD] pl-2 text-base" />
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
                        options={[{ value: "text 1" }, { value: "text 2" }]}
                      />
                    </Input.Group>
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <Row gutter={[10, 15]}>
                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <Typography className="text-xl font-semibold text-[#14142A]">
                    GeneralInformation
                  </Typography>
                </Col>
                <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item
                    label="Department"
                    rules={[
                      {
                        required: true,
                        message: "Please input your department!",
                      },
                    ]}
                  >
                    <DropDown
                      name="Select"
                      value={value}
                      options={["item 1", "item 2", "item 3"]}
                      setValue={setValue}
                    />
                  </Form.Item>
                </Col>
                <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item label="Title" name="title">
                    <Input className="bg-[#E6F4F9] text-[#A0A3BD] pl-2 text-base" />
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <Row gutter={[10, 15]}>
                <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item label="Post Code" name="postCode">
                    <DropDown
                      name="drop down with search bar"
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
                    <Input className="bg-[#E6F4F9] text-[#A0A3BD] pl-2 text-base" />
                  </Form.Item>
                </Col>
                <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item label="City" name="City">
                    <Input className="bg-[#E6F4F9] text-[#A0A3BD] pl-2 text-base" />
                  </Form.Item>
                </Col>
                <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                  <Form.Item label="Country" name="country">
                    <DropDown
                      name="Select"
                      value={value}
                      options={["item 1", "item 2", "item 3"]}
                      setValue={setValue}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item className="flex justify-center sm:justify-end items-center">
                <Button className="border-1 border-solid border-[#4a9d77] text-[#4a9d77] pt-0 pb-0 pr-5 pl-5 ml-5">
                  Cancel
                </Button>
                <Button
                  htmlType="submit"
                  className="bg-[#4a9d77] text-white border-1 border-solid border-[#4a9d77] pt-0 pb-0 pr-5 pl-5 ml-5"
                >
                  <a href="managers">Submit</a>
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
