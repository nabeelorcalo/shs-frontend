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

const EscalatedToMe = (props: any) => {
  const params: any = {
    page: props?.tableParams?.pagination?.current,
    limit: props?.tableParams?.pagination?.pageSize,
  };
  const formatRowNumber = (number: number) => {
    return number < 10 ? `0${number}` : number;
  };
  const escalatedToMeTableColumn = [
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
      columns={escalatedToMeTableColumn}
      pagination={props?.tableParams?.pagination}
      pagesObj={props?.pagination}
      tableData={props.escalatedToMeTableData}
      handleTableChange={props?.handleTableChange}
    />
  );
};

export default EscalatedToMe;
