import React, { useState } from "react";
import {
  Typography, Row, Col, Divider, Form,
  Radio, RadioChangeEvent, Button, Space, Input,
} from "antd";
import {
  SettingAvater,
} from "../../../../../assets/images";
import { NavLink } from "react-router-dom";
import { Breadcrumb, DropDown, BoxWrapper, DragAndDropUpload, SettingCommonModal, SearchBar } from "../../../../../components";
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

  const deselectArray: any = [];
  const [form] = Form.useForm();
  const [value, setValue] = useState(1);
  const [openModal, setOpenModal] = useState<any>(false);
  const [intern, setIntern] = useState<any>();
  const [selectValue, setSelectValue] = useState({ country: "Select", phoneCode: "+001" });

  const onFinish = (values: any) => {
    console.log("valies", values)
    const { address, email, locationName, phoneNumber, postCode, street, town } = values;
    let locationValues = {
      intern: intern.length,
      country: selectValue.country,
      phoneCode: selectValue.phoneCode,
      address,
      email,
      locationName,
      phoneNumber,
      postCode,
      street,
      town
    };
    console.log("obj", locationValues)
  }

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
                <Input placeholder="Enter Last Name" className="input-style" />
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
                  <Input placeholder="Enter Last Name" className="input-style" />
                </Form.Item>

                <Form.Item
                  name="street"
                  className="w-full "
                  required={false}
                  label="Street"
                  rules={[{ required: true }, { type: "string" }]}
                >
                  <Input placeholder="Enter Last Name" className="input-style" />
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
                  <Input placeholder="Enter Last Name" className="input-style" />
                </Form.Item>
                <div className="w-full">
                  <Form.Item
                    label="Country"
                    required={false}
                    name="county"
                  >
                    <DropDown
                      name={selectValue.country}
                      value={selectValue.country}
                      options={["Pakistan", "India", "France"]}
                      setValue={(e: string) => setSelectValue({ ...selectValue, country: e })}
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
                  >
                    <DropDown
                      name={selectValue.phoneCode}
                      value={selectValue.phoneCode}
                      options={[
                        '+92',
                        '+93',
                        '+94'
                      ]}
                      setValue={(e: string) => setSelectValue({ ...selectValue, phoneCode: e })}
                    />
                  </Form.Item>
                </div>
                <Form.Item
                  name="phoneNumber"
                  required={false}
                  className="w-full pl-2"
                  rules={[{ required: true }, { type: "string" }]}
                >
                  <Input placeholder="Enter Last Name" className="input-style" />
                </Form.Item>
              </div>
              <Form.Item name="email"
                label="Email (option)"
              >
                <Input placeholder="Enter Last Name" className="input-style" />
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
                <DragAndDropUpload />
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
                  <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>All interns</Radio>
                    <Radio value={2}>Select Interns</Radio>
                  </Radio.Group>
                  <span >
                    <AvatarGroup maxCount={6} list={intern} />
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
        openModal={openModal}
        setOpenModal={setOpenModal}
        SelectInternHandler={SelectInternHandler}
      />
    </div>
  );
};

export default AddLocation;
