import React, { useState, useEffect,useRef, FC } from "react"
import { Link } from 'react-router-dom'
import type { DatePickerProps, RadioChangeEvent  } from 'antd'
import { Form, Button, Col, Row, Popover, Checkbox, Radio, Typography, Input, Space, DatePicker, Empty } from 'antd'
import useCollapse from 'react-collapsed';
import { PopUpModal, ExtendedButton, Loader, Notifications } from "../../../../components"
import usePropertyHook from "../actionHandler";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { checkPropertyAvailabilityState, allPaymentCardsState } from "../../../../store";
import congratulationCheck from '../../../../assets/images/accommodation/congratulation-check.gif';
import dayjs from 'dayjs';
import {
  SaveIcon,
  IconInfoCircle,
  IconMasterCard,
  IconVisaCard,
  IconAddCircle,
  IconProfileCircleWhite,
  IconDatePicker,
} from '../../../../assets/images'
import './style.scss'

// Temporary
const cardList = [
  {id: '001', type: 'master', title: 'Master Card', number: '0000111122223333'},
  {id: '002', type: 'visa', title: 'Visa', number: '9999888877776666'}
]

interface CardProps {
  propertyId: any
  agentId:any
  rent: any
  rentFrequency: any
  depositAmount: any
}


const PropertyPricing:FC<CardProps> = ({propertyId, rent, rentFrequency, agentId, depositAmount}) => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const today = dayjs();
  const [formBookingRequest] = Form.useForm();
  const [formReqMessage] = Form.useForm();
  const [formAddCard] = Form.useForm();
  const {
    checkPropertyAvailability,
    isPropertyAvailable,
    sendBookingRequest,
    bookingReqParams,
    getPaymentCards,
    paymentCardsData,
    createPaymentCard
  } = usePropertyHook();
  const resetCheckAvailabilityState = useResetRecoilState(checkPropertyAvailabilityState);
  const [modalDisclaimerOpen, setModalDisclaimerOpen] = useState(false)
  const [modalAddRequestMessageOpen, setModalAddRequestMessageOpen] = useState(false)
  const [modalAddPaymentOpen, setModalAddPaymentOpen] = useState(false)
  const [modalAddCardOpen, setModalAddCardOpen] = useState(false)
  const [paymentMethodValue, setPaymentMethodValue] = useState()
  const [modalPaymentReceiptOpen, setModalPaymentReceiptOpen] = useState(false)
  const [isExpanded, setExpanded] = useState(false);
  const {getCollapseProps, getToggleProps} = useCollapse({isExpanded});
  const [isAcceptPolicy, setIsAcceptPolicy] = useState(false)
  const [reqLoading, setReqLoading] = useState(false);
  const [loadingCheckAvail, setlLoadingCheckAvail] = useState(false);
  const [bookingReqValues, setBookingReqValues] = useState({});
  const [loadingAllCards, setLoadingAllCards] = useState(false);
  const [loadAddCard, setLoadAddCard] = useState(false);
  const [addCardReqBody, setAddCardReqBody] = useState({})
  const inputRefs:any = useRef([]);

  
  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    resetCheckAvailabilityState();
  }, [])

  useEffect(() => {
    if(modalAddPaymentOpen) {
      getPaymentCards(setLoadingAllCards);
    }
  }, [modalAddPaymentOpen])

  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleKeyPress = (event:any, index:any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const nextIndex:any = index + 1;
      if (nextIndex < inputRefs.current.length) {
        inputRefs.current[nextIndex].focus();
      }
    }
  };
  const openModalDisclaimer = () => {
    setModalDisclaimerOpen(true)
  }

  const closeModalDisclaimer = () => {
    setModalDisclaimerOpen(false)
  }

  const openModalAddRequestMessage = () => {
    setModalAddRequestMessageOpen(true);
  }

  const closeModalAddRequestMessage = () => {
    setModalAddRequestMessageOpen(false)
  }

  const onCheckboxChange = (e: { target: { checked: boolean } }) => {
    setIsAcceptPolicy(e.target.checked);
  }

  const submitAddRequestMessage = (values: any) => {
    setModalAddRequestMessageOpen(false)
    openModalAddPayment()
  }

  const openModalAddPayment = () => {
    setModalAddPaymentOpen(true)
  }

  const closeModalAddPayment = () => {
    setModalAddPaymentOpen(false);
    setExpanded(false);
    resetAddBookingForms();
  }

  const openModalAddCard = () => {
    setModalAddCardOpen(true)
  }

  const closeModalAddCard = () => {
    formAddCard.resetFields();
    setAddCardReqBody({});
    setModalAddCardOpen(false)
  }

  const openModalPaymentReceipt = () => {
    setModalPaymentReceiptOpen(true)
  }

  const closeModalPaymentReceipt = () => {
    setModalPaymentReceiptOpen(false)
  }

  const onPaymentMethodChange = (e: RadioChangeEvent) => {
    setPaymentMethodValue(e.target.value);
  };

  const handleVerificationCodeExpand = () => {
    setExpanded(!isExpanded)
  }

  const submitAddPayment = (values: any) => {
    closeModalAddPayment();
    openModalPaymentReceipt();
  }

  // Disable previous dates by using `disabledDate` function
  const disabledDate = (current:any) => {
    return current && current < today.startOf('day');
  };

  const addBookingDates = () => {
    formBookingRequest.validateFields().then((values) => {
      setBookingReqValues({
        ...bookingReqParams,
        bookingStartDate: dayjs(values.moveInDate).format('YYYY-MM-DD'), 
        bookingEndDate: dayjs(values.moveOutDate).format('YYYY-MM-DD')
      });
      openModalAddRequestMessage();
    })
  };

  const addBookingMessage = () => {
    formReqMessage.validateFields().then((values) => {
      setBookingReqValues((prev:any) => {
        return {
          ...prev,
          tenantMessage: values.message
        }
      });
      closeModalAddRequestMessage();
      openModalAddPayment();
    })
  };

  const resetAddBookingForms = () => {
    formBookingRequest.resetFields();
    formReqMessage.resetFields();
  }

  /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const submitBookingRequest = async () => {
    setReqLoading(true)
    try {
      const response = await sendBookingRequest(bookingReqValues);
      if(!response.error) {
        setReqLoading(false);
        closeModalAddPayment();
        resetCheckAvailabilityState();
        openModalPaymentReceipt();
      }
    } catch (error) {
      return;
    } finally {
      setReqLoading(false)
    } 
  }

  const submitAddCard = async () => {
    formAddCard.validateFields().then((values) => {
      setAddCardReqBody({
        cardHolderName: values?.cardHolderName,
        cardNumber: values?.cardNumber,
        expYear: dayjs(values?.expiryDate).format('YYYY'),
        expMonth: dayjs(values?.expiryDate).format('MM'),
        cvc: values?.cvc
      });
    });
    setLoadAddCard(true);
    try {
      const response = await createPaymentCard(addCardReqBody);
      if(!response.error) {
        Notifications({title: "Success", description: response.message, type: 'success'});
      }
    } catch (error) {
      return
    } finally {
      setLoadAddCard(false);
      closeModalAddCard();
    }
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
                    overlayClassName="available-property-tooltip"
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
            <Form
              requiredMark={false}
              form={formBookingRequest}
              layout="vertical"
              name="formBookingRequest"
            >
              <Row gutter={20}>
                <Col xs={24} sm={12}>
                  <Form.Item name="moveInDate" label="Move-in Date" rules={[{ required: true }]}>
                    <DatePicker
                      suffixIcon={<IconDatePicker />}
                      disabledDate={disabledDate}
                      allowClear={false}
                      showToday={false}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item name="moveOutDate" label="Move-out Date" rules={[{ required: true }]}>
                    <DatePicker
                      suffixIcon={<IconDatePicker />}
                      disabledDate={disabledDate}
                      allowClear={false}
                      showToday={false}
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
                    
                    <Form.Item>
                      <Checkbox checked={isAcceptPolicy} onChange={onCheckboxChange}>
                        I accept that I have read and understand the information given in <Link to="">disclaimer</Link> and <Link to="">cancelation policy</Link> .
                      </Checkbox>
                    </Form.Item>
                  </div>
                </Col>
                <Col xs={24}>
                  <Form.Item>
                    <Button 
                      block
                      type="primary"
                      disabled={!isAcceptPolicy}
                      onClick={addBookingDates}
                    >
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
          <ExtendedButton onClick={addBookingMessage} customType="tertiary">
            Next
          </ExtendedButton>
        ]}
      >
        <Form 
          requiredMark={false}
          layout="vertical"
          name="formReqMessage"
          form={formReqMessage}
        >
          <Form.Item name="message" label="Request Message" rules={[{ required: true }]}>
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
        <>
          <Form layout="vertical" name="addPayment" onFinish={submitAddPayment}>
            <ul className="payment-card-list">
              {!paymentCardsData &&
                <li className="no-card-found">
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No card added yet" />
                </li>
              }
              {paymentCardsData &&
              <>
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
              </>
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
                  <div className="payable-amount-number">£{rent}<span>/{rentFrequency}</span></div>
                </div>
                <div className="amount-col payable-amout-total">
                  <div className="payable-amount-label">Total Amount</div>
                  <div className="payable-amount-number">£{rent + depositAmount}</div>
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
                      <Input
                        maxLength={1}
                        ref={(ref) => (inputRefs.current[0] = ref)}
                        onKeyPress={(event) => handleKeyPress(event, 0)}
                      />
                    </div>
                    <div className="input-box">
                      <Input maxLength={1} ref={(ref) => (inputRefs.current[1] = ref)} />
                    </div>
                    <div className="input-box">
                      <Input maxLength={1} ref={(ref) => (inputRefs.current[2] = ref)} />
                    </div>
                    <div className="input-box">
                      <Input maxLength={1} ref={(ref) => (inputRefs.current[3] = ref)} />
                    </div>
                    <div className="input-box">
                      <Input maxLength={1} ref={(ref) => (inputRefs.current[4] = ref)}  />
                    </div>
                  </div>
                </div>
                <div className="code-expire-text">Code expire in 15:00</div>
                <div className="verification-code-submit">
                  <ExtendedButton
                    block
                    customType="tertiary" 
                    onClick={submitBookingRequest}
                    loading={reqLoading}
                  >
                    Submit
                  </ExtendedButton>
                </div>
                <div className="resend-code">
                  Didn’t get a code? <span>Resend</span>
                </div>
              </div>
            </div>
          </Form>
          {loadingAllCards &&
            <Loader />
          }
        </>
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
          <ExtendedButton 
            customType="tertiary"
            onClick={submitAddCard}
            loading={loadAddCard}
          >
            Add Card
          </ExtendedButton>
        ]}
      >
        <Form
          form={formAddCard}
          requiredMark={false}
          layout="vertical"
          name="formAddCard"
        >
          {JSON.stringify(addCardReqBody)}
          <Row gutter={30}>
            <Col xs={24}>
              <Form.Item name="cardHolderName" label="Cardholder Name" rules={[{ required: true }]}>
                <Input placeholder="Placeholder" />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item name="cardNumber" label="Card Number" rules={[{ required: true }]}>
                <Input placeholder="Placeholder" />
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item name="expiryDate" label="Expiry Date" rules={[{ required: true }]}>
                <DatePicker
                  suffixIcon={<IconDatePicker />}
                  allowClear={false}
                  showToday={false}
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item name="cvc" label="CVC/CVV" rules={[{ required: true }]}>
                <Input placeholder="756" />
              </Form.Item>
            </Col>
          </Row>
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
