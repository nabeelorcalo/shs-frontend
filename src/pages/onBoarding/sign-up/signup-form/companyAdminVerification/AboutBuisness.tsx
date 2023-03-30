import React, { useState } from 'react'
import { Col, Row, Typography, Form,Input,Button } from 'antd';
import { BackButton, SHSLogo } from '../../../../../assets/images';
import { CommonDatePicker, DropDown } from '../../../../../components';
import '../../../styles.scss';


const AboutBuisness = (props:any) => {
  const [value, setValue] = useState<string>();
  const { currentStep, setCurrentStep } = props;
  return (
      <div className='about-buisness'>
          <Row className='about-buisness-style'>
              <Col xxl={8} xl={8} lg={14} md={18} sm={24} xs={24}>
              <div className="logo-wrapper">
            <SHSLogo />
                  </div>
                  <div className='form-inner-wrapper'>
                  <div className="main-title-wrapper">
              <Typography className="steps">Step 1 of 3</Typography>
              <div className="flex items-center mt-3 mb-3">
                <div>
                  <BackButton
                  />
                </div>
                <div className="mx-auto">
                  <Typography.Title level={3}>
                  Tell us about your Business
                  </Typography.Title>
                </div>
              </div>
                      </div>
                      <div className='secondary-form-wrapper'>
                      <Form.Item
                label="University"
                name="UniversityDocument"
                rules={[
                  {
                    required: true,
                    message: "Please University Valid Document!",
                  },
                ]}
                style={{ width: "100%", marginBottom: "20px" }}
              >
                <DropDown
                  name="Select"
                  value={value}
                  options={["item 1"]}
                  setValue={setValue}
                  requireSearchBar
                //   searchValue={searchValue}
                //   setSearchValue={setSearchValue}
                />
              </Form.Item>
                      <Form.Item
                label="Buisness Sector"
                name="buisnessSector"
                rules={[
                  {
                    required: true,
                    message: "Please University Valid Document!",
                  },
                ]}
                style={{ width: "100%", marginBottom: "20px" }}
              >
                <DropDown
                  name="Select"
                  value={value}
                  options={["item 1"]}
                  setValue={setValue}
                  requireSearchBar
                //   searchValue={searchValue}
                //   setSearchValue={setSearchValue}
                />
              </Form.Item>
              <Form.Item 
                label='Legal Business Name'
                name='legalBuisnessName'
              >
                <Input placeholder='Enter Legal Buisness Name' className='text-input-bg-color'/>
              </Form.Item>
              <Form.Item 
                label='Company Registration Number'
                name='companyRegistrationNumbers'
              >
                <Input placeholder='Enter company registration number' className='text-input-bg-color'/>
              </Form.Item>
              <Row gutter={10}>
                <Col xxl={12} xl={12} lg={10} md={12} sm={12} xs={12}>
                <Form.Item
                label="Country of Incorporation"
                name="UniversityDocument"
                rules={[
                  {
                    required: true,
                    message: "Please University Valid Document!",
                  },
                ]}
                style={{ width: "100%", marginBottom: "20px" }}
              >
                <DropDown
                  name="Select"
                  value={value}
                  options={["item 1"]}
                  setValue={setValue}
                  requireSearchBar
                //   searchValue={searchValue}
                //   setSearchValue={setSearchValue}
                />
              </Form.Item>
                </Col>
                <Col xxl={12} xl={12} lg={10} md={12} sm={12} xs={12}>
                  <Form.Item
                    label='Date of Incorporation'
                    name='doIncorporation'
                  >
                   <CommonDatePicker />  
</Form.Item>

                </Col>
              </Row>
              <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
                  className="login-form-button"
                  onClick={() => {
                    console.log('hello')
                    setCurrentStep(2);
                  }}
          >
            Next
          </Button>
        </Form.Item>
                      </div>
                  </div>
              </Col>
          </Row>
    </div>
  )
}

export default AboutBuisness