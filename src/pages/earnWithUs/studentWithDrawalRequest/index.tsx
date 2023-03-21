import React, { useState } from 'react'
import { Row, Col, Button, Menu } from 'antd';
import { DropDown, SearchBar, GlobalTable } from '../../../components';
import CustomDroupDown from '../../digiVault/Student/dropDownCustom';

const tableData = [
    {
      Actions: "fffff",
      bankName: "Natwest Group",
      status: "Active",
      company: "kljdasfhuasd",
      datetime: "Dec 30 2022 05:27",
      no: "01",
        transactionID: "TRX2MGNVHSEZR",
      amount:"-5 GBP",
      Name: "Jenny Wilson",
      fee: "£20",
     
    },
    {
      Actions: "fffff",
      bankName: "Natwest Group",
      status: "Active",
      company: "kljdasfhuasd",
        transactionID: "TRX2MGNVHSEZR",
        amount:"-5 GBP",
      datetime: "Dec 30 2022 05:27",
      no: "02",
      
      fee: "£20",
    
    },
    {
      Actions: "fffff",
      bankName: "Natwest Group",
      status: "Inactive",
      company: "kljdasfhuasd",
        transactionID: "TRX2MGNVHSEZR",
        amount:"-5 GBP",
      datetime: "Dec 30 2022 05:27",
      no: "03",
      
      fee: "£20",
      
    },
    {
      Actions: "fffff",
      bankName: "Natwest Group",
      status: "Inactive",
     
        transactionID: "TRX2MGNVHSEZR",
        amount:"-100gbp",
      datetime: "Dec 30 2022 05:27",
      no: "04",
    
      fee: "£20",
      
    },
  ];
  




const WithDrawalRequest = () => {
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
          render: (_: any, data: any) => (
            <div
              className="table-status-style text-center rounded white-color"
              style={{
                backgroundColor:
                  data.status === "Pending"
                    ? "#FFC15D"
                    : data.status === "Active"
                    ? "#3DC475"
                    : data.status === "Inactive"
                    ? "#D83A52"
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
    
        // {
        //   render: (_: any, data: any) => (
        //     <span>
        //       <CustomDroupDown menu1={menu2} />
        //     </span>
        //   ),
        //   key: "Actions",
        //   title: "Actions",
        // },
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
           <Row gutter={[5, 10]} className="flex items-center ">
        <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
          <SearchBar handleChange={searchValue} />
        </Col>
        <Col xxl={18} xl={18} lg={18} md={24} sm={24} xs={24}>
        <div className="flex  justify-center sm:justify-end gap-3 mt-3 md:mt-0">
            <DropDown
              name="Status"
              value={value}
              options={["item 1", "item 2", "item 3"]}
              setValue={setValue}
            />
            <DropDown
              name="Method"
              value={value}
              options={["item 1", "item 2", "item 3"]}
              setValue={setValue}
            />
          </div>
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

export default WithDrawalRequest