import React, { useState, useEffect } from "react";
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps, PaginationProps } from 'antd';
import {useNavigate, useLocation } from 'react-router-dom';
import {Table, Dropdown, Typography, Row, Col, Button, Spin} from 'antd';
import {LoadingOutlined } from "@ant-design/icons";
import {IconMore, IconSignedDigitally, Documentcard} from '../../../assets/images';
import {PopUpModal, Alert, Notifications} from "../../../components";
import dayjs from 'dayjs';
import "./style.scss";
import {useRecoilValue, useRecoilState, useResetRecoilState} from "recoil";
import {bookingRequestsFilterState, currentUserRoleState} from "../../../store";
import useBookingRequests from "./actionHandler";
import constants, {ROUTES_CONSTANTS} from '../../../config/constants';
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
  const [filterBookingRequest, setFilterBookingRequest] = useRecoilState(bookingRequestsFilterState);
  const resetBookingRequest = useResetRecoilState(bookingRequestsFilterState)
  const [loading, setLoading] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [bookingRequestId, setBookingRequestId] = useState(null);
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;
  const [propertyContractId, setPropertyContractId] = useState(null);
  const [loadingContract, setLoadingContract] = useState(false);
  const role = useRecoilValue(currentUserRoleState);
  const {
    getBookingRequests,
    bookingRequests,
    totalRequests,
    cancelBookingRequest,
    getContractDetail,
    propertyContractDetail
  } = useBookingRequests();

  let signContractMenu:any;
  let viewContractMenu:any;
  if(role === constants.STUDENT) {
    signContractMenu = {label: 'Sign contract', key: 'signContract'};
    viewContractMenu = {label: 'View contract', key: 'viewContract'};
  }

  const itemsPending: MenuProps['items'] = [
    {
      label: 'View Details',
      key: 'viewDetails',
    },
    signContractMenu,
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
    viewContractMenu,
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
  const itemsNoContract: MenuProps['items'] = [
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
        const rowNumber = (currentPage - 1) * pageSize + index + 1
        return rowNumber < 10 ? `0${rowNumber}` : rowNumber;
      },
    },
    {
      title: 'Agent Name',
      dataIndex: 'tenant',
      render: (_, row:any) => {
        return (
          <>{row?.agent?.firstName} {row?.agent?.lastName}</>
        );
      },
    },
    {
      title: 'Address',
      dataIndex: 'property',
      render: (_, row:any) => {
        return (
          <>{row?.property?.addressOne}</>
        );
      },
    },
    {
      title: 'Booking Duration',
      dataIndex: 'bookingDuration',
      render: (_, row:any) => {
        return (
          <>{dayjs(row?.bookingStartDate).format('DD/MM/YYYY')} - {dayjs(row?.bookingEndDate).format('DD/MM/YYYY')}</>
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
      render: (_, row:any) => ((row.status === 'rejected' || row.contracts.length === 0) ? '-' : <Documentcard />)
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      render: (_, row:any,) => {
        return (
          <div className={`shs-status-badge ${row.status === 'rejected'? 'rejected': row.status === 'pending'? 'pending': row.status === 'reserved' ? 'success': ''}`}>
            {row.status === 'rejected'? 'Rejected': row.status === 'pending'? 'Pending': row.status === 'reserved' ? 'Reserved' : ''}
          </div>
        );
      },
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      align: 'center',
      render: (_, row:any) => {
        return (
          <Dropdown
            overlayClassName="shs-dropdown"
            placement="bottomRight"
            trigger={['click']}
            menu={{
              items: (
                (row.contracts.length !== 0 && row.status === 'pending') ? itemsNoContract 
                : (row.contracts.length === 0 && row.status === 'pending') ? itemsPending 
                : (row.status === 'rejected') ? itemsRejected 
                : itemsReserved
              ),
              onClick: ({key}) => handleActionItem(key, row) 
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
    getBookingRequests(filterBookingRequest, setLoading)
  }, [filterBookingRequest, isCancel]);

  useEffect(() => {
    return () => {
      resetBookingRequest();
    }
  }, []);

  useEffect(() => {
    if(modalViewContractOpen) {
      getContractDetail(propertyContractId, setLoadingContract)
    }
  }, [modalViewContractOpen]);


    /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleCancelBooking = async (id:any) => {
    setLoadingCancel(true)
    const response = await cancelBookingRequest(id)
    if(!response.error) {
      Notifications({ title: 'Success', description: response.message, type: 'success' })
      setLoadingCancel(false);
      setIsCancel(!isCancel)
    } else {
      setLoadingCancel(false);
      Notifications({ title: 'Error', description: response.message, type: 'error' })
    }
  }


  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const openModalViewContract = (id:any) => {
    setPropertyContractId(id)
    setModalViewContractOpen(true)
  }

  const closeModalViewContract = () => {
    setModalViewContractOpen(false)
  }

  function openModalCancelBooking() {
    setModalCancelBookingOpen(true)
  }

  function closeModalCancelBooking() {
    setBookingRequestId(null)
    setModalCancelBookingOpen(false)
  }

  function handleActionItem (key:any, row:any) {
    const {property, contracts, id} = row;
    if(key === 'viewDetails') {
      navigate(`/${ROUTES_CONSTANTS.PROPERTY_DETAIL}/${property?.id}`, {state: {from: location.pathname}})
    }
    if(key === 'viewContract') {
      openModalViewContract(contracts[0]?.id)
    }
    if(key === 'chatWithAgent') {
      navigate(`/chat`)
    }
    if(key === 'cancelBooking') {
      openModalCancelBooking()
      setBookingRequestId(id)
    }
    if(key === 'signContract') {
      navigate(`/${ROUTES_CONSTANTS.RECEIVED_VIEW}`, { state: propertyContractDetail?.detail })
    }
  }

  const handlePagination:PaginationProps['onChange'] = (page:any) => {
    setCurrentPage(page.current)
    setFilterBookingRequest((prev:any) => {
      return {...prev, page: page.current}
    })
  };


  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <>
      <div className="booking-requests">
        <div className="shs-table-card">
          <div className="shs-table">
            <Table
              loading={{spinning: loading, indicator: <LoadingOutlined />}}
              scroll={{ x: "max-content" }}
              columns={tableColumns}
              dataSource={bookingRequests}
              onChange={(page:any, pageSize:any) => handlePagination(page, pageSize)}
              pagination={totalRequests > 7 ? {
                pageSize: 7,
                current: currentPage,
                total: totalRequests,
                showTotal: (total) => <>Total: {total}</>
              } : false}
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
        width={1200}
        wrapClassName={'modal-view-contract'}
      >
        <Spin spinning={loadingContract} indicator={<LoadingOutlined />}>
          <>
            <div className="contractors-info">       
              <Row gutter={30}>
                <Col xs={12}>
                  <div className="info-card">
                    <ul className="info-card-list">
                      <li>
                        <div className="info-card-item-label">Full Name</div>
                        <div className="info-card-item-value">
                          {propertyContractDetail?.detail?.sender?.firstName} {propertyContractDetail?.detail?.sender?.lastName}
                        </div>
                      </li>
                      <li>
                        <div className="info-card-item-label">Address</div>
                        <div className="info-card-item-value">
                          {propertyContractDetail?.detail?.sender?.address === "" ? "N/A" : propertyContractDetail?.detail?.sender?.address}
                        </div>
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
                        <div className="info-card-item-value">
                          {propertyContractDetail?.detail?.user?.firstName} {propertyContractDetail?.detail?.user?.lastName}
                        </div>
                      </li>
                      <li>
                        <div className="info-card-item-label">Address</div>
                        <div className="info-card-item-value">
                          {propertyContractDetail?.detail?.user?.address === "" ? "N/A" : propertyContractDetail?.detail?.user?.address}
                        </div>
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
                <div dangerouslySetInnerHTML={{ __html: propertyContractDetail?.detail?.content }} />
              </Typography.Text>
            </div>
            <div className="contractors-info">
              <Row gutter={30}>
                {/* Digitally Signed Card Sender */}
                <Col xs={12}>
                  <div className="digitally-signed-card">
                    <ul className="signed-card-list">
                      <li>
                        <div className="signed-card-item-label">Full Name</div>
                        <div className="signed-card-item-value">{propertyContractDetail?.detail?.sender?.firstName} {propertyContractDetail?.detail?.sender?.lastName}</div>
                      </li>
                      <li>
                        <div className="signed-card-item-label">Address</div>
                        <div className="signed-card-item-value">{propertyContractDetail?.detail?.sender?.address === "" ? "N/A" : propertyContractDetail?.detail?.sender?.address}</div>
                      </li>
                      <li>
                        <div className="signed-card-item-label">Hereinafter referred to as</div>
                        <div className="signed-card-item-value">Sender</div>
                      </li>
                      <li>
                        <div className="signed-card-item-label">Email</div>
                        <div className="signed-card-item-value">{propertyContractDetail?.detail?.sender?.email}</div>
                      </li>
                    </ul>
                    <div className="signed-card-footer">
                      <div className="signed-card-footer-logo">
                        <IconSignedDigitally />
                      </div>
                      <div className="signed-card-footer-content">
                        <div>Signed digitally</div>
                        <div>{dayjs(propertyContractDetail?.detail?.createdAt).format(`DD MMMM YYYY [at] h:mm A`)}</div>
                      </div>
                    </div>
                  </div>
                </Col>
                {/* Digitally Signed Card Receiver */}
                <Col xs={12}>
                  <div className="digitally-signed-card">
                    <ul className="signed-card-list">
                      <li>
                        <div className="signed-card-item-label">Full Name</div>
                        <div className="signed-card-item-value">{propertyContractDetail?.detail?.user?.firstName} {propertyContractDetail?.detail?.user?.lastName}</div>
                      </li>
                      <li>
                        <div className="signed-card-item-label">Address</div>
                        <div className="signed-card-item-value">
                          {propertyContractDetail?.detail?.user?.address === "" ? "N/A" : propertyContractDetail?.detail?.user?.address}
                        </div>
                      </li>
                      <li>
                        <div className="signed-card-item-label">Hereinafter referred to as</div>
                        <div className="signed-card-item-value">Receiver</div>
                      </li>
                      <li>
                        <div className="signed-card-item-label">Email</div>
                        <div className="signed-card-item-value">{propertyContractDetail?.detail?.user?.email}</div>
                      </li>
                    </ul>
                    <div className="signed-card-footer">
                      <div className="signed-card-footer-logo">
                        <IconSignedDigitally />
                      </div>
                      <div className="signed-card-footer-content">
                        <div>Signed digitally</div>
                        <div>{dayjs(propertyContractDetail?.detail?.createdAt).format(`DD MMMM YYYY [at] h:mm A`)}</div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </>
        </Spin>
      </PopUpModal>
      {/* ENDS: MODAL VIEW CONTRACT
      *************************************************************************/}

      <Alert
        type="error"
        width={570}
        state={modalCancelBookingOpen}
        setState={setModalCancelBookingOpen}
        children={<p>Do you really want to cancel this booking?</p>}
        footer={[
          <Button className="button-secondary" ghost onClick={() => closeModalCancelBooking()}>No</Button>,
          <Button 
            className="button-secondary" 
            loading={loadingCancel} 
            onClick={() => {
              handleCancelBooking(bookingRequestId);
              closeModalCancelBooking()
            }}
          >
            Yes
          </Button>,
        ]}
      />
    </>
  )
}

export default BookingRequests;
