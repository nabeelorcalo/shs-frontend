import { Menu, Space, Tooltip } from "antd";
import React, { useState } from "react";
import { GlobalTable } from "../../../../components";
import CustomDroupDown from "../../../digiVault/Student/dropDownCustom";
import AttendaceLog from "../AttendanceLogModal";
import HelpDeskSelect from "../helpDeskSelect";
import HistoryModal from "../HistoryModal";
import PriorityDropDown from "../priorityDropDown/priorityDropDown";
import StatusDropdown from "../statusDropDown/statusDropdown";


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

const AssignedData = (props: any) => {
  const {tableData} = props
  const [history, setHistory] = useState<any>(false)
  const [openModal, setOpenModal] = useState<any>(false)

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
      dataIndex:'action',
      // render: (_: any, data: any) => (
      //   <Space size="middle">
      //     <CustomDroupDown menu1={menu2} />
      //   </Space>
      // ),
    },
  ];

  const menu2 = (
    <Menu>
      <Menu.Item key="1" onClick={() => setOpenModal(true)}>View Details</Menu.Item>
      <Menu.Item key="2">Remove Flag</Menu.Item>
      <Menu.Item key="3">Unassign</Menu.Item>
      <Menu.Item key="4" onClick={() => setHistory(true)}>History</Menu.Item>
    </Menu>
  );

  return (
    <div>
       <AttendaceLog open={openModal} setOpen={setOpenModal} />
      <HistoryModal history={history} setHistory={setHistory} />
      <GlobalTable columns={columns} tableData={tableData} />
    </div>
  );
};

export default AssignedData;
