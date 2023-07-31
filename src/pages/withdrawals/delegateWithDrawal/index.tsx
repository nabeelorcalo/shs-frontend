import { useEffect, useState } from 'react'
import { Row, Col, Menu } from 'antd';
import { DropDown, SearchBar, GlobalTable, PageHeader } from '../../../components';
import useCustomHook from '../actionHandler';
import { useRecoilState } from 'recoil';
import { withDrawalRequestState } from '../../../store/withDrawalRequest';
import dayjs from 'dayjs';

const limit = 500;

const DelegateWithDrawal = () => {
  const [value, setValue] = useState("");
  const action = useCustomHook();
  const [searchItem, setSearchItem] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const withDrawalAmount = useRecoilState<any>(withDrawalRequestState);

  const searchValue = (e: any) => {
    setSearchItem(e);
  };

  useEffect(() => {
    const param: any = {};
    if (searchItem) param['q'] = searchItem;
    if (statusFilter) param['status'] = statusFilter;
    action.getWithDrawalRequestData({ page: 1, q: searchItem, limit: limit, status: statusFilter });
  }, [searchItem, statusFilter])

  const columns = [
    {
      dataIndex: "no",
      render: (_: any, item: any) => (
        <div>
          {item?.id}
        </div>
      ),
      key: "no",
      title: "No",
    },
    {
      dataIndex: "bankName",
      render: (_: any, item: any) => (
        <div>
          {item?.bankName}
        </div>
      ),
      key: "bankName",
      title: "Bank Name",
    },
    {
      dataIndex: "datetime",
      render: (_: any, item: any) => (
        <div>
          {dayjs(item?.createdAt).format('DD/MMM/YY , HH:mm a')}
        </div>
      ),
      key: "datetime",
      title: "Date/Time",
    },
    {
      dataIndex: "transactionID",
      render: (_: any, item: any) => (
        <div>
          {item?.transactionId}
        </div>
      ),
      key: "transactionID",
      title: "Transaction ID",
    },
    {
      dataIndex: "amount",
      render: (_: any, item: any) => (
        <div
          className="secondary-color"
        >
          {item?.amount} GBP
        </div>),
      key: "amount",
      title: "Amount",
    },
    {
      dataIndex: "fee",
      render: (_: any, item: any) => (
        <div>
          £ {item?.fee}
        </div>
      ),
      key: "fee",
      title: "Fee",
    },
    {
      dataIndex: "status",
      render: (_: any, item: any) => (
        <div
          className="table-status-style text-center white-color rounded"
          style={{
            backgroundColor:
              item?.status === "pending"
                ? "#FFC15D"
                : item?.status === "completed"
                  ? "#3DC475"
                  : item?.status === "rejected"
                    ? "#D83A52"
                    : "",
            padding: " 2px 3px 2px 3px",
            textTransform: "capitalize"
          }}
        >
          {item?.status}
        </div>
      ),
      key: "status",
      title: "Status",
    },
  ];
  const menu2 = (
    <Menu>
      <Menu.Item key="1">View Details</Menu.Item>
      <Menu.Item key="2">Block</Menu.Item>
      <Menu.Item key="3">
        <a href="create-password">Password Reset</a>
      </Menu.Item>
    </Menu>
  );
  
  return (
    <div className='student-with-drwal'>
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <PageHeader title='Withdrawals' bordered={true} />
        </Col>
      </Row>
      <Row gutter={[20, 20]} className="flex items-center ">
        <Col xl={6} lg={9} md={24} sm={24} xs={24}>
          <SearchBar handleChange={searchValue} />
        </Col>
        <Col xl={18} lg={15} md={24} sm={24} xs={24} className='flex max-sm:flex-col gap-4 justify-end'>
        <DropDown
              name="Status"
              value={statusFilter}
              options={["Completed", "Pending", "Rejected"]}
              setValue={(e: any) => setStatusFilter(e)}
            />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div className="shadow-[0px 0px 8px 1px rgba(9, 161, 218, 0.1)] white-bg-color p-2 rounded-2xl">
            <GlobalTable
              tableData={withDrawalAmount[0]}
              columns={columns}
              pagination={false}
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default DelegateWithDrawal;