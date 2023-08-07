import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import dayjs from "dayjs";
import type { MenuProps } from "antd";
import { Avatar, Typography, Dropdown } from "antd";
import type { TablePaginationConfig } from "antd/es/table";
import { currentUserRoleState, filterState, leaveDetailIdState, paginationState, viewHistoryLeaveStateAtom } from "../../../store";
import { GlobalTable } from "../../../components";
import { MoreIcon } from "../../../assets/images";
import constants from "../../../config/constants";
import DropDownNew from "../../../components/Dropdown/DropDownNew";
import useCustomHook from "../actionHandler";
import "../../../scss/global-color/Global-colors.scss";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const { Text } = Typography;

interface TableParams {
  pagination?: TablePaginationConfig;
}

const LeaveHistoryTable = (props: any) => {
  // Variable declarations
  // ------------------------------------------------------
  const utcOffsetInMinutes = new Date().getTimezoneOffset();
  const role = useRecoilValue(currentUserRoleState);
  const [filter, setFilter] = useRecoilState(filterState);
  const leaveDetailId = useRecoilValue(leaveDetailIdState);
  const [leaveHistory, setLeaveHistory]: any = useRecoilState(viewHistoryLeaveStateAtom);
  const [tableParams, setTableParams]: any = useRecoilState(paginationState);

  const { id, setOpenDrawer, setOpenModal, setSelectedRow, setSelectedId } = props;
  const { getLeaveHistoryList, approveDeclineLeaveRequest, getLeaveDetailById }: any = useCustomHook();

  const hasData = leaveHistory?.data?.length ? true : false;
  const [loading, setLoading] = useState(hasData);
  const params: any = {
    page: tableParams?.pagination?.current,
    limit: tableParams?.pagination?.pageSize,
  };

  const myItems = (data: any) => {
    const { id, status } = data;
    const items: MenuProps["items"] = [
      {
        label: (
          <p
            id={id}
            onClick={(e: any) => (status === "APPROVED" ? null : approveDeclineRequest(e))}
            className={status === "APPROVED" ? "text-primary-disabled-color approve" : "approve"}
          >
            Approve
          </p>
        ),
        key: "approve",
      },
      {
        label: (
          <p
            id={id}
            onClick={(e) => (status === "DECLINED" ? null : approveDeclineRequest(e))}
            className={status === "DECLINED" ? "text-primary-disabled-color decline" : "decline"}
          >
            Decline
          </p>
        ),
        key: "decline",
      },
      {
        label: (
          <p id={id} onClick={(e: any) => viewDetail(e)}>
            View Details
          </p>
        ),
        key: "viewDetail",
      },
    ];

    return items;
  };

  const statusBGRendar: any = {
    PENDING: "#FFC15E",
    DECLINED: "#D83A52",
    APPROVED: "#4ED185",
  };

  const renderSpanBG: any = {
    Sick: "#4CA4FD",
    Casual: "#FFC15D",
    "Work From Home": "#E96F7C",
    Medical: "#6AAD8E",
  };

  const formatRowNumber = (number: number) => {
    return number < 10 ? `0${number}` : number;
  };

  const intrneeColumData = [
    {
      title: "No",
      dataIndex: "key",
      key: "key",
      render: (_: any, data: any, index: any) => <div>{formatRowNumber((params?.page - 1) * params?.limit + index + 1)}</div>,
    },
    {
      title: "Request Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_: any, data: any) => <div className="status_container">{formatDate(data.createdAt, "DD/MM/YYYY")}</div>,
    },
    {
      title: "Date From",
      dataIndex: "dateFrom",
      key: "dateFrom",
      render: (_: any, data: any) => <div className="status_container">{formatDate(data.dateFrom, "DD/MM/YYYY")}</div>,
    },
    {
      title: "Date To",
      dataIndex: "dateTo",
      key: "dateTo",
      render: (_: any, data: any) => (
        <div className="status_container">{dayjs.utc(data.dateTo).utcOffset(utcOffsetInMinutes).format("DD/MM/YYYY")}</div>
      ),
    },
    {
      title: "Leave Type",
      width: 180,
      dataIndex: "type",
      render: (_: any, data: any) => (
        <div className="status_container px-[10px] py-[3px] relative text-left capitalize">
          <span
            className=" absolute top-0 bottom-0 left-0 w-[4px] rounded-lg"
            style={{
              backgroundColor: renderSpanBG[data.type],
              color: "#fff",
            }}
          />
          {data.type.toLowerCase()}
        </div>
      ),
      key: "type",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (_: any, data: any) => {
        return <div>{data.reason ? (data.reason.length > 10 ? `${data.reason.substring(0, 12)}...` : data.reason) : "N/A"}</div>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 80,
      render: (_: any, data: any) => (
        <div
          className="status_container px-[10px] py-[3px] rounded-lg capitalize text-xs"
          style={{
            backgroundColor: statusBGRendar[data.status],
            color: "#fff",
            textAlign: "center",
          }}
        >
          {data.status}
        </div>
      ),
      key: "status",
    },
    {
      title: <p className="text-center">Action</p>,
      key: "action",
      render: (_: any, data: any) => {
        const { id, status } = data;

        return (
          <DropDownNew
            placement="bottomRight"
            items={[
              {
                label: (
                  <p id={id} className="cursor-pointer" onClick={(e: any) => viewDetail(e)}>
                    View Details
                  </p>
                ),
                key: "viewDetail",
              },
              data.status === "PENDING" && {
                label: (
                  <p
                    id={id}
                    className="cursor-pointer my-[-10px]"
                    onClick={() => {
                      setOpenModal({ open: true, type: "edit" });
                      setSelectedId(id);
                    }}
                  >
                    Edit
                  </p>
                ),
                key: "edit",
              },
              data.status === "PENDING" && {
                label: (
                  <p
                    id={id}
                    className="cursor-pointer"
                    onClick={() => {
                      setOpenModal({ open: true, type: "cancel" });
                      setSelectedId(id);
                    }}
                  >
                    Cancel
                  </p>
                ),
                key: "cancel",
              },
            ]}
          >
            <MoreIcon className="cursor-pointer " onClick={() => setSelectedRow(data)} />
          </DropDownNew>
        );
      },
    },
  ];

  const managerColumData = [
    {
      title: "No",
      dataIndex: "key",
      key: "key",
      render: (_: any, data: any, index: any) => <div>{formatRowNumber((params?.page - 1) * params?.limit + index + 1)}</div>,
    },
    {
      title: "Avatar",
      dataIndex: "img",
      key: "key",
      render: (_: any, data: any) => {
        const {
          intern: {
            userDetail: { firstName, lastName, profileImage },
          },
        } = data;

        return (
          <div className="w-[32px] h-[32px] rounded-full object-cover">
            {profileImage ? (
              <img
                src={`${constants.MEDIA_URL}/${profileImage?.mediaId}.${profileImage?.metaData?.extension}`}
                className=" rounded-full w-full h-full object-cover"
              />
            ) : (
              <Avatar size={32}>
                {firstName[0].toUpperCase()}
                {lastName[0].toUpperCase()}
              </Avatar>
            )}
          </div>
        );
      },
    },
    {
      title: "Intern Name",
      dataIndex: "name",
      key: "name",
      render: (_: any, data: any) => {
        const {
          intern: {
            userDetail: { firstName, lastName },
          },
        } = data;

        return (
          <div className="w-fit h-[38] rounded-full object-cover">
            <Text>
              {firstName} {lastName}
            </Text>
          </div>
        );
      },
    },
    {
      title: "Request Date",
      dataIndex: "requestDate",
      key: "requestDate",
      render: (_: any, data: any) => <div className="status_container">{formatDate(data.createdAt, "DD/MM/YYYY")}</div>,
    },
    {
      title: "Date From",
      dataIndex: "start",
      key: "start",
      render: (_: any, data: any) => <div className="status_container">{formatDate(data.dateFrom, "DD/MM/YYYY")}</div>,
    },
    {
      title: "Date To",
      dataIndex: "end",
      key: "end",
      render: (_: any, data: any) => (
        <div className="status_container">{dayjs.utc(data.dateTo).utcOffset(utcOffsetInMinutes).format("DD/MM/YYYY")}</div>
      ),
    },
    {
      title: "Leave Type",
      width: 180,
      dataIndex: "type",
      render: (_: any, data: any) => {
        return (
          <div className="status_container px-[10px] py-[3px] relative text-left">
            <span
              className=" absolute top-0 bottom-0 left-0 w-[4px] rounded-lg "
              style={{
                backgroundColor: renderSpanBG[data.type],
                color: "#fff",
              }}
            />
            {data.type}
          </div>
        );
      },
      key: "leaveType",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (_: any, record: any) => {
        let difference;

        if (record.durationType === "HALF_DAY") {
          const timeFrom = dayjs(record.timeFrom);
          const timeTo = dayjs(record.timeTo);

          difference = timeTo.diff(timeFrom, "hours");
          difference = `${difference} hour${difference > 1 ? 's' : ''}`;
        } else {
          difference = `${record?.duration} day${record?.duration != 1 ? "s" : ""}`;
        }

        return (
          <span>
            {difference}
          </span>
        )
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 80,
      key: "status",
      render: (_: any, data: any) => (
        <div
          className="status_container px-[10px] py-[3px] rounded-lg text-xs"
          style={{
            backgroundColor: statusBGRendar[data.status],
            color: "#fff",
            textAlign: "center",
          }}
        >
          {data.status}
        </div>
      ),
    },
    {
      title: <p className="text-center">Action</p>,
      key: "action",
      render: (_: any, data: any) => {
        let id = data.id;

        return (
          <Dropdown placement="bottomRight" menu={{ items: myItems(data) }}>
            <MoreIcon className=" cursor-pointer " />
          </Dropdown>
        );
      },
    },
  ];

  // React hooks declarations
  // ------------------------------------------------------


  // Custom functions
  // ------------------------------------------------------

  const formatDate = (time: any, format: string) => dayjs(time).format(format);

  const approveDeclineRequest = (event: any) => {
    let id = parseInt(event.currentTarget.id);
    let params = removeEmptyValues(filter);
    let status = event.currentTarget.className.includes("approve") ? "APPROVED" : "DECLINED";

    approveDeclineLeaveRequest({ leaveId: id, status: status }).then(() => {
      getLeaveHistoryList(params, tableParams, setTableParams, setLoading);
    });
  };

  const removeEmptyValues = (obj: Record<string, any>): Record<string, any> => {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined && value !== "" && value !== "Select"));
  };

  const viewDetail = (event: any) => {
    const id = event.currentTarget.id;

    if (id !== leaveDetailId) getLeaveDetailById(id);

    setOpenDrawer({ open: true, type: "viewDetail" });
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const { current }: any = pagination;

    setTableParams({ pagination });
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: current,
    }));
    setLeaveHistory([]);
  };

  // Render
  // ------------------------------------------------------

  return (
    <GlobalTable
      id={id}
      loading={loading}
      pagination={tableParams.pagination}
      tableData={leaveHistory?.data}
      pagesObj={leaveHistory?.pagination}
      handleTableChange={handleTableChange}
      columns={role === constants.INTERN ? intrneeColumData : managerColumData}
    />
  );
};
export default LeaveHistoryTable;
