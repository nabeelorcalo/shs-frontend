import { Tooltip } from "antd";
import { useState } from "react";
import { GlobalTable } from "../../../../components";
import AttendaceLog from "../AttendanceLogModal";
import HistoryModal from "../HistoryModal";

const AssignedData = (props: any) => {
  const { tableData, state, setState, label } = props

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
      dataIndex: 'priority'
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
      dataIndex: 'status'
    },
    {
      title: "Action",
      key: "Action",
      dataIndex: 'action'
    },
  ];

  return (
    <div>
      <HistoryModal state={state} setHistory={setState} />
      {state.openModal && <AttendaceLog open={state} label={label} setOpen={setState} />}
      <GlobalTable columns={columns} tableData={tableData} />
    </div>
  );
};

export default AssignedData;
