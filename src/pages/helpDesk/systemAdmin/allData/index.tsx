import React, { useState } from "react";
import { Dropdown, Menu, Space, Tooltip } from "antd";
import {GlobalTable} from "../../../../components";
import CustomDroupDown from "../../../digiVault/Student/dropDownCustom";
import HelpDeskSelect from "../helpDeskSelect";
import { DownOutlined } from "@ant-design/icons";
import StatusDropdown from "../statusDropDown/statusDropdown";
import PriorityDropDown from "../priorityDropDown/priorityDropDown";

// const priorityOption = [
//   { value: "High", label: "High" },
//   { value: "Highest", label: "Highest" },
//   { value: "Medium", label: "Medium" },
//   { value: "Low", label: "Low" },
// ];

// const statusOption = [
//   { value: "Pendding", label: "Pendding" },
//   { value: "In progress", label: "In progress" },
//   { value: "resolved", label: "resolved" },
// ];

const tableData = [
  {
    key: "01",
    ID: "01",
    Subject: "Subject kmy cc",
    ReportedBy: "john",
    Role: "issue Name",
    Type: "kljdasfhuasd",
    Priority: "high",
    Date: "22/09/2013",
    Assigned: "amila clark",
    Status: "Resolved",
    Actions: "fduhguisd",
  },
  {
    key: "02",
    ID: "02",
    Subject: "file2",
    ReportedBy: "john",
    Role: "issue Name",
    Type: "kljdasfhuasd",
    Priority: "high",
    Date: "22/09/2013",
    Assigned: "amila clark",
    Status: "Resolved",
    Actions: "fduhguisd",
  },
  {
    key: "03",
    ID: "03",
    Subject: "file3",
    ReportedBy: "john",
    Type: "kljdasfhuasd",
    Role: "issue Name",
    Priority: "high",
    Date: "22/09/2013",
    Assigned: "amila clark",
    Status: "Resolved",
    Actions: "fduhguisd",
  },
];

const StatusOptions = [
  {
    key: "1",
    value: "Pending",
  },
  {
    key: "2",
    value: "In Progress",
  },
  {
    key: "3",
    value: "Resolved",
  },
];

const priorityOption = [
  {
    key: "1",
    value: "Highest",
  },
  {
    key: "2",
    value: "High",
  },
  {
    key: "3",
    value: "Medium",
  },
  {
    key: "4",
    value: "Low",
  },
];

const AllData = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
      minWidth: 300,
    },
    {
      title: "Subject",
      dataIndex: "Subject",
      key: "Subject",
      minWidth: 300,
      render: (_: any, data: any) => (
        <Tooltip color={"#363565"} placement="bottom" title={data.Subject}>
          <p>{data.Subject}</p>
        </Tooltip>
      ),
    },
    {
      title: "Type",
      dataIndex: "Type",
      key: "Type",
    },
    {
      title: "Reported By",
      dataIndex: "ReportedBy",
      key: "Reported By",
    },
    {
      title: "Role",
      dataIndex: "Role",
      key: "Role",
    },
    {
      title: "Priority",
      key: "Priority",
      render: (_: any, data: any) => (
        <>
          <PriorityDropDown priorityOptions={priorityOption} />
        </>
      ),
    },
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
    },
    {
      title: "Assigned",
      dataIndex: "Assigned",
      key: "Assigned",
    },
    {
      title: "Status",
      key: "Status",
      render: (_: any, data: any) => (
        <>
          <StatusDropdown StatusOptions={StatusOptions} />
        </>
      ),
    },
    {
      title: "Action",
      key: "Action",
      render: (_: any, data: any) => (
        <Space size="middle">
          <CustomDroupDown menu1={menu2} />
        </Space>
      ),
    },
  ];

  const menu2 = (
    <Menu>
      <Menu.Item key="1">View Details</Menu.Item>
      <Menu.Item key="2">Add Flag</Menu.Item>
      <Menu.Item key="3">Unassign</Menu.Item>
      <Menu.Item key="4">History</Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div>
        <GlobalTable columns={columns} tableData={tableData} />
      </div>
    </div>
  );
};

export default AllData;
