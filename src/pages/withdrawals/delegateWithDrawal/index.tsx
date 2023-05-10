import { useState } from 'react'
import { Row, Col, Menu } from 'antd';
import { DropDown, SearchBar, GlobalTable, PageHeader } from '../../../components';

const tableData = [
  {
    Actions: "fffff",
    bankName: "Natwest Group",
    status: "Complete",
    company: "kljdasfhuasd",
    datetime: "Dec 30 2022 05:27",
    no: "01",
    transactionID: "TRX2MGNVHSEZR",
    amount: "-5 GBP",
    Name: "Jenny Wilson",
    fee: "£20",
  },
  {
    Actions: "fffff",
    bankName: "Natwest Group",
    status: "Complete",
    company: "kljdasfhuasd",
    transactionID: "TRX2MGNVHSEZR",
    amount: "-5 GBP",
    datetime: "Dec 30 2022 05:27",
    no: "02",
    fee: "£20",
  },
  {
    Actions: "fffff",
    bankName: "Natwest Group",
    status: "Pending",
    company: "kljdasfhuasd",
    transactionID: "TRX2MGNVHSEZR",
    amount: "-5 GBP",
    datetime: "Dec 30 2022 05:27",
    no: "03",
    fee: "£20",
  },
  {
    Actions: "fffff",
    bankName: "Natwest Group",
    status: "Pending",
    transactionID: "TRX2MGNVHSEZR",
    amount: "-100gbp",
    datetime: "Dec 30 2022 05:27",
    no: "04",
    fee: "£20",
  },
  {
    Actions: "fffff",
    bankName: "Natwest Group",
    status: "Complete",
    transactionID: "TRX2MGNVHSEZR",
    amount: "-100gbp",
    datetime: "Dec 30 2022 05:27",
    no: "04",
    fee: "£20",
  },
];

const DelegateWithDrawal = () => {
  const [value, setValue] = useState("");
  const searchValue = () => { };

  const columns = [
    {
      dataIndex: "no",
      key: "no",
      title: "No",
    },
    {
      dataIndex: "bankName",
      key: "bankName",
      title: "Bank Name",
    },
    {
      dataIndex: "datetime",
      key: "datetime",
      title: "Date/Time",
    },
    {
      dataIndex: "transactionID",
      key: "transactionID",
      title: "Transaction ID",
    },
    {
      dataIndex: "amount",
      render: (_: any, data: any) => (
        <div
          className="secondary-color"
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
      render: (_: any, data: any) => (
        <div
          className="table-status-style text-center rounded white-color"
          style={{
            backgroundColor:
              data.status === "Pending"
                ? "#D83A52"
                : data.status === "Complete"
                  ? "#4ED185"
                  : "",
            padding: " 2px 3px 2px 3px",
          }}
        >
          {data.status}
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
            value={value}
            options={["Complete", "Pending"]}
            setValue={setValue}
          />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div className="shadow-[0px 0px 8px 1px rgba(9, 161, 218, 0.1)] white-bg-color p-2 rounded-2xl">
            <GlobalTable
              tableData={tableData}
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