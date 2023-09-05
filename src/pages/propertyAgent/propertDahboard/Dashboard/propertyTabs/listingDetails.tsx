import React, { useEffect, useState } from "react";
import {
  Col,
  Divider,
  Row,
  Typography,
  Button, Space, Modal, Form, Input, TimePicker
} from "antd";
import '../../../style.scss';
import { CloseCircleFilled } from "@ant-design/icons";
import { ButtonThemePrimary, CommonDatePicker } from "../../../../../components";
import type { Dayjs } from 'dayjs';
import useCustomHook from "../../../actionHandler";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from 'dayjs';
const { TextArea } = Input;

const ListingDetails = (props: any) => {
  let { id: propertyId }: any = useParams();
  const router = useNavigate();
  const action = useCustomHook();
  const [openModal, setOpenModal] = useState(false);
  const [rejectData, setRejectData] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    action.getRecentListing();
  }, [])

  const onFinish = (values: any) => {
    const {
      inspectorName,
      inspectionDate,
      inspectionTime,
      comments
    } = values;
    action.submitInspectionReport({
      propertyId: parseInt(propertyId),
      inspectorName: inspectorName,
      inspectionDate: inspectionDate,
      inspectionTime: dayjs(inspectionTime).format('HH:mm'),
      comments: comments
    })
    action.updateStatus(props.recentList[0]?.id, rejectData,
      () => {
        action.getAllListingData({})
      })
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
              {props.recentList[0]?.addressOne || 'N/A'}
            </Typography>
          </div>
          <div className="mt-4 mb-3">
            <Typography className="listing-styles-secondary">
              Postal Code
            </Typography>
            <Typography className="listing-description">
              {props.recentList[0]?.postCode || 'N/A'}
            </Typography>
          </div>
          <div className="mt-4 mb-3">
            <Typography className="listing-styles-secondary">
              Is it furnished
            </Typography>
            <Typography className="listing-description">
              {props.recentList[0]?.isFurnished ? 'Yes' : 'No' || 'N/A'}
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
        <Col xxl={18} xl={18} lg={18} md={24} sm={24} xs={24} >
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
              {props.recentList[0]?.propertyType || 'N/A'}
            </Typography>
          </div>
          <div>
            <Row gutter={[15, 15]}>
              <Col xxl={8} xl={12} lg={12} md={24} sm={24} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary mb-2">
                    Bedrooms in total
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0]?.totalBedrooms || 'N/A'}
                  </Typography>
                </div>
              </Col>
              <Col xxl={8} xl={12} lg={12} md={24} sm={24} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary mb-2">
                    Bedroom for rent
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0]?.bedroomsForRent || 'N/A'}
                  </Typography>
                </div>
              </Col>
              <Col xxl={8} xl={12} lg={12} md={24} sm={24} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary mb-2">
                    Bathroom
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0]?.totalBathrooms || 'N/A'}
                  </Typography>
                </div>
              </Col>
              <Col xxl={8} xl={12} lg={12} md={24} sm={24} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary mb-3">
                    Air Conditioning
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0]?.hasAirConditioning || 'N/A'}
                  </Typography>
                </div>
              </Col>
              <Col xxl={8} xl={12} lg={12} md={24} sm={24} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary">
                    Heating
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0]?.hasHeating || 'N/A'}
                  </Typography>
                </div>
              </Col>
              <Col xxl={8} xl={12} lg={12} md={24} sm={24} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary ">
                    Water heating system
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0]?.hasWaterHeating || 'N/A'}
                  </Typography>
                </div>
              </Col>
              <Col xxl={8} xl={12} lg={12} md={24} sm={24} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary">
                    Building has
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0]?.buildingHas || 'N/A'}
                  </Typography>
                </div>
              </Col>
              <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary">
                    Property
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0]?.propertyHas || 'N/A'}
                  </Typography>
                </div>
              </Col>
              <Col xxl={24} xl={12} lg={12} md={24} sm={24} xs={24}>
                <Typography className="listing-styles-main mt-3 mb-3">
                  BedRoom Details
                </Typography>
                <div className="mt-3 mb-3">
                  <Typography className="listing-styles-secondary">
                    Bed Type
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0]?.bedType || 'N/A'}
                  </Typography>
                </div>
              </Col>
              <Col xxl={24} xl={12} lg={12} md={24} sm={24} xs={24}>
                <div className="mt-3 mb-3">
                  <Typography className="listing-styles-secondary">
                    Access to
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0]?.propertyHas || 'N/A'}
                  </Typography>
                </div>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <div className="mt-3 mb-3">
                  <Typography className="listing-styles-secondary">
                    Are two people allowed to live in this room
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0]?.twoPeopleAllowed || 'N/A'}
                  </Typography>
                </div>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Typography className="listing-styles-main mb-3">
                  Rent and Billing
                </Typography>
              </Col>
              <Col xxl={6} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary">
                    Monthly Rent
                  </Typography>
                  <Typography className="listing-description">
                    ${props.recentList[0]?.rent || 'N/A'}
                  </Typography>
                </div>
              </Col>
              <Col xxl={6} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary">
                    Payment
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0]?.paymentMethod || 'N/A'}
                  </Typography>
                </div>
              </Col>
              <Col xxl={6} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div className=" text-end mb-3">
                  <Typography className="listing-styles-secondary">
                    Is there any deposit?
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0]?.hasSecurityDeposit ? 'Yes' : ' No' || 'N/A'}
                  </Typography>
                </div>
              </Col>
              <Col xxl={6} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div className="text-end mb-3">
                  <Typography className="listing-styles-secondary">
                    Kind of Deposit
                  </Typography>
                  <Typography className="listing-description ">
                    {props.recentList[0]?.depositType || 'N/A'}
                  </Typography>
                </div>
              </Col>
              <Col xxl={7} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary">
                    Bills
                  </Typography>
                  <Typography className="listing-description">
                    Included
                  </Typography>
                </div>
              </Col>
              <Col xxl={7} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary">
                    Minimum Stay
                  </Typography>
                  <Typography className="listing-description">
                    2 Months
                  </Typography>
                </div>
              </Col>
              <Col xxl={8} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary">
                    How do you charge for electricity bill
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0]?.electricityBillPayment || 'N/A'}
                  </Typography>
                </div>
              </Col>
              <Col xxl={8} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary">
                    How do you charge for gas bill
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0]?.gasBillPayment || 'N/A'}
                  </Typography>
                </div>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Typography className="listing-styles-main mb-3">
                  Rules and refrences
                </Typography>
              </Col>
              <Col xxl={6} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary">
                    Gender
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0]?.genderPreference || 'N/A'}
                  </Typography>
                </div>
              </Col>
              <Col xxl={6} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary">
                    Age Range
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0]?.maxAgePreference || 'N/A'}
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
                    {props.recentList[0]?.couplesAllowed ? 'Yes' : 'No' || 'N/A'}
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
                    {props.recentList[0]?.petsAllowed || 'N/A'}
                  </Typography>
                </div>
              </Col>
              <Col xxl={8} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary">
                    Musical Instruments
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0]?.musicalInstrumentsAllowed || 'N/A'}
                  </Typography>
                </div>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Typography className="listing-styles-main mb-3">
                  Documents for tenants
                </Typography>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <div className="mb-3">
                  <Typography className="listing-styles-secondary">
                    Proof of Income
                  </Typography>
                  <Typography className="listing-description">
                    {props.recentList[0]?.incomeProofRequired || 'N/A'}
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
                        {props.recentList[0]?.contractType || 'N/A'}
                      </Typography>
                      <Typography className="listing-description">
                        {
                          props.recentList[0]?.contractType === 'Monthly' ?
                            ('The tenant will always pay the entire months rent, regardless of the move-in/move-out date. For example: if the tenant moves in on the 28th August, they will pay for the full month of August.') :
                            props.recentList[0]?.contractType === 'Daily' ?
                              ('In case a tenant moves in or moves out in the middle of the month, they will be charged for each day they stayed during that month. For example: if the tenant moves in on the 28th August, they will pay for four days of rent in August.')
                              :
                              props.recentList[0]?.contractType === 'Weekly' ?
                                ('The tenant will pay half of the months rent if they stay less than two weeks in the month of move in/move out. For example: if the tenant moves in on the 28th of August, they will pay half of the rent for August.')
                                :
                                'N/A'
                        }
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
                    {props.recentList[0]?.cancellationPolicy || 'N/A'}
                  </Typography>
                  <Typography className="listing-description mt-2 mb-1">
                    {props.recentList[0]?.cancellationPolicy === 'Standard Cancellation' ?
                      ('if tenant cancels a booking:- Within 24 hours of confirmation - Full refund of the first months rent- After 24 hours of confirmation - No refund')
                      : props.recentList[0]?.cancellationPolicy === 'Flexible Cancellation' ?
                        ('If tenant cancels a booking within 24 hours of confirmation- Full refund of the first months rent. If the tenant cancels a booking when move-in date is: - More than 30 days away - Fill refund of first months rent - 30 to 7 days away - 50% refund of first months rent')
                        :
                        'N/A'
                    }
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
                  setRejectData('rejected')
                  setOpenModal(true);
                }}
              >
                Reject
              </Button>
              <Button className="teriary-bg-color white-color rounded-md"
                onClick={() => {
                  setRejectData('published')
                  setOpenModal(true);
                }}
              >
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
          <Form.Item label='Inspector Name' name='inspectorName'>
            <Input placeholder="Incpector" />
          </Form.Item>
          <Form.Item label='Inspection Date' name='inspectionDate'>
            <CommonDatePicker
              open={open}
              setOpen={setOpen}
              setValue={(e: any) => setValue(e.target.value)}
            />
          </Form.Item>
          <Form.Item label='Inspection Time' name='inspectionTime'>
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
              <ButtonThemePrimary
                htmlType="submit">
                Submit
              </ButtonThemePrimary>
            </Space>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ListingDetails;
