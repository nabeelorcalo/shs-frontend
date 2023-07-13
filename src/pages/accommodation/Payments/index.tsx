import React, { useState, useEffect } from "react";
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { Table, Dropdown, Typography, Row, Col } from 'antd';
import { LoadingOutlined } from "@ant-design/icons";
import { IconReceipt, IconSignedDigitally, Documentcard } from '../../../assets/images';
import { PopUpModal, ExtendedButton, Loader } from "../../../components";
import "./style.scss";
import dayjs from 'dayjs';
// import utcPlugin from 'dayjs/plugin/utc';
// import timezone from "dayjs/plugin/timezone";
// dayjs.extend(utcPlugin);
// dayjs.extend(timezone);
import usePaymentsHook from './actionHandler';
import {paymentsFilterState} from '../../../store'
import { useRecoilValue, useResetRecoilState } from "recoil";

interface DataType {
  key: React.Key;
  agent: string;
  address: string;
  durationBooking: string;
  rentAmount: string;
  createdAt: string;
  status: string;
  receipt: boolean
}


const Payments = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const {getPayments, paymentList} = usePaymentsHook();
  const paymentFilters = useRecoilValue(paymentsFilterState)
  const resetPaymentFilter = useResetRecoilState(paymentsFilterState)
  const [loading, setLoading] = useState(false);
  const [modalPaymentReceiptOpen, setModalPaymentReceiptOpen] = useState(false);
  const [paymentDetail, setPaymentDetail]:any = useState({})
  // const now = dayjs();
  // const timeZoneOffset = now.format('Z');
  
  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    resetPaymentFilter()
    getPayments(setLoading, paymentFilters)
  }, [])

  useEffect(() => {
    getPayments(setLoading, paymentFilters)
  }, [paymentFilters])

console.log('paymentList:: ', paymentList)

  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const openModalPaymentReceipt = (id:any) => {
    const payment:any = paymentList.find((elem:any) => elem.id === id)
    const offset = dayjs(payment?.updatedAt).utcOffset();
    console.log('offset', offset)
    setPaymentDetail(payment || {})
    setModalPaymentReceiptOpen(true)
  }
  
  const closeModalPaymentReceipt = () => {
    setModalPaymentReceiptOpen(false)
  }


  /* TABLE COLUMNS
  -------------------------------------------------------------------------------------*/
  const tableColumns: ColumnsType<any> = [
    {
      title: 'No',
      dataIndex: 'no.',
      align: 'center',
      render: (_, row, index) => {
        return (
          <>{index < 9 ? 0 : null}{index + 1}</>
        );
      },
    },
    {
      title: 'Agent Name',
      dataIndex: 'agent',
      render: (_, row) => {
        return (
          <>{`${row?.booking?.agent?.firstName} ${row?.booking?.agent?.lastName}`} </>
        );
      },
    },
    {
      title: 'Address',
      dataIndex: 'address',
      render: (_, row) => {
        return (
          <>{row?.booking?.property?.addressOne}</>
        );
      },
    },
    {
      title: 'Rent Period',
      dataIndex: 'rentPeriod',
      render: (_, row) => {
        return (
          <>{dayjs(row?.booking?.bookingStartDate).format('DD/MM/YYYY')} - {dayjs(row?.booking?.bookingEndDate).format('DD/MM/YYYY')}</>
        );
      },
    },
    {
      title: 'Rent Amount',
      dataIndex: 'rentAmount',
      render: (_, row) => {
        return (
          <>£{row?.booking?.discountedRent}/{row?.booking?.rentDuration}</>
        );
      },
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      render: (_, row) => {
        return (
          <>{dayjs(row.createdAt).format('DD/MM/YYYY')}</>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      render: (_, row, index) => {
        return (
          <div className="shs-status-badge success">
            Paid
          </div>
        );
      },
    },
    {
      title: 'Receipt',
      dataIndex: 'receipt',
      align: 'center',
      render: (_, row, index) => {
        return (
          <div className="table-cell-btn" onClick={() => openModalPaymentReceipt(row.id)}>
            <IconReceipt />
          </div>
        );
      },
    },
  ];



  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <>
    <div className="accommodation-payments">
      <div className="shs-table-card">
        <div className="shs-table">
          <Table
            loading={{spinning: loading, indicator: <LoadingOutlined />}}
            scroll={{ x: "max-content" }}
            columns={tableColumns}
            dataSource={paymentList}
            pagination={{pageSize: 7, showTotal: (total) => <>Total: {total}</> }}
          />
        </div>
      </div>
    </div>

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
          
          <div className="paid-information">
            {/* <div className="payment-date">20 June 2022 20:38 UTC +1</div> */}
            <div className="payment-date">
            {dayjs(paymentDetail?.updatedAt).format('DD MMMM YYYY HH:mm [UTC] Z')}
              {/* {dayjs(paymentDetail?.updatedAt).format('DD MMMM YYYY HH:mm [UTC]')} {Math.abs(Math.floor(dayjs(paymentDetail?.updatedAt).utcOffset() / 60))} */}
            </div>
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

          <ExtendedButton block customType="tertiary" onClick={closeModalPaymentReceipt}>Print Receipt</ExtendedButton>

        </div>
      </PopUpModal>
      {/* ENDS: MODAL PAYMENT RECEIPT
      *************************************************************************/}
  </>
  )
}

export default Payments