import { useRecoilValue } from "recoil";
import { currentUserRoleState } from "../../../store";
import dayjs from "dayjs";
import { Dropdown, Space } from 'antd';
import { BoxWrapper, Notifications } from '../../../components';
import { MoreIcon } from '../../../assets/images';
import { data } from './LeaveMockData';
import { GlobalTable } from '../../../components';
import constants from '../../../config/constants';

const formatDate = (time: any, format: string) => dayjs(time).format(format)
const LeaveHistoryTable = (props: any) => {
  const { setOpenDrawer, setOpenModal, setSelectedRow, id } = props
  const intrneeColumData = [
    {
      title: 'No',
      dataIndex: 'key',
      key: 'key',
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
      dataIndex: 'leaveType',
      render: (_: any, data: any) => (
        <div
          className="status_container px-[10px] py-[3px] relative text-left ">
          <span className=" absolute top-0 bottom-0 left-0 w-[4px] rounded-lg " style={{
            backgroundColor: data.leaveType === "sick" ?
              "#4CA4FD" : data.leaveType === "casual" ?
                "#FFC15D" : data.leaveType === "work from home" ? "#E96F7C" : "#6AAD8E",
            color: "#fff"
          }}></span>
          {data.leaveType}
        </div>
      ),

      key: 'leaveType',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 80,
      render: (_: any, data: any) => (
        <div
          className="status_container px-[10px] py-[3px] rounded-lg "
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
        <Space size="middle">
          <Dropdown
            // open={visibale}
            dropdownRender={() => {
              return <BoxWrapper className=" action_dropDown">
                <p onClick={() => {
                  setOpenDrawer({ open: true, type: 'viewDetail' })

                }}
                  className="cursor-pointer"
                >View Details</p>
                {data.status === "Pending" &&
                  <>
                    <p onClick={() => {
                      setOpenModal({ open: true, type: 'edit' })

                    }}
                      className="my-4 cursor-pointer">
                      Edit
                    </p>
                    <p onClick={() => {
                      setOpenModal({ open: true, type: 'cancel' });
                    }}
                      className="cursor-pointer">
                      Cancel
                    </p>
                  </>
                }
              </BoxWrapper>
            }}
            trigger={['click']}
            overlayClassName='menus_dropdown_main'
            placement="bottomRight"
          // onOpenChange={setVisibale}
          >
            <MoreIcon className=" cursor-pointer " onClick={() => setSelectedRow(data)} />
          </Dropdown >
        </Space >
      ),
    },
  ];
  const managerColumData = [
    {
      title: 'No',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Avatar',
      dataIndex: 'img',
      key: 'key',
      render: (_: any, data: any) => (
        <div className='w-[38px] h-[38] rounded-full object-cover'>
          <img src={data.img} className=" rounded-full w-full h-full object-cover" />
        </div>
      )
    },
    {
      title: 'Intern Name',
      dataIndex: 'name',
      key: 'name',
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
      dataIndex: 'leaveType',
      render: (_: any, data: any) => (
        <div
          className="status_container px-[10px] py-[3px] relative text-left ">
          <span className=" absolute top-0 bottom-0 left-0 w-[4px] rounded-lg " style={{
            backgroundColor: data.leaveType === "sick" ?
              "#4CA4FD" : data.leaveType === "casual" ?
                "#FFC15D" : data.leaveType === "work from home" ? "#E96F7C" : "#6AAD8E",
            color: "#fff"
          }}></span>
          {data.leaveType}
        </div>
      ),

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
          className="status_container px-[10px] py-[3px] rounded-lg "
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
        <Space size="middle">
          <Dropdown
            dropdownRender={() => {
              return <BoxWrapper className=" action_dropDown">

                {data.status === "Pending" &&
                  <>
                    <p onClick={()=>{{Notifications({title:'Approved',description:'Approved successfully',type:'success'})}}}
                      className=" cursor-pointer">
                      Approve
                    </p>
                    <p onClick={() => {Notifications({title:'Declined',description:'Declined sucessfully',type:'success'})}}
                      className="cursor-pointer my-4">
                      Decline
                    </p>
                  </>
                }
                <p onClick={() => setOpenDrawer({ open: true, type: 'viewDetail' })}
                  className="cursor-pointer"
                >View Details</p>
              </BoxWrapper>
            }}
            trigger={['click']}
            overlayClassName='menus_dropdown_main'
            placement="bottomRight"
          >
            <MoreIcon className=" cursor-pointer " onClick={() => setSelectedRow(data)} />
          </Dropdown >
        </Space >
      ),
    },
  ];
  const role = useRecoilValue(currentUserRoleState);

  return (
    <GlobalTable
      id={id}
      tableData={data}
      pagination={true}
      columns={role === constants.INTERN ? intrneeColumData : managerColumData}
    />
  )
}

export default LeaveHistoryTable