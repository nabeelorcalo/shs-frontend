import React, { useState, useEffect } from "react";
import type { ColumnsType } from 'antd/es/table'
import type { MenuProps } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { Table, Dropdown, Typography, Row, Col } from 'antd'
import { IconReceipt, IconSignedDigitally, Documentcard } from '../../../assets/images'
import { PopUpModal, ExtendedButton } from "../../../components"
import "./style.scss";

interface DataType {
  key: React.Key;
  agentTitle: string;
  address: string;
  durationBooking: string;
  rentAmount: string;
  date: string;
  status: string;
  receipt: boolean
}

// Temporary Data
const tableData = [
  {
    key: '1',
    agentTitle: 'Stenna Freddi',
    address: '118-127 Park Ln, London W1K 7AF, UK',
    rentPeriod: '22/09/2022-22/09/2022',
    rentAmount: '£170/day',
    date: '22/09/2022',
    status: 'paid',
    receipt: true
  },
  {
    key: '2',
    agentTitle: 'Keith Thompson',
    address: '118-127 Park Ln, London W1K 7AF, UK',
    rentPeriod: '22/09/2022-22/09/2022',
    rentAmount: '£170/day',
    date: '22/09/2022',
    status: 'paid',
    receipt: true
  },
  {
    key: '3',
    agentTitle: 'John Emple',
    address: '118-127 Park Ln, London W1K 7AF, UK',
    rentPeriod: '22/09/2022-22/09/2022',
    rentAmount: '£170/day',
    date: '22/09/2022',
    status: 'paid',
    receipt: true
  },
  {
    key: '4',
    agentTitle: 'Stenna Freddi',
    address: '118-127 Park Ln, London W1K 7AF, UK',
    rentPeriod: '22/09/2022-22/09/2022',
    rentAmount: '£170/day',
    date: '22/09/2022',
    status: 'paid',
    receipt: true
  },
  {
    key: '5',
    agentTitle: 'Keith Thompson',
    address: '118-127 Park Ln, London W1K 7AF, UK',
    rentPeriod: '22/09/2022-22/09/2022',
    rentAmount: '£170/day',
    date: '22/09/2022',
    status: 'paid',
    receipt: true
  },
  {
    key: '6',
    agentTitle: 'John Emple',
    address: '118-127 Park Ln, London W1K 7AF, UK',
    rentPeriod: '22/09/2022-22/09/2022',
    rentAmount: '£170/day',
    date: '22/09/2022',
    status: 'paid',
    receipt: true
  },
  {
    key: '7',
    agentTitle: 'Stenna Freddi',
    address: '118-127 Park Ln, London W1K 7AF, UK',
    rentPeriod: '22/09/2022-22/09/2022',
    rentAmount: '£170/day',
    date: '22/09/2022',
    status: 'paid',
    receipt: true
  },
  {
    key: '8',
    agentTitle: 'Keith Thompson',
    address: '118-127 Park Ln, London W1K 7AF, UK',
    rentPeriod: '22/09/2022-22/09/2022',
    rentAmount: '£170/day',
    date: '22/09/2022',
    status: 'paid',
    receipt: true
  },
  {
    key: '9',
    agentTitle: 'John Emple',
    address: '118-127 Park Ln, London W1K 7AF, UK',
    rentPeriod: '22/09/2022-22/09/2022',
    rentAmount: '£170/day',
    date: '22/09/2022',
    status: 'paid',
    receipt: true
  },
];

const Payments = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate()
  const location = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [modalPaymentReceiptOpen, setModalPaymentReceiptOpen] = useState(false)
  const tableColumns: ColumnsType<any> = [
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
      dataIndex: 'agentTitle',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Rent Period',
      dataIndex: 'rentPeriod',
    },
    {
      title: 'Rent Amount',
      dataIndex: 'rentAmount',
    },
    {
      title: 'Date',
      dataIndex: 'date'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      render: (_, row, index) => {
        return (
          <div className="shs-status-badge success">
            paid
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
          <div className="table-cell-btn" onClick={openModalPaymentReceipt}>
            <IconReceipt />
          </div>
        );
      },
    },
  ];



  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {

  }, [])



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const openModalPaymentReceipt = () => {
    setModalPaymentReceiptOpen(true)
  }
  
  const closeModalPaymentReceipt = () => {
    setModalPaymentReceiptOpen(false)
  }



  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <>
    <div className="accommodation-payments">
      <div className="shs-table-card">
          <div className="shs-table">
            <Table
              scroll={{ x: "max-content" }}
              columns={tableColumns}
              dataSource={tableData}
              pagination={{pageSize: 7, showTotal: (total) => <>Total: <span>{total}</span></> }}
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

          <ExtendedButton block customType="tertiary" onClick={closeModalPaymentReceipt}>Print Receipt</ExtendedButton>

        </div>
      </PopUpModal>
      {/* ENDS: MODAL PAYMENT RECEIPT
      *************************************************************************/}
  </>
  )
}

export default Payments