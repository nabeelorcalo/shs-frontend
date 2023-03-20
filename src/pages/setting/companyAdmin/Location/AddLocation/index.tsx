import React, { useState } from "react";
import {
  Typography,
  Row,
  Col,
  Divider,
  Form,
  Radio,
  RadioChangeEvent,
  Select,
  Button,
  Space,
} from "antd";
import {
  SearchInputIconSetting,
  SettingAvater,
  SettingHorizontalLine,
} from "../../../../../assets/images";
import "./style.scss";
import { NavLink } from "react-router-dom";
import { BoxWrapper } from "../../../../../components/BoxWrapper/BoxWrapper";
import { DropDown, Input, SearchBar } from "../../../../../components";
import UploadDocument from "../../../../../components/UploadDocument";
import SettingCommonModal from "../../../../../components/Setting/Common/SettingCommonModal";

const { Title, Paragraph } = Typography;

const AddLocation: React.FC = () => {
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
  const [value, setValue] = useState(1);
  const [openModal, setOpenModal] = useState<any>(false);
  const [formValues, setFormValues] = useState<any>({
    locationName: "",
    postCode: "",
    address: "",
    street: "",
    town: "",
    country: "",
    countryCode: "",
    phoneNumber: "",
    email: "",
    uploadImage: "",
    addInterns: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const onChange = (e: RadioChangeEvent) => {
    if (e.target.value === 2) {
      setOpenModal(!openModal);
    }

    setValue(e.target.value);
  };

  console.log("formValues", formValues);
  return (
    <div className="add-location">
      {/*------------------------ Header----------------------------- */}
      <div className="flex items-center">
        <Title level={3} className="mt-2">
          Add Location{" "}
        </Title>
        <span className="mx-2">
          <SettingHorizontalLine />
        </span>
        <span className=" text-base font-medium text-secondary-color">
          Setting
        </span>
        <span className="mx-2">/</span>
        <NavLink to="/settings/location">
          <span className=" text-base font-medium text-secondary-color">
            Location
          </span>
        </NavLink>
      </div>

      <Divider className="my-1 mb-3" />
      <BoxWrapper>
        <Form layout="vertical">
          {/*------------------------ Office----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md-px-3" xs={24} md={12} xxl={8}>
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
            <Col className="gutter-row md:px-3" xs={24} md={12} xxl={8}>
              <Title className="mt-0.5" level={4}>
                Address
              </Title>
              <Paragraph>Enter address details for office location</Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
              <Form.Item
                // label="Post Code"
                name="postCode"
                rules={[{ message: "Please input your username!" }]}
              >
                {/* <SearchBar size="middle" handleChange={handleChange} /> */}
                <Input
                  className="input"
                  handleChange={handleChange}
                  id="postCode"
                  label="Post Code"
                  name="postCode"
                  placeholder="Enter Code"
                  size="small"
                  type="text"
                  value={formValues.postCode}
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
                <div className="w-full mt-1 ">
                  <span className="label">
                    Country<span className="text-[red]"></span>
                  </span>

                  <DropDown
                    name="Select"
                    options={["Pakistan", "India", "France"]}
                    setValue={handleChange}
                    value="country"
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Divider />
          {/*------------------------ Contact----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md:px-3" xs={24} md={12} xxl={8}>
              <Title className="mt-0.5" level={4}>
                Contact
              </Title>
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

                  <DropDown
                    name="+92"
                    options={[
                      '+92',
                      '+93',
                      '+94'
                    ]}
                    setValue={() => { }}
                    value=""
                  />
                </div>

                <Form.Item
                  name="street"
                  className="w-full md:pl-2"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter street!",
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
              <Form.Item name="email">
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
            <Col className="gutter-row md:px-3" xs={24} md={12} xxl={8}>
              <Title className="mt-0.5" level={4}>
                Upload Picture
              </Title>
              <Paragraph>Upload picture for your office location</Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
              <UploadDocument />
            </Col>
          </Row>
          <Divider />
          {/*------------------------ Add Interns----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md:px-3" xs={24} md={12} xxl={8}>
              <Title className="mt-0.5" level={4}>
                Add Interns
              </Title>
              <Paragraph>Select for this office location</Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
              <Radio.Group onChange={onChange} value={value}>
                <Radio value={1}>All interns</Radio>
                <Radio value={2}>Select Interns</Radio>
              </Radio.Group>
            </Col>
          </Row>
          <Space className="flex justify-end">
            <Button danger size="middle" type="primary">
              Cencal
            </Button>
            <Button
              size="middle"
              className="teriary-bg-color white-color add-button"
            >
              Add
            </Button>
          </Space>
        </Form>

        <p></p>
      </BoxWrapper>
      <SettingCommonModal
        selectArray={selectArray}
        deselectArray={deselectArray}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

export default AddLocation;