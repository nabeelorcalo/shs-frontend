import React, { useState } from "react";
import {
  Typography, Row, Col, Divider, Form,
  Radio, RadioChangeEvent, Button, Space,
} from "antd";
import {
  SettingAvater,
} from "../../../../../assets/images";
import { NavLink } from "react-router-dom";
import { Breadcrumb, DropDown, Input, BoxWrapper, DragAndDropUpload, SettingCommonModal } from "../../../../../components";
import "./style.scss";
import { ROUTES_CONSTANTS } from "../../../../../config/constants";
import AvatarGroup from "../../../../../components/UniversityCard/AvatarGroup";
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

  const deselectArray: any = [];
  const [form] = Form.useForm();
  const [value, setValue] = useState(1);
  const [openModal, setOpenModal] = useState<any>(false);
  const [intern, setIntern] = useState<any>();

  const onFinish = (values: any) => {
  };

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    if (e.target.value === 2) {
      setOpenModal(!openModal);
    }
    else if (e.target.value === 1) {
      setIntern(null)
    }
  };

  const SelectInternHandler = (data: any) => {
    console.log(data)
    setIntern(data)
  }

  return (
    <div className="add-location">
      <Breadcrumb breadCrumbData={breadcrumbArray} />
      <Divider />
      <BoxWrapper>
        <Form layout="vertical"
          form={form}
          onFinish={onFinish}
        >
          {/*------------------------ Office----------------------------- */}
          <Row className="mt-5">
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
                rules={[
                  { required: true, message: "Please Enter location name!" },
                ]}
              >
                <Input
                  className="input"
                  id="locationName"
                  label="Location Name"
                  name="locationName"
                  placeholder="Enter Title"
                  size="small"
                  type="text"
                  handleChange={() => { }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
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
                rules={[{ required: true, message: "Please input post code!" }]}
              >
                {/* <SearchBar size="middle" handleChange={handleChange} /> */}
                <Input
                  className="input"
                  id="postCode"
                  label="Post Code"
                  name="postCode"
                  placeholder="Enter Code"
                  size="middle"
                  type="text"
                  handleChange={() => { }}
                //  prefix={<SearchInputIconSetting />} 
                />
              </Form.Item>
              <div className="md:flex gap-2">
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
                    id="address"
                    label="Address"
                    name="address"
                    placeholder="Enter address line"
                    size="middle"
                    type="text"
                    handleChange={() => { }}

                  />
                </Form.Item>

                <Form.Item
                  name="street"
                  className="w-full "
                  rules={[
                    {
                      required: true,
                      message: "Please Enter street!",
                    },
                  ]}
                >
                  <Input
                    className="input"
                    id="street"
                    label="Street"
                    name="street"
                    placeholder="Enter street or location"
                    size="small"
                    type="text"
                    handleChange={() => { }}

                  />
                </Form.Item>
              </div>
              <div className="md:flex gap-2">
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
                    id="town"
                    label="Town"
                    name="town"
                    placeholder="Enter town "
                    size="small"
                    type="text"
                    handleChange={() => { }}
                  />
                </Form.Item>
                <div className="w-full">
                  <Form.Item
                    label="Country"
                    required={false}
                    name="county"
                    rules={[{ required: true, message: "Please input post code!" }]}
                  >
                    <DropDown
                      name="Select"
                      options={["Pakistan", "India", "France"]}
                      setDateValue={() => { }}
                    />
                  </Form.Item>
                </div>
              </div>
            </Col>
          </Row>
          <Divider />
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
                <div className=" mt-1 ">
                  <Form.Item

                    required={false}
                    name="phoneCode"
                    rules={[{ required: true, message: "Please input post code!" }]}
                  >
                    <DropDown
                      name="+92"
                      options={[
                        '+92',
                        '+93',
                        '+94'
                      ]}
                    />
                  </Form.Item>
                </div>
                <Form.Item
                  name="phoneNumber"
                  className="w-full md:pl-2"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter phone number!",
                    },
                  ]}
                >
                  <Input
                    className="input"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="xxxx xxxxxx"
                    size="small"
                    type="text"
                    handleChange={() => { }}
                  />
                </Form.Item>
              </div>
              <Form.Item name="email"
                rules={[{ required: true, message: "Please Enter email!" }]}>
                <Input
                  className="input"
                  id="email"
                  label="Email (option)"
                  name="email"
                  placeholder="Enter email"
                  size="small"
                  type="text"
                  handleChange={() => { }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          {/*------------------------ Upload Picture----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md:px-3" xs={24} md={12} xxl={8}>
              <span className="font-medium mt-0.5 sm:font-semibold text-xl text-primary-color " >
                Upload Image
              </span>
              <Paragraph>Upload picture for your office location</Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
              <DragAndDropUpload />
            </Col>
          </Row>
          <Divider />
          {/*------------------------ Add Interns----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md:px-3" xs={24} md={12} xxl={8}>
              <span className="font-medium mt-0.5 sm:font-semibold text-xl text-primary-color " >
                Add Interns
              </span>
              <Paragraph>Select for this office location</Paragraph>
            </Col>
            <Col className="gutter-row  " xs={24} md={12} xxl={8} >
              <div className=" flex items-center"> <Radio.Group onChange={onChange} value={value}>
                <Radio value={1}>All interns</Radio>
                <Radio value={2}>Select Interns</Radio>
              </Radio.Group>
                <span >
                  <AvatarGroup maxCount={6} list={intern} />
                </span>
              </div>
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
        openModal={openModal}
        setOpenModal={setOpenModal}
        SelectInternHandler={SelectInternHandler}
      />
    </div>
  );
};

export default AddLocation;
