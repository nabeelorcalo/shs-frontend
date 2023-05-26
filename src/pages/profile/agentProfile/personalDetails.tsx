import React, { useState } from 'react'
import { Form, Row, Col, Input, Typography, Select, AutoComplete } from "antd";
import { BoxWrapper, DropDown } from '../../../components';
import { Option } from "antd/es/mentions";

const PersonalDetails = () => {
  return (
    <BoxWrapper className='h-[70vh]'>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <div>
          <Typography className="title text-xl font-semibold pb-7">Personal Details</Typography>
        </div>
        <Row gutter={20}>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true }, { type: "string" }]}
              className="text-success-placeholder-color"
            >
              <Input disabled placeholder="Enter First Name" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true }, { type: "string" }]}
            >
              <Input disabled placeholder="Enter Last Name" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Email"
              name="Email"
              rules={[{ required: true }, { type: "string" }]}
            >
              <Input disabled type='email' placeholder="Email" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
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
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true }, { type: "string" }]}
            >
              <DropDown
                name='Select'
                options={['Male', 'Female', 'Others']}
              />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Residential Address"
              name="Residential Address"
              rules={[{ required: true }, { type: "string" }]}
            >
              <Input disabled type='address' placeholder="263 Eversholt st" className="input-style" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </BoxWrapper>


  )
}

export default PersonalDetails                                              