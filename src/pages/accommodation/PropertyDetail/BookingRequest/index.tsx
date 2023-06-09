import React, { useState, useEffect, FC } from "react"
import { Link } from 'react-router-dom'
import type { DatePickerProps, RadioChangeEvent  } from 'antd'
import { Form, Button, Col, Row, Popover, Checkbox, Radio, Typography, Input, Space } from 'antd'
import useCollapse from 'react-collapsed';
import { DatePicker, PopUpModal, ExtendedButton } from "../../../../components"
import usePropertyHook from "../actionHandler";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { checkPropertyAvailabilityState } from "../../../../store";
import congratulationCheck from '../../../../assets/images/accommodation/congratulation-check.gif'
import {
  SaveIcon,
  IconInfoCircle,
  IconMasterCard,
  IconVisaCard,
  IconAddCircle,
  IconProfileCircleWhite,
} from '../../../../assets/images'
import './style.scss'

// Temporary
const cardList = [
  {id: '001', type: 'master', title: 'Master Card', number: '0000111122223333'},
  {id: '002', type: 'visa', title: 'Visa', number: '9999888877776666'}
]

interface CardProps {
  propertyId: any
  rent: any
  rentFrequency: any

}


const PropertyPricing:FC<CardProps> = ({propertyId, rent, rentFrequency}) => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const { checkPropertyAvailability, isPropertyAvailable } = usePropertyHook();
  const checkProperty = useRecoilValue(checkPropertyAvailabilityState);
  const resetCheckAvailabilityState = useResetRecoilState(checkPropertyAvailabilityState);
  const [modalDisclaimerOpen, setModalDisclaimerOpen] = useState(false)
  const [modalAddRequestMessageOpen, setModalAddRequestMessageOpen] = useState(false)
  const [modalAddPaymentOpen, setModalAddPaymentOpen] = useState(false)
  const [modalAddCardOpen, setModalAddCardOpen] = useState(false)
  const [paymentMethodValue, setPaymentMethodValue] = useState()
  const [modalPaymentReceiptOpen, setModalPaymentReceiptOpen] = useState(false)
  const [ isExpanded, setExpanded ] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({isExpanded});
  const [isAcceptPolicy, setIsAcceptPolicy] = useState(false)
  const [loading, setLoading] = useState(false);
  const [loadingCheckAvail, setlLoadingCheckAvail] = useState(false)


  
  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    resetCheckAvailabilityState()
  }, [])

  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log('DatePickerProps::: ', date, dateString);
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

  const onCheckboxChange = (e: { target: { checked: boolean } }) => {
    setIsAcceptPolicy(e.target.checked);
  }

  const submitBookingRequest = (values: any) => {
    console.log('Form Values: ', values);
    openModalAddRequestMessage()
  }

  const submitAddRequestMessage = (values: any) => {
    console.log('Form Values: ', values);
    setModalAddRequestMessageOpen(false)
    openModalAddPayment()
  }

  const openModalAddPayment = () => {
    setModalAddPaymentOpen(true)
  }

  const closeModalAddPayment = () => {
    setModalAddPaymentOpen(false)
    setExpanded(false)
  }

  const openModalAddCard = () => {
    setModalAddCardOpen(true)
  }

  const closeModalAddCard = () => {
    setModalAddCardOpen(false)
  }

  const openModalPaymentReceipt = () => {
    setModalPaymentReceiptOpen(true)
  }

  const closeModalPaymentReceipt = () => {
    setModalPaymentReceiptOpen(false)
  }

  const onPaymentMethodChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setPaymentMethodValue(e.target.value);
  };

  const tabChange = (e:any, num:number) => {
    let elem = e.target
    // const [name] = elem
    // if( elem[num-1].value != '' ){
    //   elem[num].focus()
    // }else if(elem[num-1].value == ''){
    //   elem[num-2].focus()
    // } 
  }

  const handleVerificationCodeExpand = () => {
    setExpanded(!isExpanded)
  }

  const submitAddPayment = (values: any) => {
    console.log('Add payment submit: ', values);
    closeModalAddPayment();
    openModalPaymentReceipt();
  }


  
  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <>
      <div className="card-booking-request">
        <div className="booking-request-header">
          <div className="booking-request-header-title">£{rent} / <span>{rentFrequency}</span></div>
          <div className="request-available-from">
            <div className="available-from-text">
              Available From: <span>9 February</span>
            </div>
            <div className="save-property-button">
              <SaveIcon />
            </div>
          </div>
        </div>
        {!isPropertyAvailable &&
          <div className="check-property-availability">
            <div className="check-availability-general-info">
              <div className="general-info-message">
                <span>Total to pay per booking request</span>
                <div className="general-info-popover">
                  <Popover
                    content={`You will only be charged once the booking is accepted. As an extra security step,  we'll send the money to the Landlord after contract is signed.`}
                  >
                    <IconInfoCircle />
                  </Popover>
                </div>
              </div>
              <div className="general-info-text">
                Includes one month rent in advance and the Student help squad fee.
              </div>
            </div>
            
            <Button
              block
              loading={loadingCheckAvail}
              type="primary"
              onClick={() => checkPropertyAvailability({propertyId: propertyId}, setlLoadingCheckAvail)}
            >
              Check Availibility
            </Button>
          </div>
        }
        
        {isPropertyAvailable &&
          <div className="booking-request-form">
            <Form layout="vertical" name="bookingRequest" onFinish={submitBookingRequest}>
              <Row gutter={20}>
                <Col xs={24} sm={12}>
                  <Form.Item name="moveInDate" label="Move-in Date">
                    <DatePicker 
                      onChange={onChange}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
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
                      <div className="disclaimer-modal" onClick={openModalDisclaimer}>
                        <IconInfoCircle />
                      </div>
                    </div>
                    
                    <Form.Item name="acceptPolicy">
                      <Checkbox checked={isAcceptPolicy} onChange={onCheckboxChange}>
                        I accept that I have read and understand the information given in <Link to="">disclaimer</Link> and <Link to="">cancelation policy</Link> .
                      </Checkbox>
                    </Form.Item>
                  </div>
                </Col>
                <Col xs={24}>
                  <Form.Item>
                    <Button type="primary" block disabled={!isAcceptPolicy}>
                      Send Booking Request
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        }
        
      </div>

      {/* STARTS: MODAL DISCLAIMER
      *************************************************************************/}
      <PopUpModal
        open={modalDisclaimerOpen}
        close={closeModalDisclaimer}
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
      </PopUpModal>
      {/* ENDS: MODAL DISCLAIMER
      *************************************************************************/}
      
      {/* STARTS: MODAL ADD REQUEST MESSAGE 
      *************************************************************************/}
      <PopUpModal
        title="Add Request Message"
        open={modalAddRequestMessageOpen}
        close={closeModalAddRequestMessage}
        width={700}
        footer={[
          <ExtendedButton customType="tertiary" ghost onClick={closeModalAddRequestMessage}>Cancel</ExtendedButton>,
          <ExtendedButton form="addRequestMessage" key="submit" htmlType="submit" customType="tertiary">
            Next
          </ExtendedButton>
        ]}
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

      {/* STARTS: MODAL ADD PAYMENT
      *************************************************************************/}
      <PopUpModal
        title="Add Payment"
        open={modalAddPaymentOpen}
        close={closeModalAddPayment}
        width={700}
        footer={isExpanded ? null : [
          <Space>
            <ExtendedButton customType="tertiary" ghost onClick={closeModalAddPayment}>Cancel</ExtendedButton>
            <div {...getToggleProps({onClick: handleVerificationCodeExpand})}><ExtendedButton customType="tertiary">Pay</ExtendedButton></div>
          </Space> 
        ]}
      >
        <Form layout="vertical" name="addPayment" onFinish={submitAddPayment}>
          <ul className="payment-card-list">

            {cardList &&
              <Radio.Group onChange={onPaymentMethodChange} value={paymentMethodValue}>
                {cardList.map((card, index) => {
                  return (
                    <li key={index}>
                      <div className="payment-card">
                        <div className="payment-card-select">
                          <Radio value={card.id} />
                        </div>
                        <div className="payment-card-icon">
                          {card.type === 'master' &&
                            <IconMasterCard />
                          }
                          {card.type === 'visa' &&
                            <IconVisaCard />
                          }
                        </div>
                        <div className="payment-card-detail">
                          <div className="payment-card-title">{card.title}</div>
                          <div className="payment-card-number">{card.number}</div>
                        </div>
                      </div>
                      <div className="payment-card-actions">
                        <Button type="text" danger>Remove</Button>
                      </div>
                    </li> 
                  )
                })}
              </Radio.Group>
            }
            
            <li className="add-new-card" onClick={openModalAddCard}>
              <div className="add-new-card-icon">
                <IconAddCircle />
              </div>
              <div className="add-new-card-text">
                Add New Card
              </div>
            </li>
          </ul>
          <div className="payable-amount-detail">
            <div className="payable-amout-row">
              <div className="amount-col payable-amout-installment">
                <div className="payable-amount-label">Payable Amount</div>
                <div className="payable-amount-number">£710<span>/week</span></div>
              </div>
              <div className="amount-col payable-amout-total">
                <div className="payable-amount-label">Total Amount</div>
                <div className="payable-amount-number">£3000</div>
              </div>
            </div>
          </div>

          <div className="payment-verification-code" {...getCollapseProps()}>
            <div className="verification-code-wrap">
              <div className="verification-code-title">Verification Code</div>
              <div className="verification-code-message">
                We have send an 6-digit code to your phone number as stated below <span>+44 20 3514 3971</span>. The code will expire in 15 minutes.
              </div>
              <div className="boxes-wrapper">
                <div className="verificatio-code-boxes">
                  <div className="input-box">
                    <Input  maxLength={1} name="1" onKeyUp={(e) => tabChange(e, 1)} />
                  </div>
                  <div className="input-box">
                    <Input  maxLength={1} name="2" onKeyUp={(e) => tabChange(e, 2)} />
                  </div>
                  <div className="input-box">
                    <Input  maxLength={1} name="3" onKeyUp={(e) => tabChange(e, 3)} />
                  </div>
                  <div className="input-box">
                    <Input  maxLength={1} name="4" onKeyUp={(e) => tabChange(e, 4)} />
                  </div>
                  <div className="input-box">
                    <Input  maxLength={1} name="5" onKeyUp={(e) => tabChange(e, 5)} />
                  </div>
                </div>
              </div>
              <div className="code-expire-text">Code expire in 15:00</div>
              <div className="verification-code-submit">
                <ExtendedButton block customType="tertiary" htmlType="submit">Submit</ExtendedButton>
              </div>
              <div className="resend-code">
                Didn’t get a code? <span>Resend</span>
              </div>
            </div>
          </div>
        </Form>
      </PopUpModal>
      {/* ENDS: MODAL ADD PAYMENT
      *************************************************************************/}

      {/* STARTS: MODAL ADD NEW CARD 
      *************************************************************************/}
      <PopUpModal
        title="Add Card"
        open={modalAddCardOpen}
        close={closeModalAddCard}
        width={700}
        footer={[
          <ExtendedButton customType="tertiary" ghost onClick={closeModalAddCard}>Cancel</ExtendedButton>,
          <ExtendedButton form="addRequestMessage" key="submit" htmlType="submit" customType="tertiary">
            Add Card
          </ExtendedButton>
        ]}
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
      {/* ENDS: MODAL ADD NEW CARD
      *************************************************************************/}

      {/* STARTS: MODAL PAYMENT RECEIPT 
      *************************************************************************/}
      <PopUpModal
        title="Payment Receipt"
        open={modalPaymentReceiptOpen}
        close={closeModalPaymentReceipt}
        width={700}
        footer={null}
      >
        <div className="payment-receipt-wrapper">
          <div className="payment-receipt-header">
            <img src={congratulationCheck} />
            <Typography.Title level={3}>
              Congratulations
            </Typography.Title>
            <Typography.Text>
              Your payment request is taken into account and your money has been transferred successfully.
            </Typography.Text>
          </div>
          
          <div className="paid-information">
            <div className="payment-date">20 June 2022    20:38 UTC +1</div>
            <div className="paid-amount">
              <div className="paid-amount-amount">£700</div>
              <div className="paid-amount-paid">Paid</div>
            </div>
          </div>

          <div className="payment-details">
            <div className="payment-details-title">Payment Details</div>
            <ul className="payment-details-list">
              <li>
                <div className="payment-detail-label">Property Name</div>
                <div className="payment-detail-value">{`Brick Lane Realty`}</div>
              </li>
              <li>
                <div className="payment-detail-label">Paid to</div>
                <div className="payment-detail-value">{`Peter Brandsetter`}</div>
              </li>
              <li>
                <div className="payment-detail-label">Paid by</div>
                <div className="payment-detail-value">{`Ahmad Septimus`}</div>
              </li>
              <li>
                <div className="payment-detail-label">Receipt Number</div>
                <div className="payment-detail-value">{`Receipt Number`}</div>
              </li>
              <li>
                <div className="payment-detail-label">Transaction Type</div>
                <div className="payment-detail-value">{`Credit Card`}</div>
              </li>
            </ul>
          </div>

          <div className="need-help-card">
            <div className="need-help-card-content">
              <div className="need-help-title">Need help?</div>
              <Typography.Text>
                If there is a problem with the transactions make sure to contact your support.
              </Typography.Text>
            </div>
            <div className="need-help-card-actions">
              <ExtendedButton icon={<IconProfileCircleWhite />} size="small" customType="tertiary">Support</ExtendedButton>
            </div>
          </div>

          <ExtendedButton block customType="tertiary" onClick={closeModalPaymentReceipt}>Print Receipt</ExtendedButton>

        </div>
      </PopUpModal>
      {/* ENDS: MODAL PAYMENT RECEIPT
      *************************************************************************/}

    </>
  )
}

export default PropertyPricing;
