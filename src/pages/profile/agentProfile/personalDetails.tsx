import { useState } from 'react';
import { Form, Row, Col, Input, Typography, Select, Button } from "antd";
import { BoxWrapper } from '../../../components';
import PhoneInput from 'react-phone-input-2';
import "./styles.scss";
import useAgentProfileCustomHook from './actionHandler';
import { currentUserState } from '../../../store';
import { useRecoilState } from 'recoil';


const PersonalDetails = () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  const [FormInputVal, setFormInputVal] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
  })
  const onFinish = (values: any) => {
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

              className="text-success-placeholder-color"
            >
              <Input disabled placeholder="Enter First Name" value="azeem" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Last Name"
              name="lastName"
            >
              <Input disabled placeholder="Enter Last Name" value="aslam" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Email"
              name="Email"
            >
              <Input disabled type='email' placeholder="Email" value="azeem.aslam@orcalo.com" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Phone Number"
              name='phoneNumber'
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