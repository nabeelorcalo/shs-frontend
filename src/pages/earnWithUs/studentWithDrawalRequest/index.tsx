import { useState, useEffect } from 'react'
import { Row, Col, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { PaginationProps } from 'antd';
import {LoadingOutlined} from "@ant-design/icons";
import { SearchBar } from '../../../components';
import { IconAngleDown, IconCloseModal } from '../../../assets/images'
import useEarnWithUsHook from '../actionHandler';
import { useRecoilValue } from "recoil";
import { earnWithUsTabsState, currentUserState } from "../../../store";
import dayjs from 'dayjs';
import "./style.scss";
interface DataType {
  key: React.Key;
  bankName: string;
  createdAt: string;
  transactionId: string;
  amount: number;
  fee: number;
  location: string;
  status: string;
}

const WithDrawalRequest = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const {getWithdrawalRequests, withdrawalRequests, totalRequests} = useEarnWithUsHook();
  const tabKey = useRecoilValue(earnWithUsTabsState);
  const {id} = useRecoilValue(currentUserState);
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusValue, setStatusValue] = useState(undefined);
  const [searchValue, setSearchValue] = useState(undefined);
  const initParams:any = {
    page:1,
    limit: 5,
    userId: id
  }
  const [filterParams, setFilterParams] = useState(initParams);
  const pageSize = 5;


  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    setStatusValue(undefined);
    setSearchValue(undefined);
    setCurrentPage(1)
    setFilterParams(initParams);
    if(tabKey === 'earnWithUsWithdrawalsRequest') {
      getWithdrawalRequests(filterParams, setLoadingRequest);
    }
  }, [tabKey]);

  useEffect(() => {
    getWithdrawalRequests(filterParams, setLoadingRequest);
  }, [filterParams]);

    
  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handlePagination:PaginationProps['onChange'] = (page:any) => {
    setCurrentPage(page.current)
    setFilterParams((prev:any) => {
      return {...prev, page: page.current}
    })
  };

  const handleFilterStatus = (value:any) => {
    setStatusValue(value)
    setFilterParams((prev:any) => {
      return {...prev, status: value}
    })
  }

  const handleSearch = (value:any) => {
    setFilterParams((prev:any) => {
      return {...prev, q: value}
    })
  }

  
  /* Table Columns
  -------------------------------------------------------------------------------------*/
  const columns: ColumnsType<DataType> = [
    {
      title: 'No',
      dataIndex: 'no.',
      align: 'center',
      render: (_, row, index) => {
        const rowNumber = (currentPage - 1) * pageSize + index + 1
        return rowNumber < 10 ? `0${rowNumber}` : rowNumber;
      }
    },
    {
      dataIndex: "bankName",
      key: "bankName",
      title: "Bank Name",
    },
    {
      dataIndex: "createdAt",
      key: "createdAt",
      title: "Date/Time",
      render: (_, row) => {
        return (
          <>{dayjs(row.createdAt).format('MMM DD YYYY HH:mm')}</>
        );
      },
    },
    {
      dataIndex: "transactionId",
      key: "transactionId",
      title: "Transaction ID",
    },
    {
      dataIndex: "amount",
      key: "amount",
      title: "Amount",
      render: (_, row) => (
        <div className="text-[red]">
          - {row.amount} GBP
        </div>
      ),
    },
    {
      dataIndex: "fee",
      key: "fee",
      title: "Fee",
      render: (_, row) => (
        <>£ {row.fee}</>
      ),
    },
    {
      dataIndex: "status",
      key: "status",
      title: "Status",
      render: (_: any, row: any) => (
        <div
          className="requests-badge table-status-style text-center white-color"
          style={{
            backgroundColor:
            row.status === "pending"
            ? "#FFC15D"
            : row.status === "rejected"
            ? "#D83A52"
            : "#3DC575"
          }}
        >
          {row.status === 'pending' ? 'Pending' : row.status === 'rejected' ? 'Reject': 'Complete'}
        </div>
      ),
    },
  ];

  return (
    <div className='withdrawal-requests'>
      <Row gutter={[20, 20]} className="flex items-center ">
        <Col xl={6} lg={9} md={24} sm={24} xs={24}>
          <SearchBar value={searchValue} handleChange={handleSearch} placeholder='Search by bank name' />
        </Col>
        <Col xl={18} lg={15} md={24} sm={24} xs={24} className='flex max-sm:flex-col gap-4 justify-end'>
          <div className="filterby-status">
            <Select
              className="filled"
              placeholder="Status"
              onChange={handleFilterStatus}
              value={statusValue}
              placement="bottomRight"
              suffixIcon={<IconAngleDown />}
              clearIcon={<IconCloseModal />}
              allowClear
            >
              <Select.Option value="completed">Complete</Select.Option>
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="rejected">Rejected</Select.Option>
            </Select>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div className="shs-table-card table-delegate-members">
            <div className="shs-table">
              <Table
                loading={{spinning: loadingRequest, indicator: <LoadingOutlined />}}
                columns={columns}
                dataSource={withdrawalRequests}
                onChange={(page:any, pageSize:any) => handlePagination(page, pageSize)}
                pagination={totalRequests > 5 ? {
                  pageSize: pageSize,
                  current: currentPage,
                  total: totalRequests,
                  showTotal: (total) => <>Total: {total}</>
                }: false}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default WithDrawalRequest;
