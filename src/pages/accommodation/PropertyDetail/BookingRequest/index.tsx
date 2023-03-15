import React, { useState, FC } from "react"
import { Link } from 'react-router-dom'
import type { DatePickerProps } from 'antd'
import { Form, Button, Col, Row, Popover, Checkbox, Modal, Typography  } from 'antd'
import { SaveIcon, IconInfoCircle } from '../../../../assets/images'
import { DatePicker } from "../../../../components"
import './style.scss'


const PropertyPricing = () => {
  const [checkAvailability, setCheckAvailability] = useState(false)
  const [modalDisclaimerOpen, setModalDisclaimerOpen] = useState(false)


  const onFinish = (values: any) => {
    console.log('Form Values: ', values);
  }

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log('DatePickerProps::: ', date, dateString);
  }

  const handleCheckAvailability = () => {
    setCheckAvailability(true)
  }

  const openModalDisclaimer = () => {
    setModalDisclaimerOpen(true)
  }

  const closeModalDisclaimer = () => {
    setModalDisclaimerOpen(false)
  }

  return (
    <>
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
                    <div className="disclaimer-modal" onClick={openModalDisclaimer}>
                      <IconInfoCircle />
                    </div>
                  ) : (
                    <div className="general-info-popover">
                      <Popover
                        content={`You will only be charged once the booking is accepted. As an extra security step,  we'll send the money to the Landlord after contract is signed.`}
                      >
                        <IconInfoCircle />
                      </Popover>
                    </div>
                  )}
                </div>
                
                {checkAvailability ? (
                  <Form.Item>
                    <Checkbox>
                      I accept that I have read and understand the information given in <Link to="">disclaimer</Link> and <Link to="">cancelation policy</Link> .
                    </Checkbox>
                  </Form.Item>
                ) : (
                  <div className="general-info-text">
                    Includes one month rent in advance and the Student help squad fee.
                  </div>
                )}
              </div>
            </Col>
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

      {/* MODAL DISCALIMER */}
      <Modal
        open={modalDisclaimerOpen}
        onCancel={closeModalDisclaimer}
        centered
        closable={false}
        footer={null}
        width={510}
        wrapClassName={'disclaimer-modal-container'}
      >
        <div className="disclaimer-content">
          <Typography.Title level={5}>Disclaimer</Typography.Title>
          <Typography.Text>
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged
          </Typography.Text>
        </div>
        <div className="cancellation-policy">
          <Typography.Title level={5}>Cancellation Policy</Typography.Title>
          <Typography.Text>
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged
          </Typography.Text>
        </div>
      </Modal>
    </>
  )
}

export default PropertyPricing;
