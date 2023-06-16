import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import dayjs from "dayjs";
import { Avatar, Typography } from "antd";
import { currentUserRoleState } from "../../../store";
import { Notifications, GlobalTable } from '../../../components';
import { MoreIcon } from '../../../assets/images';
import constants from '../../../config/constants';
import DropDownNew from "../../../components/Dropdown/DropDownNew";
import useCustomHook from "../actionHandler";

const { Text } = Typography;

const LeaveHistoryTable = (props: any) => {
  // Variable declarations
  // ------------------------------------------------------

  const role = useRecoilValue(currentUserRoleState);
  const { id, setOpenDrawer, setOpenModal, setSelectedRow } = props;
  const {
    leaveStats, getLeaveStats,
    leaveHistory, getLeaveHistoryList,
    upcomingHolidays, getUpcomingHolidaysList
  } = useCustomHook();
  const [state, setState] = useState({
    page: 1,
  });

  const statusBGRendar: any = {
    "PENDING": "#FFC15E",
    "DECLINE": "#D83A52",
    "APPROVED": "#4ED185",
  }

  const renderSpanBG: any = {
    "Sick": "#4CA4FD",
    "Casual": "#FFC15D",
    "Work From Home": "#E96F7C",
    "Medical": "#6AAD8E",
  }

  const intrneeColumData = [
    {
      title: 'No',
      dataIndex: 'key',
      key: 'key',
      render: (_: any, data: any, index: any) => (
        <div>{index < 9 ? `0${index + 1}` : index + 1}</div>
      )
    },
    {
      title: 'Request Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_: any, data: any) => (
        <div
          className="status_container">
          {formatDate(data.createdAt, "DD/MM/YYYY")}
        </div>
      ),

    },
    {
      title: 'Date From',
      dataIndex: 'dateFrom',
      key: 'dateFrom',
      render: (_: any, data: any) => (
        <div
          className="status_container">
          {formatDate(data.dateFrom, "DD/MM/YYYY")}
        </div>
      ),

    },
    {
      title: 'Date  To',
      dataIndex: "dateTo",
      key: 'dateTo',
      render: (_: any, data: any) => (
        <div
          className="status_container">
          {formatDate(data.dateTo, "DD/MM/YYYY")}
        </div>
      ),
    },
    {
      title: 'Leave Type',
      width: 180,
      dataIndex: 'type',
      render: (_: any, data: any) => (
        <div className="status_container px-[10px] py-[3px] relative text-left capitalize">
          <span className=" absolute top-0 bottom-0 left-0 w-[4px] rounded-lg "
            style={{
              backgroundColor: renderSpanBG[data.type],
              color: "#fff"
            }}
          />
          {data.type.toLowerCase()}
        </div>
      ),
      key: 'type',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (_: any, data: any) => (
        <div>
          {data.description ? data.description : "-"}
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 80,
      render: (_: any, data: any) => (
        <div
          className="status_container px-[10px] py-[3px] rounded-lg capitalize "
          style={{
            backgroundColor: statusBGRendar[data.status],
            color: "#fff",
            textAlign: "center",
          }}>
          {data.status.toLowerCase()}
        </div>
      ),
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, data: any) => (
        <DropDownNew placement="bottomRight" items={[
          {
            label: <p onClick={() => setOpenDrawer({ open: true, type: 'viewDetail' })}
              className="cursor-pointer">View Details</p>, key: 'viewDetail'
          },
          data.status === "PENDING" && {
            label: <p onClick={() => {
              setOpenModal({ open: true, type: 'edit' })
            }}
              className="cursor-pointer my-[-10px]">Edit</p>, key: 'edit'
          },
          data.status === "PENDING" && {
            label: <p onClick={() => {
              setOpenModal({ open: true, type: 'cancel' });
            }}
              className="cursor-pointer" >Cancel</p>, key: 'cancel'
          },
        ]} >
          <MoreIcon className=" cursor-pointer " onClick={() => setSelectedRow(data)} />
        </DropDownNew>
      ),
    },
  ];

  const managerColumData = [
    {
      title: 'No',
      dataIndex: 'key',
      key: 'key',
      render: (_: any, data: any, index: any) => (
        <div>{index < 9 ? `0${index + 1}` : index + 1}</div>
      )
    },
    {
      title: 'Avatar',
      dataIndex: 'img',
      key: 'key',
      render: (_: any, data: any) => {
        const { intern: { userDetail: { firstName, lastName, profileImage } } } = data;

        return (
          <div className='w-[38px] h-[38] rounded-full object-cover'>
            {
              profileImage ?
                <img src={profileImage} className=" rounded-full w-full h-full object-cover" /> :
                <Avatar size={32}>
                  {firstName[0].toUpperCase()}{lastName[0].toUpperCase()}
                </Avatar>
            }
          </div>
        )
      }
    },
    {
      title: 'Intern Name',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, data: any) => {
        const { intern: { userDetail: { firstName, lastName } } } = data;

        return (
          <div className='w-fit h-[38] rounded-full object-cover'>
            <Text>
              {firstName} {lastName}
            </Text>
          </div>
        )
      }
    },
    {
      title: 'Request Date',
      dataIndex: 'requestDate',
      key: 'requestDate',
      render: (_: any, data: any) => (
        <div
          className="status_container">
          {formatDate(data.requestDate, "DD/MM/YYYY")}
        </div>
      ),

    },
    {
      title: 'Date From',
      dataIndex: 'start',
      key: 'start',
      render: (_: any, data: any) => (
        <div
          className="status_container">
          {formatDate(data.start, "DD/MM/YYYY")}
        </div>
      ),

    },
    {
      title: 'Date  To',
      dataIndex: "end",
      key: 'end',
      render: (_: any, data: any) => (
        <div
          className="status_container">
          {formatDate(data.end, "DD/MM/YYYY")}
        </div>
      ),
    },
    {
      title: 'Leave Type',
      width: 180,
      dataIndex: 'type',
      render: (_: any, data: any) => {
        return (
          <div className="status_container px-[10px] py-[3px] relative text-left">
            <span className=" absolute top-0 bottom-0 left-0 w-[4px] rounded-lg "
              style={{
                backgroundColor: renderSpanBG[data.type],
                color: "#fff"
              }}
            />
            {data.type}
          </div>
        )
      },
      key: 'leaveType',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 80,
      render: (_: any, data: any) => (
        <div
          className="status_container px-[10px] py-[3px] rounded-lg text-xs"
          style={{
            backgroundColor: data.status === "Pending" ?
              "#FFC15E" : data.status === "Declined" ?
                "#D83A52" : "#4ED185",
            color: "#fff",
            textAlign: "center",
          }}>
          {data.status}
        </div>
      ),
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, data: any) => (
        <DropDownNew placement="bottomRight" items={[
          { label: <p onClick={() => setOpenDrawer({ open: true, type: 'viewDetail' })}>View Details</p>, key: 'viewDetail' },
          (data.status === "PENDING") && { label: <p onClick={() => { { Notifications({ title: 'Approved', description: 'Approved successfully', type: 'success' }) } }}>Approve</p>, key: 'approve' },
          (data.status === "DECLINED") && { label: <p onClick={() => { Notifications({ title: 'Declined', description: 'Declined sucessfully', type: 'success' }) }}>Decline</p>, key: 'decline' },
        ]}>
          <MoreIcon className=" cursor-pointer " onClick={() => setSelectedRow(data)} />
        </DropDownNew>
      ),
    },
  ];

  // React hooks declarations
  // ------------------------------------------------------

  useEffect(() => {

  }, []);

  // Custom functions
  // ------------------------------------------------------

  const formatDate = (time: any, format: string) => dayjs(time).format(format);

  // Render
  // ------------------------------------------------------

  return (
    <GlobalTable
      id={id}
      tableData={leaveHistory}
      pagination={true}
      columns={role === constants.INTERN ? intrneeColumData : managerColumData}
    />
  )
}
export default LeaveHistoryTable