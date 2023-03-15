import React, { useState } from "react";
import {
  AutoComplete,
  Button,
  Col,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Typography,
} from "antd";
import "../Tabs.scss";

import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import { CommonDatePicker, DropDown } from "../../../../../components";
import { CalendarIcon } from "../../../../../assets/images";
import { Option } from "antd/es/mentions";

const PersonalInformation = () => {
  const [value, setValue] = useState('');
  const [isdate1, setIsDate1] = useState(false);

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70,height:"48px" }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const [isDependents, setIsDependents] = React.useState(2);
  const [dependents, setDependents] = React.useState<any>([]);
  const [searchValue, setSearchValue] = useState('');

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="personal-information">
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div>
          <Typography className="title">Personal Details</Typography>
        </div>
        <Row gutter={20}>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                { required: true, message: "Please input your First Name!" },
              ]}
            >
              <Input placeholder="Enter First Name" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                { required: true, message: "Please input your Last Name!" },
              ]}
            >
              <Input className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[
                { required: true, message: "Please input your gender!" },
              ]}
            >
              <DropDown
                 name='simple drop down'
                 value={value}
                 options={['item 1', 'item 2', 'item 3']}
                setValue={setValue}
              />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Place Of Birth"
              name="pob"
              rules={[
                { required: true, message: "Please input your POB!" },
              ]}
            >
              <Input className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
          <Form.Item
              label="Nationality"
              name="nationality"
              rules={[
                { required: true, message: "Please input your Nationality!" },
              ]}
            >
              <DropDown
                 name='simple drop down'
                 value={value}
                 options={['item 1', 'item 2', 'item 3']}
                setValue={setValue}
              />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Date of Birth"
              name="dob"
              rules={[
                { required: true, message: "Please input your dob!" },
              ]}
            >
              <CommonDatePicker
                 requireAsButton
                 btnIcon={CalendarIcon}
                 btnClassName={'h-[48px]'}
                 placement="bottomLeft"
                 open={isdate1}
                 setOpen={setIsDate1}
                 setValue={setValue}/>
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Personal Email"
              name="email"
              rules={[
                { required: true, message: "Please input your Email!" },
              ]}
            >
              <Input className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
          <Form.Item
        name="phone"
        label="Phone Number"
              rules={[{ required: true, message: 'Please input your phone number!' }]}
              
            >
               <Input.Group compact>
      <Select size="large" defaultValue="+92" style={{ width: '25%' }}>
        <Option value="+44">+44</Option>
        <Option value="+92">+92</Option>
      </Select>
                <AutoComplete
                  size='large'
        style={{ width: '75%' }}
        placeholder="xxxxxxx-xxx"
        options={[{ value: 'text 1' }, { value: 'text 2' }]}
      />
    </Input.Group>

      </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="National Ensurance Number"
              name="nen"
              rules={[
                { required: true, message: "Please input your National Ensurace Number!" },
              ]}
            >
              <Input placeholder="Enter Here" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Visa Status"
              name="visastatus"
              rules={[
                { required: true, message: "Please input your Visa Status!" },
              ]}
            >
             <DropDown
                 name='simple drop down'
                 value={value}
                 options={['item 1', 'item 2', 'item 3']}
                setValue={setValue}
              />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Delegate Refrence Number"
              name="drn"
              rules={[
                { required: true, message: "Please input your Delegate Refrence Number!" },
              ]}
            >
              <Input className="input-style" />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <div>
          <Typography className="title">About Me</Typography>
        </div>
        <Row>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please input your Description!" },
              ]}
            >
              <TextArea rows={4} placeholder="Write about yourself" maxLength={6} className="text-area" />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <div>
          <Typography className="title">Address</Typography>
        </div>
        <Row gutter={20}>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Post Code"
              name="postcode"
              rules={[
                { required: true, message: "Please input your Post Code!" },
              ]}
            >
             <DropDown
                        name='drop down with search bar'
                        value={value}
                        options={['search', 'item 1']}
                        setValue={setValue}
                        requireSearchBar
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                    />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="House No"
              name="houseno"
              rules={[
                { required: true, message: "Please input your House No!" },
              ]}
            >
              <Input className="input-style"/>
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Street"
              name="street"
              rules={[
                { required: true, message: "Please input your Street!" },
              ]}
            >
              <Input className="input-style"/>
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Country"
              name="country"
              rules={[
                { required: true, message: "Please input your Country!" },
              ]}
            >
               <DropDown
                 name='simple drop down'
                 value={value}
                 options={['item 1', 'item 2', 'item 3']}
                setValue={setValue}
              />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="City"
              name="city"
              rules={[
                { required: true, message: "Please input your City!" },
              ]}
            >
              <Input className="input-style"/>
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <div>
          <Typography className="title">Others</Typography>
        </div>
        <Row>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              label="Hobbies"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Button
                style={{
                  background: "#e6f4f9",
                  border: "none",
                  borderRadius: "14.5PX",
                }}
              >
                <PlusOutlined /> Add
              </Button>
            </Form.Item>
          </Col>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              label="Allergies"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Button
                style={{
                  background: "#e6f4f9",
                  border: "none",
                  borderRadius: "14.5PX",
                }}
              >
                <PlusOutlined /> Add
              </Button>
            </Form.Item>
          </Col>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              label="Medical Condition"
              name="medicalcondition"
              rules={[
                { required: true, message: "Please input your Medical Condition!" },
              ]}
            >
              <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} className="text-area"/>
            </Form.Item>
          </Col>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              label="Do you have Dependies"
              // name="username"
              //   rules={[
              //     { required: true, message: "Please input your username!" },
              //   ]}
            >
              <Radio.Group
                name="radiogroup"
                defaultValue={2}
                onChange={(e) => {
                  setIsDependents(e.target.value);
                }}
              >
                <Radio value={1}>Yes</Radio>
                <Radio value={2}>No</Radio>
              </Radio.Group>
            </Form.Item>

            {isDependents === 1 && (
              <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <div className="flex gap-4">
                    <Input />{" "}
                    <div
                      onClick={() => {
                        const copyDependents = [...dependents];
                        copyDependents.push({ label: "", name: "" });
                        setDependents(copyDependents);
                      }}
                    >
                      add
                    </div>{" "}
                  </div>

                  {dependents.map((item: any, index: any) => (
                    <div className="flex gap-4">
                      <Input />
                      <div
                        onClick={() => {
                          const copyDependents = [...dependents];
                          copyDependents.splice(index+1, 1);
                          setDependents(copyDependents);
                        }}
                      >
                        {" "}
                        remove
                      </div>
                    </div>
                  ))}
                </Form.Item>
              </Col>
            )}
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PersonalInformation;