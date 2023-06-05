import { useState, useEffect } from 'react'
import { Row, Col, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table'
import { DropDown, SearchBar, GlobalTable, Loader } from '../../../components';
import { IconAngleDown } from '../../../assets/images'
import useEarnWithUsHook from '../actionHandler';
import { useRecoilValue } from "recoil";
import { earnWithUsTabsState } from "../../../store";
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
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [filterParams, setFilterParams] = useState({page:1, limit: 5})
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(5);
console.log('withdrawalRequests::: ', withdrawalRequests)

  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    if(tabKey === 'earnWithUsWithdrawalsRequest') {
      getWithdrawalRequests(filterParams, setLoadingRequest)
    }
  }, [tabKey, filterParams]);

  const fetchTableData = async () => {
    getWithdrawalRequests(filterParams, setLoadingRequest)
  }
    

    
  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handlePagination = (page: any) => {
    setPageNo(page)
    setFilterParams((prev:any) => {
      return {...prev, page: page}
    })
  };

  const handleFilterStatus = (value:any) => {
    setFilterParams((prev:any) => {
      return {...prev, status: value}
    })
  }

  const handleFilterType = (value:any) => {
    setFilterParams((prev:any) => {
      return {...prev, type: value}
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
        return (
          <>{index < 9 ? 0 : null}{index + 1}</>
        );
      },
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
    },
    {
      dataIndex: "transactionId",
      key: "transactionId",
      title: "Transaction ID",
    },
    {
      dataIndex: "amount",
      render: (_: any, data: any) => (
          <div
            className="text-[red]"
          >
            {data.amount}
          </div>),
    key: "amount",
    title: "Amount",
    },
    {
      dataIndex: "fee",
      key: "fee",
      title: "Fee",
    },
    {
      dataIndex: "status",
      key: "status",
      title: "Status",
      render: (_: any, row: any) => (
        <div
          className="table-status-style text-center rounded white-color"
          style={{
            fontSize: '14px',
            backgroundColor:
            row.status === "pending"
                ? "#B63546"
                : row.status === "complete"
                ? "#3DC575"
                : row.status === "reject"
                ? "#D83A52"
                : "",
            padding: " 2px 3px 2px 3px",
          }}
        >
          {row.status === 'pending' ? 'Pending' : row.status === 'reject' ? 'Reject': 'Complete'}
        </div>
      ),
    },
  ];

  return (
    <div className='withdrawal-requests'>
      <Row gutter={[20, 20]} className="flex items-center ">
        <Col xl={6} lg={9} md={24} sm={24} xs={24}>
          <SearchBar handleChange={handleSearch} />
        </Col>
        <Col xl={18} lg={15} md={24} sm={24} xs={24} className='flex max-sm:flex-col gap-4 justify-end'>
          <div className="filterby-status">
            <Select
              className="filled"
              placeholder="Status"
              onChange={handleFilterStatus}
              placement="bottomRight"
              suffixIcon={<IconAngleDown />}
            >
              <Select.Option value="complete">Complete</Select.Option>
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="rejected">Rejected</Select.Option>
            </Select>
          </div>

          <div className="filterby-method">
            <Select
              className="filled"
              placeholder="Method"
              onChange={handleFilterType}
              placement="bottomRight"
              suffixIcon={<IconAngleDown />}
              popupClassName="dropdown-membaer-type-filter"
            >
              <Select.Option value="COMPANY_ADMIN">Bank Transfer</Select.Option>
              <Select.Option value="COMPANY_MANAGER">Card Payment</Select.Option>
            </Select>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div className="shs-table-card table-delegate-members">
            <div className="shs-table">
              <Table
                loading={{spinning: loadingRequest, indicator: <Loader />}}
                columns={columns}
                dataSource={withdrawalRequests}
                onChange={handlePagination}
                pagination={{ 
                  pageSize: 5,
                  current: pageNo,
                  total: totalRequests,
                  showTotal: (total) => <>Total: <span>{total}</span></>
                }}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default WithDrawalRequest