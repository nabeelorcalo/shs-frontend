import { useState } from "react";
import { AutoComplete, Button, Col, Divider, Form,  Input, Row,  Select, Space ,Typography} from "antd";
import { Option } from "antd/es/mentions";
import { CommonDatePicker, DropDown } from "../../../../../components";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";
import "../../../style.scss";

const GeneralInformation = () => {
  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  // const prefixSelector = (
  //   <Form.Item name="prefix" noStyle>
  //     <Select style={{ width: 70 }}>
  //       <Option value="86">+86</Option>
  //       <Option value="87">+87</Option>
  //     </Select>
  //   </Form.Item>
  // );
  return (
    <div className="general-information">
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
        onFinish={onFinish}
        autoComplete="off"
      >
        <div>
          <Typography className="title">Personal Details</Typography>
        </div>
        <Row gutter={20}>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="University"
              name="univerisity"
              rules={[{ required: true }, { type: "string" }]}
            >
              <DropDown
                name="Select"
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
              label="Course"
              name="course"
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
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="University Email"
              name="email"
              rules={[{ required: true }, { type: "email" }]}
            >
              <Input placeholder="Enter Email" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Post Code"
              name="postcode"
              rules={[{ required: true }, { type: "string" }]}
            >
              <DropDown
                name="Select"
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
              <Input placeholder="Enter Address" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true }, { type: "string" }]}
            >
              <Input placeholder="Enter City" className="input-style" />
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
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="University Contact Name"
              name="ucn"
              rules={[{ required: true }, { type: "string" }]}
            >
              <Input
                placeholder="Enter Contact Number"
                className="input-style"
              />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[{ required: true }, { type: "string" }]}
            >
              <Input.Group compact>
                <Select defaultValue="+92"  style={{ width: "25%" }} >
                  <Option value="+44">+44</Option>
                  <Option value="+92">+92</Option>
                </Select>
                <AutoComplete  style={{ width: "75%" }}
                  placeholder="xxxxxxx-xxx"
                  options={[{ value: "text 1" }, { value: "text 2" }]}
                />
              </Input.Group>
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Graduate Year"
              name="graduateyear"
              rules={[{ required: true }, { type: "string" }]}
            >
              <Input
                placeholder="Enter Graduation Year"
                className="input-style"
              />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Internship Start Date"
              name="startDate"
              rules={[{ required: true }, { type: "date" }]}
            >
              <CommonDatePicker />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Internship End Date"
              name="endDate"
              rules={[{ required: true }, { type: "date" }]}
            >
              <CommonDatePicker />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
            <Form.Item
              label="Internship Duration"
              name="duration"
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
          <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
            <Form.Item
              label="Have you ever worked in any orgnization?"
              name="username"
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
          <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
            <Form.Item
              label="Company Name"
              name="companyName"
              rules={[{ required: true }, { type: "string" }]}
            >
              <Input placeholder="Enter Company Name" className="input-style" />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <div>
          <Typography className="title">Emergency Contact</Typography>
        </div>
        <Row gutter={20}>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true }, { type: "string" }]}
            >
              <Input placeholder="Enter Name" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[{ required: true }, { type: "string" }]}
              
            >
              <Input.Group compact>
                <Select  defaultValue="+92" style={{ width: "25%" }} >
                  <Option value="+44">+44</Option>
                  <Option value="+92">+92</Option>
                </Select>
                <AutoComplete  style={{ width: "75%" }}
                  placeholder="xxxxxxx-xxx"
                  options={[{ value: "text 1" }, { value: "text 2" }]}
                />
              </Input.Group>
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Relationship"
              name="relationship"
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
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Post Code"
              name="postCode"
              rules={[{ required: true }, { type: "string" }]}
            >
              <DropDown
                name="Select"
                value={value}
                options={["search", "item 1", "item 2"]}
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
              <Input placeholder="Enter Address" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true }, { type: "string" }]}
            >
              <Input placeholder="Enter City" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Country"
              name="country"
              rules={[{ required: true }, { type: "string" }]}
            >
              <Input placeholder="Enter Country" className="input-style" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <div className="flex justify-center sm:justify-end">
            <Space>
              <Button className="border-1 border-[#4A9D77] teriary-color font-semibold">
                Cancel
              </Button>
              <Button
                className="teriary-bg-color white-color border-0 border-[#4a9d77] ml-2 pt-0 pb-0 pl-5 pr-5"
                htmlType="submit"
              >
                Submit
              </Button>
            </Space>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default GeneralInformation;
