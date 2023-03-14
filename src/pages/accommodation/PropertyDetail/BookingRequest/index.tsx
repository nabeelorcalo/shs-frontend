import React, { FC } from "react";
import './style.scss'
import type { DatePickerProps } from 'antd';
import { Form, Button, Col, Row  } from 'antd'
import { SaveIcon } from '../../../../assets/images'
import { DatePicker } from "../../../../components";


const PropertyPricing = () => {


  const onFinish = (values: any) => {
    console.log('Form Values: ', values);
  }

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log('DatePickerProps::: ', date, dateString);
  }

  return (
    <div className="card-booking-request">
      <div className="booking-request-header">
        <div className="booking-request-header-title">£700 / <span>month</span></div>
        <div className="request-available-from">
          <div className="available-from-text">
            Available From: <span>9 February</span>
          </div>
          <div className="save-property-button">
            <SaveIcon />
          </div>
        </div>
      </div>

      <Form layout="vertical" name="bookingRequest" onFinish={onFinish}>
        <Row gutter={20}>
          <Col xs={12}>
            <Form.Item name="moveInDate" label="Move-in Date">
              <DatePicker 
                onChange={onChange}
              />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item name="moveOutDate" label="Move-out Date">
              <DatePicker 
                onChange={onChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item>
              <Button type="primary" block htmlType="submit">
                Check Availibility
              </Button>
            </Form.Item> 
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default PropertyPricing;
