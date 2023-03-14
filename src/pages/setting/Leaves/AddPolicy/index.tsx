import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { SettingHorizontalLine } from "../../../../assets/images";
import { BoxWrapper } from "../../../../components/BoxWrapper/BoxWrapper";
import './style.scss'
// import { Input, SearchBar } from "../../../../components";
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
  Input,
  Switch
} from "antd";
import { CommonDatePicker, SearchBar } from "../../../../components";
const { TextArea } = Input;
const { Title, Paragraph } = Typography;
const LeavesAddPolicy = () => {
  const [value, setValue] = useState(1);
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
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <div className="leaves-add-policy">
      <BoxWrapper>
        <div className="flex ">
          <Title level={3}>Add Policy </Title>
          <span className="mx-2">
            <SettingHorizontalLine />
          </span>
          <Title className="mt-0.5" level={4}>
            Setting
          </Title>
          <span className="mx-2 mt-2">/</span>
          <NavLink to="/settings/leaves">
            {" "}
            <Title className="mt-0.5" level={4}>
              Leaves
            </Title>
          </NavLink>
        </div>
      </BoxWrapper>
      <Divider className="mb-0 " />

      <BoxWrapper>
        <Form layout="vertical">
          {/*------------------------ Policy Details----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md-px-3" xs={24} md={12} xxl={8}>
              <Title className="mt-0.5" level={4}>
                Policy Details
              </Title>
              <Paragraph>Enter policy details for time-off</Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
              <Form.Item
                name="policyName"
                label="Policy Name"
                rules={[{ message: "Please Enter your username!" }]}
              >
                <Input placeholder="Basic usage" />
              </Form.Item>
              <div className="mt-3 flex flex-col">
                <label>Description (optional)</label>
                <TextArea
                  rows={6}
                  placeholder="Write Something..."
                  maxLength={6}
                />
              </div>
            </Col>
          </Row>
          <Divider />
          {/*------------------------ Policy Accrual----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md:px-3" xs={24} md={12} xxl={8}>
              <Title className="mt-0.5" level={4}>
                Policy Accrual
              </Title>
              <Paragraph>Define the occrual period of your policy</Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
              <p>Assigned Date</p>
              <Select
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
                    label: "Joining Date",
                  },
                ]}
              />
              <div className="my-3">
                <p>Accrual Frequency</p>
                <Select
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
                      label: "Monthly",
                    },
                    {
                      value: "2",
                      label: "Yearly",
                    },
                  ]}
                />
              </div>

              <Form.Item
                name="policyName"
                label="Entitlement"
                rules={[{ message: "Please Enter your username!" }]}
              >
                <Input placeholder="Basic usage" type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          {/*------------------------ Carry Forward----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md:px-3" xs={24} md={12} xxl={8}>
              <Title className="mt-0.5" level={4}>
                Carry Forward
              </Title>
              <Paragraph>
                Define the carry farward days for your policy
              </Paragraph>
            </Col>
            <Col className="gutter-row " xs={24} md={12} xxl={8}>
              <div className="my-3">
                <p>Maximum Carry Forward (Days Per Year)</p>
                <Select
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
                      label: "1",
                    },
                    {
                      value: "2",
                      label: "2",
                    },
                    {
                      value: "3",
                      label: "3",
                    },
                    {
                      value: "4",
                      label: "4",
                    },
                  ]}
                />
              </div>
              <div>
                <p>Carry Forward Expiration</p>

                <CommonDatePicker
                  onBtnClick={() => {}}
                 
                  setOpen={function noRefCheck() {}}
                  setValue={function noRefCheck() {}}
                />
              </div>
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
              <div className="my-3">
              <Switch />
              </div>
              
            </Col>
          </Row>
          <Space className="flex justify-end">
          <Button danger size="middle" type="primary">
            Cencal
          </Button>
          <Button size="middle"  className="teriary-bg-color white-color add-button">
            Add
          </Button>
        </Space>
        </Form>
      </BoxWrapper>
    </div>
  );
};

export default LeavesAddPolicy;
