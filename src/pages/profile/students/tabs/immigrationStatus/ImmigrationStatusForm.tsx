import React from 'react'
import { Button, Col, Form, Input, Modal, Row, Typography } from 'antd'
import { CommonDatePicker } from '../../../../../components';
import '../Tabs.scss'

const ImmigrationStatusForm = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
      };
      
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
  return (
      <div className='immigration-form'>
          <Form
              layout='vertical'
    name="basic"
    
   
 
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
          >
              <Row>
                  <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <Form.Item 
      label="Share Code"
      name="sharecode"
      rules={[{ required: true, message: 'Please input your Share Code!' }]}
    >
                          <Input className='input-style'  />
    </Form.Item>
                  </Col>
                  <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                 
                       <Form.Item
      label="What is the date of birth?"
      name="dob"
      rules={[{ required: true, message: 'Please input your Date OF Birth!' }]}
    >
      <CommonDatePicker/>
    </Form.Item>
   
                  </Col>
                  <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                 
                       <Form.Item
      label="What is the your company name?"
      name="companyname"
      rules={[{ required: true, message: 'Please input your Company Name!' }]}
    >
       <Input className='input-style'  />
    </Form.Item>
   
                  </Col>
              </Row>
    

    

   
   
          </Form>
      </div>
  )
}

export default ImmigrationStatusForm