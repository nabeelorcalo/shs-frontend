import React from "react";
import { Space } from "antd";
import GrievanceDropdown from "../../../../components/Grievance/customDropdown";
import { ROUTES_CONSTANTS } from "../../../../config/constants";
import { GlobalTable } from "../../../../components";
import { UserAvatar } from "../../../../assets/images";
import dayjs from "dayjs";
const statusObj: any = {
  NEW: "new",
  INPROGRESS: "in-progress",
  REOPEN: "re-opened",
  RESOLVED: "resolved",
};
const EscalatedToMeTableColumn = [
  {
    dataIndex: "id",
    key: "no",
    title: "No",
    render: (_: any, data: any, index: any) => <div>{index < 9 ? `0${index + 1}` : index + 1}</div>,
  },
  {
    dataIndex: "avater",
    key: "avater",
    title: "Avatar",
    render: (avater: any) => {
      return {
        children: (
          <span>
            <img src={avater || UserAvatar} />
          </span>
        ),
      };
    },
  },

  {
    dataIndex: "escalatedBy",
    key: "escalatedBy",
    title: "Escalated By",
    render: (_: any, data: any) => <span>{data?.escalater?.firstName + " " + data?.escalater?.lastName}</span>,
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
    render: (_: any, record: any) => <span>{dayjs(record?.createdAt).format("YYYY-MM-DD")}</span>,
  },
  {
    dataIndex: "status",
    key: "status",
    title: "Status",
    render: (text: string) => {
      return {
        children: (
          <div>
            <span
              className={`rounded-md px-2 py-1  text-white text-sm font-normal capitalize ${statusObj[text]}
              `}
            >
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
  return (
    <GlobalTable
      loading={props.loading}
      columns={EscalatedToMeTableColumn}
      pagination={props?.tableParams?.pagination}
      pagesObj={props?.pagination}
      tableData={props.escalatedToMeTableData}
      handleTableChange={props?.handleTableChange}
    />
  );
};

export default EscalatedToMe;
