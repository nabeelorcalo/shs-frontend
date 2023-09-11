import React, { useState } from 'react'
import { ButtonThemePrimary, ButtonThemeSecondary, CommonDatePicker } from '../../../../../components'
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
import { PlusOutlined, PlusCircleFilled, DeleteFilled, CaretDownOutlined, CalendarOutlined } from '@ant-design/icons';
import { Option } from "antd/es/mentions";
import CountryCodeSelect from '../../../../../components/CountryCodeSelect';
import TextArea from "antd/es/input/TextArea";
import UserSelector from '../../../../../components/UserSelector';
import { useRecoilState, useRecoilValue } from 'recoil';
import { newCountryListState, postalCodeState } from '../../../../../store/CountryList';
import '../../../style.scss';
import { currentUserState } from '../../../../../store';
import { RangePickerProps } from "antd/es/date-picker";
import useCustomHook from '../../../actionHandler';
import dayjs from 'dayjs';
import '../../style.scss'
import type { DatePickerProps } from 'antd';
import { PhoneInput } from 'react-international-phone';
import { disabledDate } from '../../../../../helpers';
import { IconDatePicker } from '../../../../../assets/images';
import { useNavigate } from 'react-router-dom';
import usePhoneNumberHook from "../../../../../helpers/phoneNumber";
import countryCustomHook from '../../../../../helpers/countriesList';

const personalInformation = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [countryList, setCountryList] = useState('');
  const action = useCustomHook();
  const { getCountriesList } = countryCustomHook()
  const { PhoneValidator, countryFlagCode, extractCountryCode, extractPhoneNumber } = usePhoneNumberHook();
  const [userState, setUserState] = useRecoilState(currentUserState)
  const countries = useRecoilValue(newCountryListState);
  const postalCodes = useRecoilValue<any>(postalCodeState);
  const [form] = Form.useForm();
  const flag = countryFlagCode();
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

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };;

  form.setFieldsValue({
    firstName,
    lastName,
    gender,
    phoneCode,
    phoneNumber : phoneCode + phoneNumber,
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
    const phoneCode = extractCountryCode(phone);
    const phoneNumber = extractPhoneNumber(phone);

    action.updateCompanyPersonal({
      firstName: values.firstName,
      lastName: values.lastName,
      gender: values.gender,
      phoneCode: phoneCode,
      phoneNumber: phoneNumber,
      postCode: values.postCode,
      DOB: values.DOB,
      address: values.address,
      town: values.city,
      street: values.street,
      country: values.country,
      city: values.city,
    })
    setUserState({ ...userState, ...values, phoneCode, phoneNumber })
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
              <DatePicker
                onChange={onChange}
                disabledDate={disabledDate}
                suffixIcon={<IconDatePicker />}
                clearIcon={false}
              />
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
          <Col xxl={8} xl={8} lg={12} md={24} xs={24}>
                  <Form.Item
                    name="phoneNumber"
                    label="Phone Number"
                    className={phone ? 'phone-input' : 'phone-input-error'}
                    rules={[
                      {
                        validator: (_, value) => PhoneValidator(phone, value)
                      }
                    ]}
                  >
                    <PhoneInput
                      value={phone}
                      className="w-full"
                      defaultCountry={`${flag[phoneCode]}`}
                      // placeholder="+92 312-9966188"
                      disableDialCodePrefill
                      onChange={(phone: string, country: any) => { setPhone(phone) }}
                    />
                  </Form.Item>
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
              rules={[
                {
                  validator: (_, value) => {
                    const regex = new RegExp(postalCodes[countryList]);
                    if (value === '') {
                      return Promise.reject('Required Field');
                    }

                    if (regex.test(value)) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject('Invalid postal code');
                    }
                  }
                }
              ]}
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
              <Select
                showSearch
                options={countries}
                placeholder={"Select Country"}
                onChange={(val: any) => setCountryList(val)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <div className="flex justify-center md:justify-end">
            <Space>
              <ButtonThemeSecondary
                onClick={() => 
                navigate('/')
              }
              >
                Cancel
              </ButtonThemeSecondary>
              <ButtonThemePrimary
                htmlType="submit"
              >
                Save
              </ButtonThemePrimary>
            </Space>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}

export default personalInformation