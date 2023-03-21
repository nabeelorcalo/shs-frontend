import React, { useState } from 'react'
import { Col, Row,Form } from 'antd'
import { PageHeader } from '../../../components/PageHeader';
import { DropDown, Input } from '../../../components';

const WithDrawalRequest = () => {
  const [value, setValue] = useState("");


  return (
    <div className='delegate-With-Drawal-Request'>
      <PageHeader title="Withdrawal Request" bordered={true} actions={true}  />
      <Form layout='vertical'>
      <Row gutter={20}>
          <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
            <Form.Item label="Withdraw Account" name="account">
            <DropDown
              name="With Drawal Method"
              value={value}
              options={["Natwest Group", "Hbl", "item 3"]}
              setValue={setValue}
            />
            </Form.Item>
        </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
          <Form.Item label="Amount" name="account">
            <Input type='text' handleChange={()=>{}}  className='bg-[#E6F4F9]' placeholder='Enter Amount' />
            </Form.Item>
        </Col>
      </Row>
</Form>
      
    </div>
  )
}

export default WithDrawalRequest