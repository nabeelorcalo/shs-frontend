import React, { useEffect, useState } from "react";
import { Col, Divider, Row, Typography, Button, Space, Modal, Form, Input, TimePicker } from "antd";
import '../../../style.scss';
import { CloseCircleFilled } from "@ant-design/icons";
import { CommonDatePicker } from "../../../../../components";
import type { Dayjs } from 'dayjs';
import useCustomHook from "../../../actionHandler";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;

const ListingDetails = (props: any) => {
  const router = useNavigate();
  const action = useCustomHook();
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    action.getRecentListing();
  }, [])

  const onFinish = (values: any) => {
    setOpenModal(false);
  }
  return (
    <div className="listing-details">
      <Row>
        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
          <div>
            <Typography className="listing-styles-main">Location</Typography>
          </div>
          <div className="mt-3 mb-3">
            <Typography className="listing-styles-secondary">
              Address
            </Typography>
            <Typography className="listing-description">
              {props.recentList[0].addressOne}
            </Typography>
          </div>
          <div className="mt-4 mb-3">
            <Typography className="listing-styles-secondary">
              Postal Code
            </Typography>
            <Typography className="listing-description">
              {props.recentList[0].postCode}
            </Typography>
          </div>
          <div className="mt-4 mb-3">
            <Typography className="listing-styles-secondary">
              Is it furnished
            </Typography>
            <Typography className="listing-description">
              {props.recentList[0]?.isFurnished ? 'Yes' : 'No'}
            </Typography>
          </div>
        </Col>
        <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
          <div className=" rounded-lg ">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7050661.956303704!2d69.34807160000001!3d30.3593034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1678279846720!5m2!1sen!2s"
              height="250"
              style={{ border: "0" }}
              loading="lazy"
            ></iframe>
          </div>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24} >
          <div>
            <Typography className="listing-styles-main">
              Property Details
            </Typography>
          </div>
          <div className="mt-3 mb-10">
            <Typography className="listing-styles-secondary mb-2">
              How will you rent your property?
            </Typography>
            <Typography className="listing-description">
              {props.recentList[0].propertyType}
            </Typography>
          </div>
          <div>
            <Row gutter={15}>
              <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary mb-2">
                    Bedrooms in total
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0].totalBedrooms}
                  </Typography>
                </div>
              </Col>
              <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary mb-2">
                    Bedroom for rent
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0].bedroomsForRent}
                  </Typography>
                </div>
              </Col>
              <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary mb-2">
                    Bathroom
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0].totalBathrooms}
                  </Typography>
                </div>
              </Col>
              <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary mb-3">
                    Air Conditioning
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0].hasAirConditioning}
                  </Typography>
                </div>
              </Col>
              <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary">
                    Heating
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0].hasHeating}
                  </Typography>
                </div>
              </Col>
              <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary ">
                    Water heating system
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0].hasWaterHeating}
                  </Typography>
                </div>
              </Col>
              <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary">
                    Building has
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0].buildingHas}
                  </Typography>
                </div>
              </Col>
              <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary">
                    Property
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0].propertyHas}
                  </Typography>
                </div>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Typography className="listing-styles-main mt-3 mb-3">
                  BedRoom Details
                </Typography>
                <div className="mt-3 mb-3">
                  <Typography className="listing-styles-secondary">
                    Bed Type
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0].bedType}
                  </Typography>
                </div>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <div className="mt-3 mb-3">
                  <Typography className="listing-styles-secondary">
                    Access to
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0].propertyHas}
                  </Typography>
                </div>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <div className="mt-3 mb-3">
                  <Typography className="listing-styles-secondary">
                    Are two people allowed to live in this room
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0].twoPeopleAllowed}
                  </Typography>
                </div>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Typography className="listing-styles-main mb-3">
                  Rent and Billing
                </Typography>
              </Col>
              <Col xxl={6} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div className=" mb-3">
                  <Typography className="listing-styles-secondary">
                    Monthly Rent
                  </Typography>
                  <Typography className="listing-description">
                    ${props.recentList[0].rent}
                  </Typography>
                </div>
              </Col>
              <Col xxl={6} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary">
                    Payment
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0].paymentMethod}
                  </Typography>
                </div>
              </Col>
              <Col xxl={6} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div className=" text-end mb-3">
                  <Typography className="listing-styles-secondary">
                    Is there any deposit?
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0].hasSecurityDeposit ? 'Yes' : ' No'}
                  </Typography>
                </div>
              </Col>
              <Col xxl={6} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div className="text-end mb-3">
                  <Typography className="listing-styles-secondary">
                    Kind of Deposit
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0].depositType}
                  </Typography>
                </div>
              </Col>
              <Col xxl={8} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary">
                    Bills
                  </Typography>
                  <Typography className="listing-description">
                    Included
                  </Typography>
                </div>
              </Col>
              <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary">
                    Minimam Salary
                  </Typography>
                  <Typography className="listing-description">
                    2 Months
                  </Typography>
                </div>
              </Col>
              <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary">
                    How do you charg for electricity bill
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0].electricityBillPayment}
                  </Typography>
                </div>
              </Col>
              <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary">
                    How do you charge for gas bill
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0].gasBillPayment}
                  </Typography>
                </div>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Typography className="listing-styles-main mb-3">
                  Rules and Refrence
                </Typography>
              </Col>
              <Col xxl={6} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary">
                    Gender
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0].user.gender}
                  </Typography>
                </div>
              </Col>
              <Col xxl={6} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary">
                    Age Range
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0].maxAgePreference}
                  </Typography>
                </div>
              </Col>
              <Col xxl={6} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary">
                    Preferable
                  </Typography>
                  <Typography className="listing-description">
                    Students
                  </Typography>
                </div>
              </Col>
              <Col xxl={4} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary">
                    Couples
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0].couplesAllowed ? 'Yes' : 'No'}
                  </Typography>
                </div>
              </Col>
              <Col xxl={4} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary">
                    Allow to Registered
                  </Typography>
                  <Typography className="listing-description">
                    Yes
                  </Typography>
                </div>
              </Col>
              <Col xxl={8} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary">
                    Smoke
                  </Typography>
                  <Typography className="listing-description">
                    Not Allowed
                  </Typography>
                </div>
              </Col>
              <Col xxl={8} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary">
                    Pets
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0].petsAllowed}
                  </Typography>
                </div>
              </Col>
              <Col xxl={8} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary">
                    Musical Instruments
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0].musicalInstrumentsAllowed}
                  </Typography>
                </div>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Typography className="listing-styles-main mb-3">
                  Documents for Tenants
                </Typography>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary">
                    Proof of Income
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0].incomeProofRequired}
                  </Typography>
                </div>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Typography className="listing-styles-main mb-3">
                  Rental Conditions
                </Typography>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary">
                    Contract Type
                  </Typography>
                  <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                    <div className="mb-3">
                      <Typography className="listing-styles-secondary mt-2 mb-1">
                        {props.recentList[0].contractType}
                      </Typography>
                      <Typography className="listing-description">
                        In case a tenant moves in or moves out in the middle of
                        the month they will charge for each day during they live
                        in hostel
                      </Typography>
                    </div>
                  </Col>
                </div>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Typography className="listing-styles-main mb-3">
                  Cancelation Policy
                </Typography>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary">
                    Standard Cancellation
                  </Typography>
                  <Typography className="listing-description mt-2 mb-1">
                    In case a tenant moves in or moves out in the middle of
                    the month they will charge for each day during they live
                    in hostel
                  </Typography>
                </div>
              </Col>
            </Row>
          </div>
        </Col>

      </Row>
      {props.recentList[0]?.publicationStatus === 'pending' && (
        <Row>
          <Col xxl={24} xs={24}>
            <Space className="flex justify-center md:justify-end">
              <Button className="text-error-bg-color white-color rounded-md"
                onClick={() => {
                  action.updateStatus(props.recentList[0]?.id, 'pending')
                }}

              >Reject</Button>
              <Button className="teriary-bg-color white-color rounded-md"
                onClick={() => {
                  action.updateStatus(props.recentList[0]?.id, 'published')
                }
                }>
                Accept
              </Button>
            </Space>
          </Col>
        </Row>
      )
      }
      <Modal
        open={openModal}
        closeIcon={
          <CloseCircleFilled
            className="text-teriary-color text-xl"
            onClick={() => {
              setOpenModal(false);
            }}
          />
        }
        footer={null}
        title="Inspection Report"
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          className="login-form"
        >
          <Form.Item label='Inspector Name' name='incpectorName'>
            <Input placeholder="Incpector" />
          </Form.Item>
          <Form.Item label='Inspection Date' name='date'>
            <CommonDatePicker
              open={open}
              setOpen={setOpen}
              setValue={(e: any) => setValue(e.target.value)}
            />
          </Form.Item>
          <Form.Item label='Inspection Time' name='time'>
            <TimePicker />
          </Form.Item>
          <Form.Item label='Commentss' name='comments'>
            <TextArea placeholder="Comments" />
          </Form.Item>
          <div className="flex justify-end">
            <Space>
              <Button
                className="border-1 border-solid border-[#d83a52] text-error-color"
                onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
              <Button
                htmlType="submit"
                className="teriary-bg-color white-color rounded-md">
                Submit
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ListingDetails;
