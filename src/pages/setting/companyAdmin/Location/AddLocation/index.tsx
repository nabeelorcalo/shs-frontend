import React, { useState } from "react";
import {
  Typography, Row, Col, Divider, Form, Select,
  Radio, RadioChangeEvent, Button, Space, Input,
} from "antd";
import {
  SettingAvater,
} from "../../../../../assets/images";
import { NavLink } from "react-router-dom";
import { Breadcrumb, BoxWrapper, DragAndDropUpload, SettingCommonModal, SearchBar } from "../../../../../components";
import "./style.scss";
import { ROUTES_CONSTANTS } from "../../../../../config/constants";
import AvatarGroup from "../../../../../components/UniversityCard/AvatarGroup";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";
const { Paragraph } = Typography;

const AddLocation: React.FC = () => {
  const breadcrumbArray = [
    { name: "Add Location" },
    { name: "Setting" },
    { name: "Location", onClickNavigateTo: `/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_LOCATION}` },
  ];
  const selectArray = [
    {
      name: "Eva Smith",
      image: <SettingAvater />,
    },
    {
      name: "Martha Stewart",
      image: <SettingAvater />,
    },
    {
      name: "Evelyn Josh",
      image: <SettingAvater />,
    },
    {
      name: "Arthur Lewis",
      image: <SettingAvater />,
    },
    {
      name: "Tom Edward",
      image: <SettingAvater />,
    },
    {
      name: "Carisle Cullen",
      image: <SettingAvater />,
    },
  ];
  const countrySelectValue = [
    { value: '1', label: 'Pakistan' },
    { value: '2', label: 'India' },
    { value: '3', label: 'France' },
  ]
  const countryCodeSelectValue = [
    { value: '1', label: '+92' },
    { value: '2', label: '+001' },
    { value: '3', label: '+021' },
  ]

  const deselectArray: any = [];
  const [form] = Form.useForm();
  const [state, setState] = useState(
    {
      country: "",
      phoneCode: "",
      intern: [],
      openModal: false,
      internValue: 1,
    });

  const onFinish = (values: any) => {
    const { address, email, locationName, phoneNumber, postCode, street, town } = values;
    let locationValues = {
      intern: state.intern.length,
      country: state.country,
      phoneCode: state.phoneCode,
      address,
      email,
      locationName,
      phoneNumber,
      postCode,
      street,
      town
    };
  }

  const onChange = (e: RadioChangeEvent) => {
    const radioValue = e.target.value
    if (e.target.value === 2) {
      setState({
        ...state, openModal: true, internValue: radioValue
    })}
    
    else if (e.target.value === 1) {
      setState({ ...state,  internValue: radioValue, intern: []
      })
    }
  };

  const handleChange = () => { };

  return (
    <div className="add-location">
      <Breadcrumb breadCrumbData={breadcrumbArray} />
      <Divider />
      <BoxWrapper className="my-5">
        <Form layout="vertical"
          form={form}
          validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
          onFinish={onFinish}
        >
          {/*------------------------ Office----------------------------- */}
          <Row >
            <Col className="gutter-row md-px-3" xs={24} md={12} xxl={8}>
              <span className="font-medium mt-0.5 sm:font-semibold text-xl text-primary-color " >
                Office
              </span>
              <Paragraph>
                Enter office details for different locations
              </Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
              <Form.Item
                name="locationName"
                required={false}
                label="Location Name"
                rules={[{ required: true }, { type: "string" }]}
              >
                <Input placeholder="Enter Title" className="input-style" />
              </Form.Item>
            </Col>
          </Row>
          <Divider className="mt-1" />
          {/*------------------------ Address----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row " xs={24} md={12} xxl={8}>
              <span className="font-medium mt-0.5 sm:font-semibold text-xl text-primary-color " >
                Address
              </span>
              <Paragraph>Enter address details for office location</Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
              <Form.Item
                name="postCode"
                required={false}
                label="Post Code"
                rules={[{ required: true }, { type: "string" }]}
              >
                <span className="post-code">
                  <SearchBar size="middle" handleChange={handleChange} className="searchbar" />
                </span>
              </Form.Item>
              <div className="md:flex gap-2">
                <Form.Item
                  name="address"
                  className="w-full"
                  required={false}
                  label="Address"
                  rules={[{ required: true }, { type: "string" }]}
                >
                  <Input placeholder="Enter address line" className="input-style" />
                </Form.Item>

                <Form.Item
                  name="street"
                  className="w-full "
                  required={false}
                  label="Street"
                  rules={[{ required: true }, { type: "string" }]}
                >
                  <Input placeholder="Enter street or location" className="input-style" />
                </Form.Item>
              </div>
              <div className="md:flex gap-2">
                <Form.Item
                  name="town"
                  className="w-full"
                  required={false}
                  label="Town"
                  rules={[{ required: true }, { type: "string" }]}
                >
                  <Input placeholder="Enter town" className="input-style" />
                </Form.Item>
                <div className="w-full">
                  <Form.Item
                    label="Country"
                    required={false}
                    name="country"
                    rules={[{ required: true }, { type: "string" }]}
                  >
                    <Select
                      showSearch
                      placeholder="Select"
                      onChange={(e: string) => setState({ ...state, country: e })}
                      options={countrySelectValue}
                    />
                  </Form.Item>
                </div>
              </div>
            </Col>
          </Row>
          <Divider className="mt-1" />
          {/*------------------------ Contact----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md:px-3" xs={24} md={12} xxl={8}>
              <span className="font-medium mt-0.5 sm:font-semibold text-xl text-primary-color " >
                Contact
              </span>
              <Paragraph>
                Enter contact information of office location
              </Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
              <span className="label">
                Phone Number (optional)<span className="text-[red]"></span>
              </span>
              <div className="flex">
                <div className="w-[30%]" >
                  <Form.Item
                    required={false}
                    name="phoneCode"
                    rules={[{ required: true }, { type: "string" }]}
                  >
                    <Select
                      showSearch
                      placeholder="+44"
                      onChange={(e: string) => setState({ ...state, phoneCode: e })}
                      options={countryCodeSelectValue}
                    />
                  </Form.Item>
                </div>
                <Form.Item
                  name="phoneNumber"
                  required={false}
                  className="w-full pl-2"
                  rules={[{ required: true }, { type: "string" }]}
                >
                  <Input placeholder="xxxx xxxxxx" className="input-style" />
                </Form.Item>
              </div>
              <Form.Item name="email"
                label="Email (option)"
              >
                <Input placeholder="Enter email" className="input-style" />
              </Form.Item>
            </Col>
          </Row>
          <Divider className="mt-1" />
          {/*------------------------ Upload Picture----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md:px-3" xs={24} md={12} xxl={8}>
              <span className="font-medium mt-0.5 sm:font-semibold text-xl text-primary-color " >
                Upload Image
              </span>
              <Paragraph>Upload picture for your office location</Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
              <Form.Item name="uploadImage">

                <div className="dragger">
                  <DragAndDropUpload />
                </div>
              </Form.Item>
            </Col>
          </Row>

          {/*------------------------ Add Interns----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md:px-3" xs={24} md={12} xxl={8}>
              <span className="font-medium mt-0.5 sm:font-semibold text-xl text-primary-color " >
                Add Interns
              </span>
              <Paragraph>Select for this office location</Paragraph>
            </Col>
            <Col className="gutter-row  " xs={24} md={12} xxl={8} >
              <Form.Item name="intern">
                <div className=" flex items-center">
                  <Radio.Group onChange={onChange} value={state.internValue}>
                    <Radio value={1}>All interns</Radio>
                    <Radio value={2}>Select Interns</Radio>
                  </Radio.Group>
                  <span >
                    <AvatarGroup maxCount={6} list={state.intern} />
                  </span>
                </div>
              </Form.Item>
            </Col>
          </Row>
          <Space className="flex justify-end">
            <Button danger size="middle" type="primary" onClick={() => form.resetFields()}>
              <NavLink to={`/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_LOCATION}`}>
                Cancel
              </NavLink>
            </Button>

            <Button
              size="middle"
              className="teriary-bg-color white-color add-button"
              htmlType="submit"
            >
              Add
            </Button>
          </Space>
        </Form>
      </BoxWrapper>
      <SettingCommonModal
        selectArray={selectArray}
        deselectArray={deselectArray}
        openModal={state.openModal}
        setOpenModal={setState}
        state={state}
        internValue={state.internValue}
        intern={state.intern}
      />
    </div>
  );
};

export default AddLocation;
