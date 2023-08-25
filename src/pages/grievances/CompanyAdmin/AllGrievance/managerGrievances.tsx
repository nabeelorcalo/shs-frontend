import React from "react";
import { Avatar, Space } from "antd";
import GrievanceDropdown from "../../../../components/Grievance/customDropdown";
import constants, { ROUTES_CONSTANTS } from "../../../../config/constants";
import { GlobalTable } from "../../../../components";
import "./style.scss";
import { UserAvatar } from "../../../../assets/images";
import dayjs from "dayjs";
const statusObj: any = {
  NEW: "new",
  INPROGRESS: "in-progress",
  REOPEN: "re-opened",
  RESOLVED: "resolved",
};

const ManagerGrievances = (props: any) => {
  const params: any = {
    page: props?.tableParams?.pagination?.current,
    limit: props?.tableParams?.pagination?.pageSize,
  };
  const formatRowNumber = (number: number) => {
    return number < 10 ? `0${number}` : number;
  };
  const managerGrievancesColumn = [
    {
      dataIndex: "id",
      key: "no",
      title: "No",
      render: (_: any, data: any, index: any) => (
        // <div>{index < 9 ? `0${index + 1}` : index + 1}</div>,
        <div>{formatRowNumber((params?.page - 1) * params?.limit + index + 1)}</div>
      ),
    },
    {
      dataIndex: "avater",
      key: "avater",
      title: "Avatar",
      render: (avater: any, record: any) => {
        return {
          children: (
            <>
              {/* <img
                src={
                  record?.escalater?.profileImage
                    ? `${constants.MEDIA_URL}/${record?.escalater?.profileImage?.mediaId}.${record?.escalater?.profileImage?.metaData?.extension}`
                    : UserAvatar
                }
                className="h-10 w-10 rounded-full object-cover"
              /> */}
              <Avatar
                size={40}
                src={`${constants.MEDIA_URL}/${record?.escalater?.profileImage?.mediaId}.${record?.escalater?.profileImage?.metaData?.extension}`}
              >
                {record?.escalater?.firstName?.charAt(0)}
                {record?.escalater?.lastName?.charAt(0)}
              </Avatar>
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
      dataIndex: "date",
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
          children: <>{record?.escalated?.firstName + " " + record?.escalated?.lastName}</>,
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
  return (
    <GlobalTable
      loading={props.loading}
      columns={managerGrievancesColumn}
      pagination={props?.tableParams?.pagination}
      pagesObj={props?.pagination}
      tableData={props.managerGrievancesTableData}
      handleTableChange={props?.handleTableChange}
    />
  );
};

export default ManagerGrievances;
