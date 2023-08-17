import React from "react";
import { Button, Space } from "antd";
import GrievanceDropdown from "../../../../components/Grievance/customDropdown";
import constants, { ROUTES_CONSTANTS } from "../../../../config/constants";
import { GlobalTable } from "../../../../components";
import { CloseOutlined } from "@ant-design/icons";
import icon from "../../../../assets/images/Grievances/escalatedCrossIcon.svg";
import "./style.scss";
import { UserAvatar } from "../../../../assets/images";
import dayjs from "dayjs";
const statusObj: any = {
  NEW: "new",
  INPROGRESS: "in-progress",
  REOPEN: "re-opened",
  RESOLVED: "resolved",
};
const internGrievancesColumn = [
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
    render: (avater: any, record: any) => {
      return {
        children: (
          <>
            <img
              src={
                record?.escalater?.profileImage
                  ? `${constants.MEDIA_URL}/${record?.escalater?.profileImage?.mediaId}.${record?.escalater?.profileImage?.metaData?.extension}`
                  : UserAvatar
              }
              className="h-10 w-10 rounded-full object-cover"
            />
          </>
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
    render: (text: any) => <span className="capitalize">{text?.toLowerCase()}</span>,
  },
  {
    dataIndex: "createdAt",
    key: "date",
    title: "Date",
    render: (_: any, record: any) => <span>{dayjs(record?.createdAt).format("YYYY-MM-DD")}</span>,
  },
  {
    dataIndex: "escalatedTo",
    key: "escalatedTo",
    title: "Escalated To",
    render: (escalatedTo: string, record: any) => {
      return {
        children: (
          <>
            <span className="p-2  text-base font-semibold dashboard-primary-color  escalated-btn">
              {record?.escalated?.firstName + " " + record?.escalated?.lastName}
            </span>
            <CloseOutlined className="px-2 escalated-icon" />{" "}
          </>
        ),
      };
    },
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
    align: "center",
    render: (_: any, data: any) => (
      <Space size="middle">
        <GrievanceDropdown link={ROUTES_CONSTANTS.GRIEVANCES_DETAILS} state={{ grievanceId: data.id }} />
      </Space>
    ),
  },
];
const InternGrievances = (props: any) => {
  return (
    <GlobalTable
      loading={props.loading}
      columns={internGrievancesColumn}
      pagination={props?.tableParams?.pagination}
      pagesObj={props?.pagination}
      tableData={props.internGrievancesTableData}
      handleTableChange={props?.handleTableChange}
    />
  );
};

export default InternGrievances;
