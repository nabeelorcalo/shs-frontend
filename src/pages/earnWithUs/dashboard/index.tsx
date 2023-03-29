import React, { useState, useEffect } from "react"
import type { ColumnsType } from 'antd/es/table'
import { Table, Typography, Row, Col } from 'antd'
import { IconWalletMoney, IconInactiveMember, Documentcard } from '../../../assets/images'
import { PopUpModal } from "../../../components";
import "./style.scss";

interface DataType {
  key: React.Key;
  agentTitle: string;
  address: string;
  durationBooking: string;
  rent: string;
  contracts: any;
  status: string;
}


// Temporary Data
const tableData = [
  {
    key: '1',
    agentTitle: 'Stenna Freddi',
    address: '118-127 Park Ln, London W1K 7AF, UK',
    durationBooking: '22/09/2022 - 22/09/2022',
    rent: '£ 170/day',
    contracts: false,
    status: 'pending'
  },
  {
    key: '2',
    agentTitle: 'Keith Thompson',
    address: '118-127 Park Ln, London W1K 7AF, UK',
    durationBooking: '22/09/2022 - 22/09/2022',
    rent: '£ 170/day',
    contracts: true,
    status: 'success'
  },
  {
    key: '3',
    agentTitle: 'John Emple',
    address: '118-127 Park Ln, London W1K 7AF, UK',
    durationBooking: '22/09/2022 - 22/09/2022',
    rent: '£ 170/day',
    contracts: false,
    status: 'rejected'
  },
  {
    key: '4',
    agentTitle: 'Stenna Freddi',
    address: '118-127 Park Ln, London W1K 7AF, UK',
    durationBooking: '22/09/2022 - 22/09/2022',
    rent: '£ 170/day',
    contracts: true,
    status: 'pending'
  },
  {
    key: '5',
    agentTitle: 'Keith Thompson',
    address: '118-127 Park Ln, London W1K 7AF, UK',
    durationBooking: '22/09/2022 - 22/09/2022',
    rent: '£ 170/day',
    contracts: true,
    status: 'success'
  },
  {
    key: '6',
    agentTitle: 'John Emple',
    address: '118-127 Park Ln, London W1K 7AF, UK',
    durationBooking: '22/09/2022 - 22/09/2022',
    rent: '£ 170/day',
    contracts: false,
    status: 'rejected'
  },
  {
    key: '7',
    agentTitle: 'Stenna Freddi',
    address: '118-127 Park Ln, London W1K 7AF, UK',
    durationBooking: '22/09/2022 - 22/09/2022',
    rent: '£ 170/day',
    contracts: true,
    status: 'pending'
  },
  {
    key: '8',
    agentTitle: 'Keith Thompson',
    address: '118-127 Park Ln, London W1K 7AF, UK',
    durationBooking: '22/09/2022 - 22/09/2022',
    rent: '£ 170/day',
    contracts: true,
    status: 'success'
  },
  {
    key: '9',
    agentTitle: 'John Emple',
    address: '118-127 Park Ln, London W1K 7AF, UK',
    durationBooking: '22/09/2022 - 22/09/2022',
    rent: '£ 170/day',
    contracts: false,
    status: 'rejected'
  },
];



const Dashboard = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/

  
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
    dataIndex: 'agentTitle',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Booking Duration',
    dataIndex: 'durationBooking',
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
          {row.status === 'rejected'? 'Rejected': row.status === 'pending'? 'Pending': 'Success'}
        </div>
      );
    },
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    align: 'center',
  },
];



  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {

  }, [])



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/



  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <>
      <div className="earn-with-us-dashboard">
        <Row gutter={30}>
          <Col xs={12}>
            <div className="earn-with-card top">
              <Row gutter={15}>
                <Col xs={12}>
                  <div className="earn-card-inner">
                    <div className="earn-card-icon">
                      <IconWalletMoney />
                    </div>
                    <div className="earn-card-body">
                      <div className="earn-card-title">Current Balance</div>
                      <div className="earn-card-value">£ 6371.3</div>
                    </div>
                  </div>
                </Col>
                <Col xs={12}>
                  <div className="earn-card-inner with-divider">
                    <div className="earn-card-icon">
                      <IconInactiveMember />
                    </div>
                    <div className="earn-card-body">
                      <div className="earn-card-title">Inactive Members Balance</div>
                      <div className="earn-card-value">£ 562</div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={12}>
            <div className="earn-with-card card-user-welcome top">
              <Row gutter={15}>
                <Col xs={12}>
                  <div className="earn-card-inner">
                    <div className="user-welcome-text">Welcome Back, <span>Stephen!</span></div>
                  </div>
                </Col>
                <Col xs={12}>
                  <div className="earn-card-inner with-divider">
                    
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

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

    </>
  )
}

export default Dashboard