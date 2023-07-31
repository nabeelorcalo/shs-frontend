import React, { useState } from 'react'
import { CommonDatePicker } from '../../../../../components'
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { DEFAULT_VALIDATIONS_MESSAGES } from '../../../../../config/validationMessages';
import { PlusOutlined, PlusCircleFilled, DeleteFilled, CaretDownOutlined } from '@ant-design/icons';
import { Option } from "antd/es/mentions";
import CountryCodeSelect from '../../../../../components/CountryCodeSelect';
import TextArea from "antd/es/input/TextArea";
import UserSelector from '../../../../../components/UserSelector';
import { useRecoilState, useRecoilValue } from 'recoil';
import { newCountryListState } from '../../../../../store/CountryList';
import '../../../style.scss';
import { currentUserState } from '../../../../../store';
import { RangePickerProps } from "antd/es/date-picker";
import useCustomHook from '../../../actionHandler';
import dayjs from 'dayjs';
import '../../style.scss'
import type { DatePickerProps } from 'antd';

const personalInformation = () => {
  const [form] = Form.useForm();
  const action = useCustomHook();
  const [open, setOpen] = useState(false);
  const [valueDate, setValueDate] = useState();
  console.log(valueDate,'VALUE DATE')
  const [userState, setUserState] = useRecoilState(currentUserState)
  const countries = useRecoilValue(newCountryListState);

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };;

  const { firstName,
    lastName,
    gender,
    email,
    phoneCode,
    phoneNumber,
    DOB,
    country,
    city,
    street,
    postCode,
    address,
    town
  } = useRecoilValue(currentUserState)

  form.setFieldsValue({
    firstName,
    lastName,
    gender,
    phoneCode,
    phoneNumber,
    postCode,
    email,
    DOB: DOB ? dayjs(DOB) : null,
    address,
    town,
    street,
    country,
    city,
  });

  const onFinish = (values: any) => {
    action.updateCompanyPersonal({
      firstName: values.firstName,
      lastName: values.lastName,
      gender: values.gender,
      phoneCode: values.phoneCode,
      phoneNumber: values.phoneNumber,
      postCode: values.postCode,
      DOB: values.DOB,
      address: values.address,
      town: values.city,
      street: values.street,
      country: values.country,
      city: values.city,
    })
    setUserState({ ...userState, ...values })
  }

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="personal-information">
      <Form
        name="basic"
        layout="vertical"
        validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <div>
          <Typography className="title">Personal Details</Typography>
        </div>
        <Row gutter={20}>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input placeholder='Enter first name' className="input-style" disabled />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input placeholder='Enter last name' className="input-style" disabled />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Select placeholder='Select' onChange={handleChange} >
                <Option value="MALE">Male</Option>
                <Option value="FEMALE">Female</Option>
                <Option value="OTHERS">other</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
             <Form.Item
              label="Date of Birth"
              name='DOB'
              rules={[{ required: false }]}
            >
             <DatePicker onChange={onChange} />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: false }, { type: "email" }]}
            >
              <Input placeholder="Enter your Email" className="input-style" disabled />
            </Form.Item>
          </Col>
          <Col  className="p-0">
            <div className="flex items-center gap-x-2 flex-wrap sm:flex-nowrap">
              <Form.Item name='phoneCode' label='Phone Code'>
                <CountryCodeSelect />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                label="Phone Number"
                rules={[
                  { required: false },
                  {
                    pattern: /^[\d\s()-]+$/,
                    message: "Please enter valid phone number",
                  },
                  {
                    min: 6,
                    message: "Please enter a valid phone number with a minimum of 6 digits",
                  },
                ]}
              >
                <Input placeholder="Enter Phone Number" className="input-style w-[full]" />
              </Form.Item>
            </div>
          </Col>
        </Row>
        <Divider />
        <div>
          <Typography className="title">Address</Typography>
        </div>
        <Row gutter={20}>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Post Code"
              name="postCode"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input placeholder="Enter PostCode" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input placeholder="Enter address line" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Street"
              name="street"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input placeholder="Enter Street or location" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Town"
              name="city"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input placeholder="Enter Town" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Country"
              name="country"
              rules={[{ required: false }, { type: "string" }]}>
              <UserSelector
                hasSearch
                options={countries}
                placeholder="Select Country"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <div className="flex justify-center md:justify-end">
            <Space>
              <Button className="border-1 border-[#4A9D77] teriary-color font-semibold">
                Cancel
              </Button>
              <Button
                className="teriary-bg-color white-color border-0 border-[#4a9d77] 
                ml-2 pt-0 pb-0 pl-5 pr-5"
                htmlType="submit"
              >
                Save
              </Button>
            </Space>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}

export default personalInformation