import React, { useState } from "react";
import { Typography, Row, Col, Divider, Form, TimePicker, Select } from "antd";
import { SettingHorizontalLine } from "../../../../assets/images";
import { BoxWrapper } from "../../../BoxWrapper/boxWrapper";
import { Input } from "../../../Input/input";
import { SearchBar } from "../../../SearchBar/SearchBar";
import './AddLocation.scss'
import dayjs, { Dayjs } from "dayjs";
import UploadDocument from "../../../UploadDocument";
import { NavLink } from "react-router-dom";

const { Title, Paragraph } = Typography;

const AddLocation: React.FC = () => {
  const [formValues, setFormValues] = useState<any>({
    locationName: "",
    postCode: "",
    address: "",
    street: "",
    town: "",
    country: "",
    countryCode:"",
    phoneNumber: "",
    email: "",
    uploadImage: "",
    addInterns: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues((prevState: any) => ({ ...prevState, [name]: value }));
  };

  console.log("formValues", formValues);
  return (
    <div className="add-location">
       {/*------------------------ Header----------------------------- */}
      <BoxWrapper>
        <div className="flex ">
          <Title level={3}>Add Location </Title>
          <span className="mx-2">
            <SettingHorizontalLine />
          </span>
          <Title className="mt-0.5" level={4}>
            Setting
          </Title>
          <span className="mx-2 mt-2">/</span>
          <NavLink to="/settings/location">  <Title className="mt-0.5" level={4}>
            Location
          </Title>
          </NavLink>
        </div>
      </BoxWrapper>
      <Divider className="mb-0 " />
      <BoxWrapper>
        <Form layout="vertical">
              {/*------------------------ Office----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row px-3" xs={24} md={12} xxl={8}>
              <Title className="mt-0.5" level={4}>
                Office
              </Title>
              <Paragraph>
                Enter office details for different locations
              </Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
              <Form.Item
                name="locationName"
                rules={[
                  { required: true, message: "Please Enter your username!" },
                ]}
              >
                <Input
                  className="input"
                  handleChange={handleChange}
                  id="locationName"
                  label="Location Name"
                  name="locationName"
                  placeholder="Enter Title"
                  size="small"
                  type="text"
                  value={formValues.locationName}
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
              {/*------------------------ Address----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row px-3" xs={24} md={12} xxl={8}>
              <Title className="mt-0.5" level={4}>
                Address
              </Title>
              <Paragraph>Enter address details for office location</Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
              <Form.Item
                label="Post Code"
                name="postCode"
                rules={[{ message: "Please input your username!" }]}
              >
                <SearchBar size="middle" handleChange={handleChange} />
              </Form.Item>
              <div className="md:flex">
                <Form.Item
                  name="address"
                  className="w-full"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter address line!",
                    },
                  ]}
                >
                  <Input
                    className="input"
                    handleChange={handleChange}
                    id="address"
                    label="Address"
                    name="address"
                    placeholder="Enter address line"
                    size="small"
                    type="text"
                    value={formValues.address}
                  />
                </Form.Item>

                <Form.Item
                  name="street"
                  className="w-full pl-2"
                  rules={[
                    {
                      required: true,
                      message:"Please Enter street!",
                    },
                  ]}
                >
                  <Input
                    className="input"
                    handleChange={handleChange}
                    id="street"
                    label="Street"
                    name="street"
                    placeholder="Enter street or location"
                    size="small"
                    type="text"
                    value={formValues.street}
                  />
                </Form.Item>
              </div>
              <div className="md:flex">
                <Form.Item
                  name="town"
                  className="w-full"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter town!",
                    },
                  ]}
                >
                  <Input
                    className="input"
                    handleChange={handleChange}
                    id="town"
                    label="Town"
                    name="town"
                    placeholder="Enter town "
                    size="small"
                    type="text"
                    value={formValues.town}
                  />
                </Form.Item>
                <div className="w-full mt-1 pl-2">
                <span className="label">Country<span className="text-[red]"></span></span>
                
                  <Select
                  className="select"
                  
                    size="middle"
                    style={{ width: "100%" }}
                    placeholder="Select"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    options={[
                      {
                        value: "1",
                        label: "Pakistan",
                      },
                      {
                        value: "2",
                        label: "India",
                      },
                      {
                        value: "3",
                        label: "France",
                      },
                      {
                        value: "4",
                        label: "Canada",
                      },
                    ]}
                  />
                  </div>

               
              </div>
            </Col>
          </Row>
          <Divider />
              {/*------------------------ Contact----------------------------- */}
              <Row className="mt-5">
            <Col className="gutter-row px-3" xs={24} md={12} xxl={8}>
              <Title className="mt-0.5" level={4}>
                Contact
              </Title>
              <Paragraph>
                Enter contact information of office location
              </Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
            <span className="label">Phone Number (optional)<span className="text-[red]"></span></span>
            <div className="md:flex">
       
            <div className=" mt-1 ">
                  <Select
                  className="select"
                  
                    size="middle"
                    style={{ width: "100%" }}
                    placeholder="+92"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    options={[
                      {
                        value: "1",
                        label: "+92",
                      },
                      {
                        value: "2",
                        label: "+09",
                      },
                      {
                        value: "3",
                        label: "+88",
                      },
                      {
                        value: "4",
                        label: "+99",
                      },
                    ]}
                  />
                  </div>

                <Form.Item
                  name="street"
                  className="w-full pl-2"
                  rules={[
                    {
                      required: true,
                      message:"Please Enter street!",
                    },
                  ]}
                >
                  <Input
                    className="input"
                    handleChange={handleChange}
                    id="phoneNumber"
                
                    name="phoneNumber"
                    placeholder="xxxx xxxxxx"
                    size="small"
                    type="text"
                    value={formValues.phoneNumber}
                  />
                </Form.Item>
              </div>
              <Form.Item
                name="email"
             
              >
                <Input
                  className="input"
                  handleChange={handleChange}
                  id="email"
                  label="Email (option)"
                  name="email"
                  placeholder="Enter email"
                  size="small"
                  type="text"
                  value={formValues.email}
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
               {/*------------------------ Upload Picture----------------------------- */}
               <Row className="mt-5">
            <Col className="gutter-row px-3" xs={24} md={12} xxl={8}>
              <Title className="mt-0.5" level={4}>
                Upload Picture
              </Title>
              <Paragraph>
                Upload picture for your office location
              </Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
           <UploadDocument/>
            </Col>
          </Row>
          <Divider />
             {/*------------------------ Add Interns----------------------------- */}
        </Form>
      </BoxWrapper>
    </div>
  );
};

export default AddLocation;
