import React, { useState } from "react";
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
  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [FormInputVal, setFormInputVal] = useState("");

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  const handleInputChange = (e: any, type: string) => {

    setFormInputVal(e.target.value);

  };
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
            autoComplete="off"
          >
            <div className="p-4">
              <Typography className="main-label font-semibold text-xl text-primary-title-color mb-3">Basic Information</Typography>
              <Row gutter={[15, 15]}>
                <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                  <Form.Item
                    label="University Name"
                    name="univeristyName"
                    rules={[{ required: true }, { type: "string" }]}
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
                    rules={[{ required: true }, { type: "email" }]}
                  >
                    <Input placeholder="Enter email" className="input-style" />
                  </Form.Item>
                </Col>
                <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                  <Form.Item
                    label="Phone Number"
                    name="phoneNumber"
                    rules={[{ required: true }, { type: "string" }]}
                  >
                    <PhoneInput
                      containerClass="phone-input"
                      country={"pk"}
                      value={FormInputVal}
                      onChange={(Phone: any) => setFormInputVal(Phone)}
                    />
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
                    rules={[{ required: true }, { type: "string" }]}
                  >
                    <DropDown
                      name="Post Code"
                      value={value}
                      options={["search", "item 1"]}
                      setValue={setValue}
                      requireSearchBar
                      searchValue={searchValue}
                      setSearchValue={setSearchValue}
                    />
                  </Form.Item>
                </Col>
                <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                  <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true }, { type: "string" }]}
                  >
                    <Input placeholder="Enter address" className="input-style" />
                  </Form.Item>
                </Col>
                <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                  <Form.Item
                    label="City"
                    name="city"
                    rules={[{ required: true }, { type: "string" }]}
                  >
                    <Input placeholder="Enter city" className="input-style" />
                  </Form.Item>
                </Col>
                <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                  <Form.Item
                    label="Country"
                    name="country"
                    rules={[{ required: true }, { type: "string" }]}
                  >
                    <DropDown
                      name="Select"
                      value={value}
                      options={["item 1", "item 2", "item 3"]}
                      setValue={setValue}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <Typography className=" font-semibold text-xl text-primary-title-color mb-3">About University</Typography>
              <Row>
                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true }, { type: "string" }]}
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
                  <Button className="btn-cancle ">Cancel</Button>
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
