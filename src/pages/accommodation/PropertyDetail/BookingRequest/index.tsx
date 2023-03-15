import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import type { DatePickerProps } from 'antd'
import { Form, Button, Col, Row, Popover, Checkbox, Modal, Typography, Input } from 'antd'
import { SaveIcon, IconInfoCircle } from '../../../../assets/images'
import { DatePicker, PopUpModal, ExtendedButton } from "../../../../components"
import './style.scss'


const PropertyPricing = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const [checkAvailability, setCheckAvailability] = useState(false)
  const [modalDisclaimerOpen, setModalDisclaimerOpen] = useState(false)
  const [modalAddRequestMessageOpen, setModalAddRequestMessageOpen] = useState(false)


  
  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {

  }, [])



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
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

  const openModalAddRequestMessage = () => {
    setModalAddRequestMessageOpen(true)
  }

  const closeModalAddRequestMessage = () => {
    setModalAddRequestMessageOpen(false)
  }

  const submitAddRequestMessage = (values: any) => {
    console.log('Form Values: ', values);
    setModalAddRequestMessageOpen(false)
  }



  /* RENDER APP
  -------------------------------------------------------------------------------------*/
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
                  <Button type="primary" block onClick={openModalAddRequestMessage}>
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
      
      {/* STARTS: MODAL ADD REQUEST MESSAGE 
      *************************************************************************/}
      <PopUpModal
        title="Add Request Message"
        open={modalAddRequestMessageOpen}
        close={closeModalAddRequestMessage}
        footer={[
          <ExtendedButton customType="tertiary" ghost onClick={closeModalAddRequestMessage}>Cancel</ExtendedButton>,
          <ExtendedButton form="addRequestMessage" key="submit" htmlType="submit" customType="tertiary">
            Next
          </ExtendedButton>
        ]}
        width={700}
      >
        <Form layout="vertical" name="addRequestMessage" onFinish={submitAddRequestMessage}>
          <Form.Item name="moveInDate" label="Request Message">
            <Input.TextArea 
              placeholder="Type a message..."
              autoSize={{ minRows: 6, maxRows: 6 }}
            />
          </Form.Item>
        </Form>
      </PopUpModal>
      {/* ENDS: MODAL ADD REQUEST MESSAGE 
      *************************************************************************/}

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
