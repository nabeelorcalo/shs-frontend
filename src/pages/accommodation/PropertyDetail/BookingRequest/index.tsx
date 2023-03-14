import React, { useState, FC } from "react";
import './style.scss'
import type { DatePickerProps } from 'antd';
import { Form, Button, Col, Row, Popover, Checkbox  } from 'antd'
import { SaveIcon, IconInfoCircle } from '../../../../assets/images'
import { DatePicker } from "../../../../components";


const PropertyPricing = () => {
  const [checkAvailability, setCheckAvailability] = useState(false)


  const onFinish = (values: any) => {
    console.log('Form Values: ', values);
  }

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log('DatePickerProps::: ', date, dateString);
  }

  const handleCheckAvailability = () => {
    setCheckAvailability(true)
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
            <div className="booking-request-general-info">
              <div className="general-info-message">
                <span>Total to pay per booking request</span>
                {checkAvailability ? (
                  <div className="disclaimer-modal">
                    <IconInfoCircle />
                  </div>
                ) : (
                  <div className="general-info-popover">
                    <Popover 
                      trigger="hover"
                      content={`You will only be charged once the booking is accepted. As an extra security step,  we'll send the money to the Landlord after contract is signed.`}
                    >
                      <IconInfoCircle />
                    </Popover>
                  </div>
                )}
              </div>
              <div className="general-info-text">
                Includes one month rent in advance and the Student help squad fee.
              </div>
            </div>
          </Col>
          {checkAvailability &&
            <Col xs={24}>
              <Form.Item>
                <Checkbox>
                  I have read the <a href="">agreement</a>
                </Checkbox>
              </Form.Item>
            </Col>
          }
          
          <Col xs={24}>
            {checkAvailability ? (
              <Form.Item>
                <Button type="primary" block htmlType="submit">
                  Send Booking Request
                </Button>
              </Form.Item>
            ) : (
              <Button type="primary" block onClick={handleCheckAvailability}>
                Check Availibility
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default PropertyPricing;
