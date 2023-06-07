import React, { useEffect, useState } from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import { Col, Row, Menu } from "antd";
import { DropDown, SearchBar, GlobalTable, BoxWrapper } from "../../../../components";
import CustomDroupDown from "../../../digiVault/Student/dropDownCustom";
import { useRecoilState } from "recoil";
import { withDrawalRequestState } from "../../../../store/withDrawalRequest";
import useCustomHook from "../../actionHandler";
import dayjs from "dayjs";

const statuses: any = {
  'Pending': "#FFC15D",
  'Completed': '#3DC475',
  'Rejected': '#D83A52',
}

const WithDrawalRequest = () => {
  const [value, setValue] = useState("");
  const action = useCustomHook();
  const withDrawalAmount = useRecoilState<any>(withDrawalRequestState);

  useEffect(() => {
    action.getWithDrawalRequestData();
  }, [])

  const searchValue = () => { };

  const columns = [
    {
      dataIndex: "no",
      render: (_: any, item: any) => (
        <div>
          {item?.id}
        </div>
      ),
      key: "no",
      title: "No.",
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
      dataIndex: "transactionId",
      render: (_: any, item: any) => (
        <div>
          {item?.transactionId}
        </div>
      ),
      key: "transactionId",
      title: "Transaction Id",
    },
    {
      dataIndex: "amount",
      render: (_: any, item: any) => (
        <div>
          {item?.amount} GBP
        </div>
      ),
      key: "amount",
      title: "Amount",
    },

    {
      dataIndex: "Fee",
      render: (_: any, item: any) => (
        <div>
          £ {item?.fee}
        </div>
      ),
      key: "Fee",
      title: "Fee",
    },
    {
      dataIndex: "status",
      render: (_: any, item: any) => (
        <div
          className="table-status-style text-center white-color rounded"
          style={{
            backgroundColor: statuses[item?.status],
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
    {
      render: (_: any, data: any) => (
        <span>
          <CustomDroupDown menu1={menu2} />
        </span>
      ),
      key: "Actions",
      title: "Actions",
    },
  ];
  const menu2 = (
    <Menu>
      <Menu.Item key="1">View Reciept</Menu.Item>
      <Menu.Item key="2">Accept</Menu.Item>
    </Menu>
  );
  const tableData = [
    {
      Actions: (
        <span>
          <EllipsisOutlined />
        </span>
      ),
      Fee: "£9,823",
      status: "Pending",
      amount: "20 GBP ",
      datetime: "Near Giga Mall, Islamabad",
      transactionId: "Single Room",
      bankName: "Natwest Group",
      no: "01",
    },
    {
      Actions: (
        <span>
          <EllipsisOutlined />
        </span>
      ),
      Fee: "£9,823",
      status: "Completed",
      amount: "100 GBP ",
      transactionId: "Single Room",
      datetime: "2 Woodhurst Crescent, Liverpool, L14 0BA",
      no: "02",
      bankName: "Natwest Group",
    },
    {
      Actions: (
        <div>
          <EllipsisOutlined />
        </div>
      ),
      Fee: "£7,823",
      status: "Rejected",
      amount: "10 GBP ",
      transactionId: "Single Room",
      datetime: "2 Woodhurst Crescent, Liverpool, L14 0BA",
      no: "03",
      bankName: "Natwest Group",
    },
  ];

  return (
    <div className="with-drawal-request">
      <Row gutter={[20, 20]}>
        <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
          <SearchBar handleChange={searchValue} />
        </Col>
        <Col xxl={18} xl={18} lg={18} md={24} sm={24} xs={24}>
          <div className="flex justify-center md:justify-end gap-3 mt-3 md:mt-0 delegate-right-menu">
            <DropDown
              name="Status"
              value={value}
              options={["Complete", "Pending", "Rejected"]}
              setValue={setValue}
            />
            <DropDown
              name="Method"
              value={value}
              options={["Bank Transfer", "Card Payment"]}
              setValue={setValue}
            />
          </div>
        </Col>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <BoxWrapper>
            <div className="shadow-[0px 0px 8px 1px rgba(9, 161, 218, 0.1)] white-bg-color p-2 rounded-2xl">
              <GlobalTable tableData={withDrawalAmount[0]} columns={columns} />
            </div>
          </BoxWrapper>
        </Col>
      </Row>
    </div>
  );
};

export default WithDrawalRequest;
