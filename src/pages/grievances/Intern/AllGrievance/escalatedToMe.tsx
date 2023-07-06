import React from "react";
import { Space } from "antd";
import GrievanceDropdown from "../../../../components/Grievance/customDropdown";
import { ROUTES_CONSTANTS } from "../../../../config/constants";
import { GlobalTable } from "../../../../components";
import "./style.scss";
import dayjs from "dayjs";
const statusObj: any = {
  NEW: "new",
  INPROGRESS: "in-progress",
  REOPEN: "re-opened",
  RESOLVED: "resolved",
};

const escalatedToMeTableColumn = [
  {
    dataIndex: "id",
    key: "no",
    title: "No",
  },
  {
    dataIndex: "subject",
    key: "subject",
    title: "Subject",
  },
  {
    dataIndex: "type",
    key: "type",
    title: "Type",
  },
  {
    dataIndex: "date",
    key: "date",
    title: "Date",
    render: (text: any, record: any) => <span>{dayjs(record.createdAt).format("DD-MM-YYYY")}</span>,
  },
  {
    dataIndex: "escalatedBy",
    key: "escalatedBy",
    title: "Escalated By",
    render: (text: any, record: any) => <span>{record?.escalater?.firstName + " " + record.escalater?.lastName}</span>,
  },
  {
    dataIndex: "status",
    key: "status",
    title: "Status",
    render: (text: string) => {
      return {
        children: (
          <div>
            <span className={`rounded-md px-2 py-1  text-white text-sm font-normal capitalize ${statusObj[text]}              `}>
              {statusObj[text]}
            </span>
          </div>
        ),
      };
    },
  },
  {
    title: "Actions",
    key: "Action",
    render: (_: any, data: any) => (
      <Space size="middle">
        <GrievanceDropdown link={ROUTES_CONSTANTS.GRIEVANCES_DETAILS} state={{ grievanceId: data.id }} />
      </Space>
    ),
  },
];
const EscalatedToMe = (props: any) => {
  return <GlobalTable loading={props.loading} columns={escalatedToMeTableColumn} pagination={true} tableData={props.escalatedToMeTableData} />;
};

export default EscalatedToMe;
