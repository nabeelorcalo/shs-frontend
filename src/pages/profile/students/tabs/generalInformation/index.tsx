import {
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
import { Option } from "antd/es/mentions";
import React, { useState } from 'react'
import { CommonDatePicker, DropDown } from "../../../../../components";
import '../Tabs.scss';

const GeneralInformation = () => {
    const [value, setValue] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const onFinish = (values: any) => {
        console.log("Success:", values);
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
          <Select style={{ width: 70 }}>
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
          </Select>
        </Form.Item>
      );
  return (
      <div className='general-information'>
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
              label="University"
              name="univerisity"
              rules={[
                { required: true, message: "Please input your University!" },
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
              label="Course"
              name="course"
              rules={[
                { required: true, message: "Please input your Course!" },
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
              label="University Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
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
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please input your Address!" },
              ]}
            >
              <Input />
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
              <Input />
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
              label="University Contact Name"
              name="ucn"
              rules={[
                { required: true, message: "Please input your University Contact Name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="University Phone Number"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Graduate Year"
              name="graduateyear"
              rules={[
                { required: true, message: "Please input your Graduate Year!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Internship Start Date"
              name="startDate"
              rules={[
                { required: true, message: "Please input your Internship Start Date!" },
              ]}
            >
              <CommonDatePicker/>
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Internship End Date"
              name="endDate"
              rules={[
                { required: true, message: "Please input your Internship End Date!" },
              ]}
            >
              <CommonDatePicker/>
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Internship Duration"
              name="duration"
              rules={[
                { required: true, message: "Please input your Internship Duration!" },
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
              label="Have you ever worked in any orgnization?"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
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
              label="Company Name"
              name="companyName"
              rules={[
                { required: true, message: "Please input your Company Name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
              <Divider />
              <div>
          <Typography className="title">Emergency Contact</Typography>
              </div>
              <Row gutter={20}>
              <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
          <Form.Item
              label="Phone Number"
              name="phonenumber"
              rules={[
                { required: true, message: "Please input your Phone Number!" },
              ]}
            >
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Relationship"
              name="relationship"
              rules={[
                { required: true, message: "Please input your Relationship!" },
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
              label="Post Code"
              name="postCode"
              rules={[
                { required: true, message: "Please input your Post Code!" },
              ]}
            >
           <DropDown
                        name='drop down with search bar'
                        value={value}
                        options={['search', 'item 1','item 2']}
                        setValue={setValue}
                        requireSearchBar
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                    />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please input your Address!" },
              ]}
            >
              <Input />
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
              <Input />
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
              <Input />
            </Form.Item>
          </Col>
              </Row>
              <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default GeneralInformation