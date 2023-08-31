import React, { useState, useEffect, useRef } from "react";
import type { ColumnsType } from 'antd/es/table';
import type { PaginationProps } from 'antd';
import { Table } from 'antd';
import { LoadingOutlined } from "@ant-design/icons";
import { IconReceipt } from '../../../assets/images';
import { PopUpModal, ButtonThemePrimary } from "../../../components";
import "./style.scss";
import dayjs from 'dayjs';
import usePaymentsHook from './actionHandler';
import {paymentsFilterState} from '../../../store'
import { useRecoilState, useResetRecoilState } from "recoil";
import { useReactToPrint } from 'react-to-print';



const Payments = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const {getPayments, paymentList, totalRequests} = usePaymentsHook();
  const [paymentFilters, setPaymentFilters] = useRecoilState(paymentsFilterState);
  const resetPaymentFilter = useResetRecoilState(paymentsFilterState);
  const [loading, setLoading] = useState(false);
  const [modalPaymentReceiptOpen, setModalPaymentReceiptOpen] = useState(false);
  const [paymentDetail, setPaymentDetail]:any = useState({});
  const printRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);


  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    getPayments(setLoading, paymentFilters)
  }, [paymentFilters]);

  useEffect(() => {
    return () => {
      resetPaymentFilter();
    }
  }, []);



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const openModalPaymentReceipt = (id:any) => {
    const payment:any = paymentList.find((elem:any) => elem.id === id)
    setPaymentDetail(payment || {})
    setModalPaymentReceiptOpen(true)
  }
  
  const closeModalPaymentReceipt = () => {
    setModalPaymentReceiptOpen(false)
  }

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handlePagination:PaginationProps['onChange'] = (page:any) => {
    setCurrentPage(page.current)
    setPaymentFilters((prev:any) => {
      return {...prev, page: page.current}
    })
  };


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

    {/* STARTS: MODAL PAYMENT RECEIPT 
      *************************************************************************/}
      <PopUpModal
        title="Payment Receipt"
        open={modalPaymentReceiptOpen}
        close={closeModalPaymentReceipt}
        width={700}
        footer={null}
        wrapClassName="modal-payment-receipt"
      >
        <div className="payment-receipt-wrapper" ref={printRef}>
          <div className="paid-information">
            <div className="payment-date">
              {dayjs(paymentDetail?.updatedAt).format('DD MMMM YYYY HH:mm [UTC]')} {dayjs(paymentDetail?.updatedAt).format('Z').split(':')[0]}
            </div>
            <div className="paid-amount">
              <div className="paid-amount-amount">£{paymentDetail?.booking?.discountedRent}</div>
              <div className="paid-amount-paid">Paid</div>
            </div>
          </div>

          <div className="payment-details">
            <div className="payment-details-title">Payment Details</div>
            <ul className="payment-details-list">
              <li>
                <div className="payment-detail-label">Property Name</div>
                <div className="payment-detail-value">{paymentDetail?.booking?.property?.addressOne}</div>
              </li>
              <li>
                <div className="payment-detail-label">Paid to</div>
                <div className="payment-detail-value">{paymentDetail?.paidTo}</div>
              </li>
              <li>
                <div className="payment-detail-label">Paid by</div>
                <div className="payment-detail-value">{paymentDetail?.paidBy}</div>
              </li>
              <li>
                <div className="payment-detail-label">Receipt Number</div>
                <div className="payment-detail-value">{paymentDetail?.receiptNumber}</div>
              </li>
              <li>
                <div className="payment-detail-label">Transaction Type</div>
                <div className="payment-detail-value">{paymentDetail?.transactionType}</div>
              </li>
            </ul>
          </div>
        </div>
        <div className="print-receipt-button">
          <ButtonThemePrimary block onClick={handlePrint}>Print Receipt</ButtonThemePrimary>
        </div>
      </PopUpModal>
      {/* ENDS: MODAL PAYMENT RECEIPT
      *************************************************************************/}
  </>
  )
}

export default Payments;
