import React, { useState, useEffect } from "react";
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { Table, Dropdown, Typography, Row, Col } from 'antd';
import { IconMore, IconSignedDigitally, Documentcard } from '../../../assets/images';
import { PopUpModal, Alert, Loader } from "../../../components";
import dayjs from 'dayjs';
import "./style.scss";
import { useRecoilValue, useResetRecoilState} from "recoil";
import { bookingRequestsState, bookingRequestsFilterState, bookingRequestsSearchState } from "../../../store";
import useBookingRequests from "./actionHandler";
import {ROUTES_CONSTANTS} from '../../../config/constants';
interface DataType {
  key: React.Key;
  tenant: any;
  property: any;
  bookingDuration: string;
  bookingStartDate: string;
  bookingEndDate: string;
  rent: string;
  contracts: any;
  status: string;
}


const BookingRequests = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate();
  const location = useLocation();
  const [modalViewContractOpen, setModalViewContractOpen] = useState(false);
  const [modalCancelBookingOpen, setModalCancelBookingOpen] = useState(false);
  const bookingRequests = useRecoilValue(bookingRequestsState);
  const filterBookingRequest = useRecoilValue(bookingRequestsFilterState);
  const resetBookingRequest = useResetRecoilState(bookingRequestsFilterState)
  const {getBookingRequests, getSearchBookingRequests} = useBookingRequests();
  const [loading, setLoading] = useState(false);
  const searchBookingRequest= useRecoilValue(bookingRequestsSearchState)

  const itemsPending: MenuProps['items'] = [
    {
      label: 'View Details',
      key: 'viewDetails',
    },
    {
      label: 'Sign contract',
      key: 'signContract',
    },
    {
      label: 'Chat with agent',
      key: 'chatWithAgent',
    },
    {
      label: 'Cancel booking',
      key: 'cancelBooking',
    },
  ];

  const itemsReserved: MenuProps['items'] = [
    {
      label: 'View Details',
      key: 'viewDetails',
    },
    {
      label: 'View contract',
      key: 'viewContract',
    },
    {
      label: 'Chat with agent',
      key: 'chatWithAgent',
    },
  ];

  const itemsRejected: MenuProps['items'] = [
    {
      label: 'View Details',
      key: 'viewDetails',
    },
    {
      label: 'Chat with agent',
      key: 'chatWithAgent',
    },
  ];

  const itemsNoCntracted: MenuProps['items'] = [
    {
      label: 'View Details',
      key: 'viewDetails',
    },
    {
      label: 'Chat with agent',
      key: 'chatWithAgent',
    },
    {
      label: 'Cancel booking',
      key: 'cancelBooking',
    },
  ];
  
  const tableColumns: ColumnsType<DataType> = [
  {
    title: 'No',
    dataIndex: 'no.',
    align: 'center',
    render: (_, row, index) => {
      return (
        <>{index + 1}</>
      );
    },
  },
  {
    title: 'Agent Name',
    dataIndex: 'tenant',
    render: (_, row, index) => {
      return (
        <>{row.tenant.firstName} {row.tenant.lastName}</>
      );
    },
  },
  {
    title: 'Address',
    dataIndex: 'property',
    render: (_, row, index) => {
      return (
        <>{row.property.addressOne}</>
      );
    },
  },
  {
    title: 'Booking Duration',
    dataIndex: 'bookingDuration',
    render: (_, row, index) => {
      return (
        <>{dayjs(row.bookingStartDate).format('DD/MM/YYYY')} - {dayjs(row.bookingEndDate).format('DD/MM/YYYY')}</>
      );
    },
  },
  {
    title: 'Rent',
    dataIndex: 'rent',
  },
  {
    title: 'Contracts',
    dataIndex: 'contracts',
    align: 'center',
    render: (_, row, index) => row.contracts ? <Documentcard /> : '-'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    align: 'center',
    render: (_, row, index) => {
      return (
        <div className={`shs-status-badge ${row.status === 'rejected'? 'rejected': row.status === 'pending'? 'pending': 'success'}`}>
          {row.status === 'rejected'? 'Rejected': row.status === 'pending'? 'Pending': 'Reserved'}
        </div>
      );
    },
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    align: 'center',
    render: (text, record, index) => {
      return (
        <Dropdown
          overlayClassName="shs-dropdown" 
          placement="bottomRight"
          trigger={['click']}
          menu={{ 
            items: record.contracts && record.status? itemsNoCntracted: record.status === 'pending' ? itemsPending : record.status === 'rejected' ? itemsRejected: itemsReserved,
            onClick: ({key}) => handleActionItem(key, record.property.id) 
          }}
        >
          <div className="dropdown-button">
            <IconMore />
          </div>
        </Dropdown>
      );
    },
  },
];



  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    resetBookingRequest()
    getBookingRequests(filterBookingRequest, setLoading)
  }, [])

  useEffect(() => {
    getBookingRequests(filterBookingRequest, setLoading)
  }, [filterBookingRequest])

  useEffect(() => {
    getSearchBookingRequests(searchBookingRequest, setLoading)
  }, [searchBookingRequest])

  console.log('filterBookingRequest::: ', filterBookingRequest)

    /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const openModalViewContract = () => {
    setModalViewContractOpen(true)
  }

  const closeModalViewContract = () => {
    setModalViewContractOpen(false)
  }

  function openModalCancelBooking() {
    setModalCancelBookingOpen(true)
  }

  function handleActionItem (key:any, id:any) {
    if(key === 'viewDetails') {
      navigate(`/${ROUTES_CONSTANTS.PROPERTY_DETAIL}/${id}`, {state: {from: location.pathname}})
    }
    if(key === 'viewContract') {
      openModalViewContract()
    }
    if(key === 'chatWithAgent') {
      navigate(`/chat`)
    }
    if(key === 'cancelBooking') {
      openModalCancelBooking()
    }
  }


  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <>
      <div className="booking-requests">
        <div className="shs-table-card">
          <div className="shs-table">
            <Table
              loading={{spinning: loading, indicator: <Loader />}}
              scroll={{ x: "max-content" }}
              columns={tableColumns}
              dataSource={bookingRequests}
              pagination={{pageSize: 7, showTotal: (total) => <>Total: <span>{total}</span></> }}
            />
          </div>
        </div>
      </div>

      {/* STARTS: MODAL VIEW CONTRACT
      *************************************************************************/}
      <PopUpModal
        open={modalViewContractOpen}
        close={closeModalViewContract}
        footer={null}
        width={684}
        wrapClassName={'modal-view-contract'}
      >
        <div className="contractors-info">
          <Row gutter={12}>
            <Col xs={12}>
              <div className="info-card">
                <ul className="info-card-list">
                  <li>
                    <div className="info-card-item-label">Full Name</div>
                    <div className="info-card-item-value">David Miller</div>
                  </li>
                  <li>
                    <div className="info-card-item-label">Address</div>
                    <div className="info-card-item-value">London, United Kingdom</div>
                  </li>
                  <li>
                    <div className="info-card-item-label">Hereinafter referred to as</div>
                    <div className="info-card-item-value">Sender</div>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xs={12}>
              <div className="info-card">
                <ul className="info-card-list">
                  <li>
                    <div className="info-card-item-label">Full Name</div>
                    <div className="info-card-item-value">David Miller</div>
                  </li>
                  <li>
                    <div className="info-card-item-label">Address</div>
                    <div className="info-card-item-value">London, United Kingdom</div>
                  </li>
                  <li>
                    <div className="info-card-item-label">Hereinafter referred to as</div>
                    <div className="info-card-item-value">Receiver</div>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
        <div className="contact-letter">
          <Typography.Text>
            <div>MM/DD/YYYY</div>
            <div>Candidate First and Last Name</div>
            <div>Candidate AddressCity, State, Zip</div>
          </Typography.Text>
          <Typography.Text>Dear [Candidate Name],</Typography.Text>
          <Typography.Text>
          We are pleased to offer you the [full-time, part-time, etc.] position of [job title] at [company name] with a start date of [start date]. You will be reporting directly to [manager/supervisor name] at [workplace location]. We believe your skills and experience are an excellent match for our company.
          </Typography.Text>
          <Typography.Text>In this role, you will be required to [briefly mention relevant job duties and responsibilities].</Typography.Text>
          <Typography.Text>The annual starting salary for this position is [dollar amount] to be paid on a [monthly, semi-monthly, weekly, etc.] basis by [direct deposit, check, etc.], starting on [first pay period]. In addition to this starting salary, we’re offering you [discuss stock options, bonuses, commission structures, etc. — if applicable].</Typography.Text>
          <Typography.Text>Your employment with [Company Name] will be on an at-will basis, which means you and the company are free to terminate the employment relationship at any time for any reason. This letter is not a contract or guarantee of employment for a definitive period of time.</Typography.Text>
          <Typography.Text>As an employee of [Company Name], you are also eligible for our benefits program, which includes [medical insurance, 401(k), vacation time, etc.], and other benefits which will be described in more detail in the [employee handbook, orientation package, etc.].</Typography.Text>
          <Typography.Text>Please confirm your acceptance of this offer by signing and returning this letter by [offer expiration date].</Typography.Text>
          <Typography.Text>We are excited to have you join our team! If you have any questions, please feel free to reach out at any time.</Typography.Text>
          <Typography.Text>
            <div>Sincerely,[Your Signature]</div>
            <div>[Your Printed Name]</div>
            <div>[Your Job Title]</div>
          </Typography.Text>
        </div>
        <div className="contractors-info">
          <Row gutter={12}>
            <Col xs={12}>
            <div className="digitally-signed-card">
                <ul className="signed-card-list">
                  <li>
                    <div className="signed-card-item-label">Full Name</div>
                    <div className="signed-card-item-value">David Miller</div>
                  </li>
                  <li>
                    <div className="signed-card-item-label">Address</div>
                    <div className="signed-card-item-value">London, United Kingdom</div>
                  </li>
                  <li>
                    <div className="signed-card-item-label">Hereinafter referred to as</div>
                    <div className="signed-card-item-value">Receiver</div>
                  </li>
                </ul>
                <div className="signed-card-footer">
                  <div className="signed-card-footer-logo">
                    <IconSignedDigitally />
                  </div>
                  <div className="signed-card-footer-content">
                    <div>Signed digitally</div>
                    <div>26 January 2023 at 12:56 PM</div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12}>
              <div className="digitally-signed-card">
                <ul className="signed-card-list">
                  <li>
                    <div className="signed-card-item-label">Full Name</div>
                    <div className="signed-card-item-value">David Miller</div>
                  </li>
                  <li>
                    <div className="signed-card-item-label">Address</div>
                    <div className="signed-card-item-value">London, United Kingdom</div>
                  </li>
                  <li>
                    <div className="signed-card-item-label">Hereinafter referred to as</div>
                    <div className="signed-card-item-value">Receiver</div>
                  </li>
                </ul>
                <div className="signed-card-footer">
                  <div className="signed-card-footer-logo">
                    <IconSignedDigitally />
                  </div>
                  <div className="signed-card-footer-content">
                    <div>Signed digitally</div>
                    <div>26 January 2023 at 12:56 PM</div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </PopUpModal>
      {/* ENDS: MODAL VIEW CONTRACT
      *************************************************************************/}

      <Alert
        type="error"
        width={570}
        state={modalCancelBookingOpen}
        setState={setModalCancelBookingOpen}
        cancelBtntxt={'No'}
        okBtntxt={'Yes'}
        // okBtnFunc={}
        children={<p>Do you really want to cancel this booking?</p>}
      />
    </>
  )
}

export default BookingRequests