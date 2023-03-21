import React, { useState } from 'react'
import { Col, Row, Form, Typography, Button, Input } from 'antd';
import { PageHeader } from '../../../components/PageHeader';
import { DropDown } from '../../../components';
import WithDrawalDetails from './withDrawalDetails';
import { useNavigate } from 'react-router-dom';

const balance = '2000.00';

const WithDrawalRequest = (props: any) => {
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);

  return (
    <div className='delegate-With-Drawal-Request'>
      <PageHeader
        title="Withdrawal Request"
        bordered={true}
        actions={true} >
        <Button onClick={() => {
          navigate('/link-account')
        }}
          className='teriary-light-bg-color white-color 
          text-base font-semibold'>
          Link Account
        </Button>
      </PageHeader>
      <Form layout='vertical'>
        <Row gutter={20}>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Typography
              className='text-[#14142A] 
              text-xl font-semibold
              mt-4 mb-5'>
              Current Balance : ${balance}
            </Typography>
          </Col>
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
            <Form.Item label="Amount" name="amount">
              <Input type='text'
                name='amount'
                onChange={(e: any) => {
                  setShow(true);

                  if (e.target.value.length > 0) {
                    setShow(true)
                  } else {
                    setShow(false)
                  };
                }}
                placeholder='Enter Amount' />
            </Form.Item>
          </Col>
        </Row>
        {show && <WithDrawalDetails
          show={show}
          setShow={setShow}
        />}

      </Form>

    </div>
  )
}

export default WithDrawalRequest