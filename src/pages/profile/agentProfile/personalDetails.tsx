import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Input, Typography, Select, AutoComplete, Button } from "antd";
import { BoxWrapper, DropDown } from '../../../components';
import { Option } from "antd/es/mentions";
import PhoneInput from 'react-phone-input-2';
import "./styles.scss";
import useAgentProfileCustomHook from './actionHandler';
import { currentUserState } from '../../../store';
import { useRecoilState } from 'recoil';


const PersonalDetails = () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  console.log(currentUser, "currentUser");

  const [FormInputVal, setFormInputVal] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
  })
  const handleInputChange = (e: any,) => {
    setFormInputVal({ ...FormInputVal, [e.target.name]: e.target.value });
  };
  const [data, setData] = useState(null);
  console.log(data, "data");

  const onFinish = (values: any) => {
    console.log("values", values);
    agentProfileData(currentUser.id, values)
  };

  const initialValues = {
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    Email: currentUser.email,
    phoneNumber: currentUser.phoneNumber,
    gender: currentUser.gender,
    address: currentUser.address,
  }

  const { agentProfileData } = useAgentProfileCustomHook();

  return (
    <BoxWrapper className='h-[70vh] personal-profile-form'>
      <Form
        name="basic"
        layout="vertical"
        initialValues={initialValues}
        autoComplete="off"
        onFinish={onFinish}
      >
        <div>
          <Typography className="title text-xl font-semibold pb-7">Personal Details</Typography>
        </div>
        <Row gutter={20}>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="First Name"
              name="firstName"
              // rules={[{ required: true }, { type: "string" }]}

              className="text-success-placeholder-color"
            >
              <Input disabled placeholder="Enter First Name" value="azeem" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Last Name"
              name="lastName"
            // rules={[{ required: true }, { type: "string" }]}
            >
              <Input disabled placeholder="Enter Last Name" value="aslam" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Email"
              name="Email"
            // rules={[{ required: true }, { type: "string" }]}
            >
              <Input disabled type='email' placeholder="Email" value="azeem.aslam@orcalo.com" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            {/* <Form.Item
              name="phone"
              label="Phone Number"
              rules={[{ required: true }, { type: "string" }]}
            >
              <Input.Group compact>
                <Select defaultValue="+92" style={{ width: '25%' }}>
                  <Option value="+44">+44</Option>
                  <Option value="+92">+92</Option>
                </Select>
                <AutoComplete
                  style={{ width: '75%' }}
                  placeholder="xxxxxxx-xxx"
                />
              </Input.Group>
            </Form.Item> */}
            <Form.Item
              label="Phone Number"
              name='phoneNumber'
            // rules={[
            //   { required: true, message: "Please input your phoneNumber!" },
            // ]}
            >
              <PhoneInput
                containerClass="phone-input"
                country={"pk"}
                value={FormInputVal.phone}
                onChange={(Phone: any) => setFormInputVal(Phone)}
              />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Gender"
              name="gender"
            >
              <Select
                options={[
                  { value: 'MALE', label: 'Male' },
                  { value: 'FEMALE', label: 'Female' },
                  { value: 'OTHERS', label: 'Other' },
                ]}
              >

              </Select>
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Residential Address"
              name="address"
            // rules={[{ required: true }, { type: "string" }]}
            >
              <Input disabled type='address' placeholder="263 Eversholt st" className="input-style" />
            </Form.Item>

          </Col>
          <Col lg={24} className='flex justify-end items-end'>
            <Button htmlType='submit' className='add-btn green-graph-tooltip-bg text-white'>Add</Button>
          </Col>
        </Row>
      </Form>
    </BoxWrapper>
  )
}

export default PersonalDetails                                              