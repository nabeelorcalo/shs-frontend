import { useState } from 'react';
import { Form, Row, Col, Input, Typography, Select, Button } from "antd";
import { BoxWrapper } from '../../../components';
import PhoneInput from 'react-phone-input-2';
import "./styles.scss";
import useAgentProfileCustomHook from './actionHandler';
import { currentUserState } from '../../../store';
import { useRecoilState, useRecoilValue } from 'recoil';
import CountryCodeSelect from '../../../components/CountryCodeSelect';


const PersonalDetails = () => {

  const [form] = Form.useForm();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const {
    firstName,
    lastName,
    gender,
    email,
    phoneNumber,
    address,
    phoneCode

  } = useRecoilValue(currentUserState)
  const [flagCode, setFlagCode] = useState<any>(phoneCode);

  form.setFieldsValue({
    firstName,
    lastName,
    gender,
    phoneNumber,
    email,
    address,
  });
  const onFinish = (values: any) => {
    agentProfileData(currentUser.id, {
      gender: values.gender,
      phoneCode: flagCode,
      phoneNumber: values.phoneNumber,
    })
    setCurrentUser({ ...currentUser, ...values })

  }

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
    <BoxWrapper className='min-h-[70vh] h-auto personal-profile-form'>
      <Form
        name="basic"
        layout="vertical"
        form={form}
        autoComplete="off"
        onFinish={onFinish}
      >
        <div>
          <Typography className="title text-xl font-semibold pb-7">Personal Details</Typography>
        </div>
        <Row gutter={20}>
          <Col xl={8} md={12} xs={24}>
            <Form.Item
              label="First Name"
              name="firstName"

              className="text-success-placeholder-color"
            >
              <Input disabled placeholder="Enter First Name" className="input-style" />
            </Form.Item>
          </Col>
          <Col xl={8} md={12} xs={24}>
            <Form.Item
              label="Last Name"
              name="lastName"
            >
              <Input disabled placeholder="Enter Last Name" className="input-style" />
            </Form.Item>
          </Col>
          <Col xl={8} md={12} xs={24}>
            <Form.Item
              label="Email"
              name="Email"
            >
              <Input disabled type='email' placeholder="Email" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xs={24} className="p-0">

            <div className="flex items-center flex-wrap sm:flex-nowrap gap-x-2">
              {flagCode ?
                <Form.Item label='Phone Code' key={1}>
                  <CountryCodeSelect
                    onChange={(e: any) => setFlagCode(e)}
                    defaultVal={flagCode}
                  />
                </Form.Item>
                :
                <Form.Item label='Phone Code' key={2}>
                  <CountryCodeSelect
                    onChange={(e: any) => setFlagCode(e)}
                  />
                </Form.Item>
              }
              <Form.Item
              className='w-full'
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
          <Col xl={8} md={12} xs={24}>
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
          <Col xl={8} md={12} xs={24}>
            <Form.Item
              label="Residential Address"
              name="address"
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