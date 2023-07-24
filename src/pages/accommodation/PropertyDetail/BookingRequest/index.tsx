import React, { useState, useEffect,useRef, FC } from "react";
import { Link } from 'react-router-dom';
import type { DatePickerProps, RadioChangeEvent } from 'antd';
import { Form, Button, Col, Row, Popover, Checkbox, Radio, Typography, Input, Space, DatePicker, Empty, InputNumber, Alert } from 'antd';
import useCollapse from 'react-collapsed';
import {PopUpModal, ExtendedButton, Loader, Notifications} from "../../../../components";
import usePropertyHook from "../actionHandler";
import {useResetRecoilState} from "recoil";
import {checkPropertyAvailabilityState} from "../../../../store";
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
  IconCloseModal
} from '../../../../assets/images';
import './style.scss';
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../config/validationMessages";
import AlertBanner from "../../../../components/AlertBanner";
interface CardProps {
  propertyId: any
  rent: any
  rentFrequency: any
  depositAmount: any
  bookingRequestStatus: any
}


const BookingRequest:FC<CardProps> = ({propertyId, rent, rentFrequency, depositAmount, bookingRequestStatus}) => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const today = dayjs();
  const [formCheckAvailability] = Form.useForm();
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
    createPaymentCard,
    deletePaymentCard
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
  const [loadingCheckAvail, setLoadingCheckAvail] = useState(false);
  const [bookingReqValues, setBookingReqValues] = useState({});
  const [loadingAllCards, setLoadingAllCards] = useState(false);
  const [loadAddCard, setLoadAddCard] = useState(false);
  const inputRefs:any = useRef([]);
  const [disabledInDate, setDisabledInDate]:any = useState(null);
  const [disabledOutDate, setDisabledOutDate]:any = useState(null);
  const [loadingDelCard, setLoadingDelCard]= useState(false);
  const [showAlert, setShowAlert] = useState(false)

  
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
  };

  const closeModalDisclaimer = () => {
    setModalDisclaimerOpen(false)
  };

  const openModalAddRequestMessage = () => {
    setModalAddRequestMessageOpen(true);
  };

  const closeModalAddRequestMessage = () => {
    setModalAddRequestMessageOpen(false)
  };

  const onCheckboxChange = (e: { target: { checked: boolean } }) => {
    setIsAcceptPolicy(e.target.checked);
  };

  const submitAddRequestMessage = (values: any) => {
    setModalAddRequestMessageOpen(false)
    openModalAddPayment()
  };

  const openModalAddPayment = () => {
    setModalAddPaymentOpen(true)
  };

  const closeModalAddPayment = () => {
    setModalAddPaymentOpen(false);
    setExpanded(false);
    resetAddBookingForms();
  };

  const openModalAddCard = () => {
    setModalAddCardOpen(true)
  };

  const closeModalAddCard = () => {
    formAddCard.resetFields();
    setModalAddCardOpen(false);
  };

  const openModalPaymentReceipt = () => {
    setModalPaymentReceiptOpen(true)
  };

  const closeModalPaymentReceipt = () => {
    setModalPaymentReceiptOpen(false)
  };

  const onPaymentMethodChange = (e: RadioChangeEvent) => {
    setPaymentMethodValue(e.target.value);
  };

  const handleVerificationCodeExpand = () => {
    setExpanded(!isExpanded)
  };

  const submitAddPayment = (values: any) => {
    closeModalAddPayment();
    openModalPaymentReceipt();
  };

  const handleDateInChange = (date:any) => {
    if (date) {
      setDisabledInDate(date);
    } else {
      setDisabledInDate(null);
    }
  };

  const handleDateOutChange = (date:any) => {
    if (date) {
      setDisabledOutDate(date);
    } else {
      setDisabledOutDate(null);
    }
  };

  const disabledMoveinDate = (current:any) => {
    if (current && current.isBefore(dayjs().startOf('day'))) {
      return true;
    }

    if (current && disabledOutDate && current.isAfter(disabledOutDate.endOf('day'))) {
      return true;
    }
    return false;
  };

  const disabledMoveOutDate = (current:any) => {
    if (current && current.isBefore(dayjs().startOf('day'))) {
      return true;
    }
    
    if (current && disabledInDate && current.isBefore(disabledInDate.startOf('day'))) {
      return true;
    }

    return false;
  };

  const addBookingDates = () => {
    openModalAddRequestMessage();
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
    formCheckAvailability.resetFields();
    formReqMessage.resetFields();
  }

  const disabledCardExpiryDate = (current:any) => {
    return current && current < dayjs().subtract(1, 'days');
  };

  const validateNumber = (_:any, value:any) => {
    const numberRegex = /^\d{3,4}$/;
    if (value && numberRegex.test(value.toString())) {
      return Promise.resolve();
    }
    return Promise.reject('Please enter a valid 3 or 4 digit number');
  };

  /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const checkPropertyIsAvailable = async () => {
    const values = await formCheckAvailability.validateFields();
    const params = {
      bookingEndDate: dayjs(values?.checkMoveOutDate).format('YYYY-MM-DD'),
      bookingStartDate: dayjs(values?.checkMoveInDate).format('YYYY-MM-DD'),
      propertyId: propertyId,
    }
    setBookingReqValues({
      ...bookingReqParams,
      bookingEndDate: dayjs(values?.checkMoveOutDate).format('YYYY-MM-DD'),
      bookingStartDate: dayjs(values?.checkMoveInDate).format('YYYY-MM-DD'),
    });
    const response = checkPropertyAvailability(params, setLoadingCheckAvail);
    if(!response) {
      setShowAlert(true)
    }
  }
  
  const submitBookingRequest = async () => {
    setReqLoading(true)
    try {
      const response = await sendBookingRequest(bookingReqValues);
      if(!response.error) {
        setReqLoading(false);
        resetCheckAvailabilityState();
        openModalPaymentReceipt();
      }
    } catch (error) {
      return;
    } finally {
      setReqLoading(false);
      closeModalAddPayment();
    }
  }

  const submitAddCard = async () => {
    const values = await formAddCard.validateFields();
    const addCardReqBody = {
      cardHolderName: values?.cardHolderName,
      cardNumber: values?.cardNumber,
      expYear: dayjs(values?.expiryDate).format('YYYY'),
      expMonth: dayjs(values?.expiryDate).format('MM'),
      cvc: values?.cvc.toString()
    };

    setLoadAddCard(true);
    try {
      const response = await createPaymentCard(addCardReqBody);
      Notifications({title: "Success", description: 'The card has been added successfully', type: 'success'});
      closeModalAddCard();
    } catch(error) {
      return;
    } finally {
      setLoadAddCard(false);
    } 
  }

  
  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <>
      <div className="card-booking-request">
        {showAlert &&
          <AlertBanner 
            message={'The property is not available on the requested dates.'}
            type={'info'}
            showIcon={true}
            closable={true}
          />
        }
        <div className="booking-request-header">
          <div className="booking-request-header-title">£{rent} / <span>{rentFrequency}</span></div>
          {/* <div className="request-available-from">
            <div className="available-from-text">
              Available From: <span>9 February</span>
            </div>
            <div className="save-property-button">
              <SaveIcon />
            </div>
          </div> */}
        </div>
        
        <div className="check-property-availability">
          <Form
            requiredMark={false}
            form={formCheckAvailability}
            layout="vertical"
            name="formCheckAvailability"
            validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
          >
            <Row gutter={20}>
              <Col xs={24} sm={12}>
                <Form.Item name="checkMoveInDate" label="Move-in Date" rules={[{ required: true }]}>
                  <DatePicker
                    suffixIcon={<IconDatePicker />}
                    disabledDate={disabledMoveinDate}
                    showToday={false}
                    onChange={handleDateInChange}
                    clearIcon={<IconCloseModal />}
                    value={undefined}
                    disabled={isPropertyAvailable}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="checkMoveOutDate" label="Move-out Date" rules={[{ required: true }]}>
                  <DatePicker
                    suffixIcon={<IconDatePicker />}
                    disabledDate={disabledMoveOutDate}
                    showToday={false}
                    placement="bottomRight"
                    onChange={handleDateOutChange}
                    clearIcon={<IconCloseModal />}
                    value={undefined}
                    disabled={isPropertyAvailable}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          {!isPropertyAvailable &&
          <>
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

            {bookingRequestStatus === 'pending' ? (
              <Button block className="button-warning">Pending</Button>
            ) : bookingRequestStatus === 'rejected' ? (
              <Button block className="button-secondary">Rejected</Button>
            ) : bookingRequestStatus === 'reserved' ? (
              <Button block className="button-tertiary">Reserved</Button>
            ) : (
              <Button
                block
                loading={loadingCheckAvail}
                type="primary"
                onClick={() => checkPropertyIsAvailable()}
              >
                Check Availibility
              </Button>
            )}
          </>
          }
        </div>
        
        {isPropertyAvailable &&
          <div className="booking-request-form">
            <Form layout="vertical">
              <Row gutter={20}>
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
          validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
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
              {paymentCardsData.length === 0 &&
                <li className="no-card-found">
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No card added yet" />
                </li>
              }
              {paymentCardsData.length !== 0 &&
              <>
                <Radio.Group onChange={onPaymentMethodChange} value={paymentMethodValue}>
                  {paymentCardsData.map((card:any) => {
                    return (
                      <li key={card.id}>
                        <div className="payment-card">
                          <div className="payment-card-select">
                            <Radio value={card.id} />
                          </div>
                          <div className="payment-card-icon">
                            {card.brand === 'master' &&
                              <IconMasterCard />
                            }
                            {card.brand === 'Visa' &&
                              <IconVisaCard />
                            }
                          </div>
                          <div className="payment-card-detail">
                            <div className="payment-card-title">{card?.brand === 'Visa' ? "Visa": "Master Card"}</div>
                            <div className="payment-card-number">************{card?.last4}</div>
                          </div>
                        </div>
                        <div className="payment-card-actions">
                          <Button type="text" danger onClick={() => deletePaymentCard(card.id, setLoadingDelCard)}>Remove</Button>
                        </div>
                      </li> 
                    )
                  })}
                </Radio.Group>  
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
                      <Input
                        maxLength={1}
                        ref={(ref) => (inputRefs.current[1] = ref)}
                        onKeyPress={(event) => handleKeyPress(event, 1)} 
                      />
                    </div>
                    <div className="input-box">
                      <Input
                        maxLength={1}
                        ref={(ref) => (inputRefs.current[2] = ref)}
                        onKeyPress={(event) => handleKeyPress(event, 2)}
                      />
                    </div>
                    <div className="input-box">
                      <Input
                        maxLength={1}
                        ref={(ref) => (inputRefs.current[3] = ref)}
                        onKeyPress={(event) => handleKeyPress(event, 3)}
                      />
                    </div>
                    <div className="input-box">
                      <Input
                        maxLength={1}
                        ref={(ref) => (inputRefs.current[4] = ref)}
                        onKeyPress={(event) => handleKeyPress(event, 4)}
                      />
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
          validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
        >
          <Row gutter={30}>
            <Col xs={24}>
              <Form.Item name="cardHolderName" label="Cardholder Name" rules={[{ required: true }]}>
                <Input placeholder="Cardholder Name" />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item name="cardNumber" label="Card Number" rules={[{ required: true }]}>
                <Input placeholder="Card Number" />
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item name="expiryDate" label="Expiry Date" rules={[{ required: true }]}>
                <DatePicker
                  suffixIcon={<IconDatePicker />}
                  allowClear={false}
                  showToday={false}
                  format="YYYY-MM-DD"
                  disabledDate={disabledCardExpiryDate}
                />
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item 
                label="CVC/CVV"
                name="cvc"
                rules={[
                  { required: true },
                  { validator: validateNumber }
                ]}
              >
                <InputNumber placeholder="756" />
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

export default BookingRequest;
