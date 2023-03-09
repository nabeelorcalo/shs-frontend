
import { Col, Divider, Drawer, Dropdown, Form, Row, Select, Space } from "antd";
import type { MenuProps } from 'antd';
import { BoxWrapper } from "../../components/BoxWrapper/boxWrapper"
import GlobalTable from "../../components/Table/Table"
import "./style.scss"
import { CalendarWhiteIcon, ChevronRight, DownloadIconLeave, FilterIconLeave, LeaveProfileImg, MoreIcon } from "../../assets/images";
import { Button, SearchBar } from "../../components";
import { useState } from "react";
import { CloseCircleFilled } from "@ant-design/icons";
import DrawerComp from "./DrawerComp";
import FilterDrawerForm from "./FilterDrawerForm";
import CalendarDrawerInner from "../leaves/intern/calendar/CalendarDrawerInner";
interface DataType {
  key: string,
  // title:string,
  // eventType: string,
  // start: string,
  // end: string,
  // leaveTypeDay: string,
  // dur:string,
  // hours:string,
  // img:any,
  // name:string,
  // designation:string,
  // email:string,
  // aprover:string,
  // ApprovedBy:string,
  // fulldescription:string,
  requestDate: string,
  dateFrom: string,
  dateTo: string,
  leaveType: string,
  description: string,
  status: string,
  Actions: string,
}


const data: DataType[] = [
  {
    // key: '01',
    // title: "Sick",
    // eventType: "sick",
    // start: "2023-03-03T05:21:00",
    // end: "2023-03-04T09:22:00",
    // leaveTypeDay: "half day",
    // dur: "01 day",
    // hours: "04:00",
    // img: LeaveProfileImg,
    // name: "Maria Sanoid",
    // designation: "UI UX Designer",
    // email: "maria@Student Help Squad.com",
    // aprover: "Amelia Clark",
    // ApprovedBy: "Amelia Clark",
    // status: "Pending",
    // fulldescription: "As you know I don't have a car, and as it was announced there will be a strike the entire day within the public Transportation."
    
    key: '01',
    requestDate: '01/07/2022',
    dateFrom: '01/07/2022',
    dateTo: '01/07/2022',
    leaveType: 'Sick',
    description: "High fever",
    status: "Pending",
    Actions: "fduhguisd",
  },
  // {
  //   key: '02',
  //   requestDate: '01/07/2022',
  //   dateFrom: '01/07/2022',
  //   dateTo: '01/07/2022',
  //   leaveType: 'Casual',
  //   description: "High fever",
  //   status: "Approved",
  //   Actions: "fduhguisd",
  // },
  // {
  //   key: '01',
  //   requestDate: '01/07/2022',
  //   dateFrom: '01/07/2022',
  //   dateTo: '01/07/2022',
  //   leaveType: 'Mediacal',
  //   description: "High fever",
  //   status: "Declined",
  //   Actions: "fduhguisd",
  // },
  // {
  //   key: '01',
  //   requestDate: '01/07/2022',
  //   dateFrom: '01/07/2022',
  //   dateTo: '01/07/2022',
  //   leaveType: 'Work From Home',
  //   description: "High fever",
  //   status: "Declined",
  //   Actions: "fduhguisd",
  // },
];

const index = () => {
  const [actionType, setActionType] = useState({ type: '', id: '' });
  const [openDrawer, setOpenDrawer] = useState({ open: false, type: '' })
  const columns = [
    {
      title: 'No',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Request Date',
      dataIndex: 'start',
      key: 'start',
    },
    {
      title: 'Date From',
      dataIndex: 'dateFrom',
      key: 'dateFrom',

    },
    {
      title: 'Date  To',
      dataIndex: 'dateTo',
      key: 'dateTo',
    },
    {
      title: 'Leave Type',
      width: 180,
      dataIndex: 'leaveType',
      render: (_: any, data: any) => (
        <div
          className="status_container px-[10px] py-[3px] relative text-left ">
          <span className=" absolute top-0 bottom-0 left-0 w-[4px] rounded-lg " style={{
            backgroundColor: data.leaveType === "Sick" ?
              "#4CA4FD" : data.leaveType === "Casual" ?
                "#FFC15D" : data.leaveType === "Work From Home" ? "#E96F7C" : "#6AAD8E",
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
            color: "#fff"
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
          <Dropdown menu={{ items }} trigger={['click']} overlayClassName='menus_dropdown_main' placement="bottomRight">
            <MoreIcon className=" cursor-pointer " onClick={() => setActionType({ ...actionType, id: data.key })} />
          </Dropdown>
          {/* <a onClick={() => alert(`Id For The Editabel record is  ${data.key} `)}></a> */}
          {/* <a onClick={()=>alert(`deleted record id  ${data.key} `)}>Delete</a> */}
        </Space>
      ),
    },
  ];
  const items: MenuProps['items'] = [
    {
      label: <p onClick={() => {
        setActionType({ ...actionType, type: 'view detail' });
        setOpenDrawer({ type: 'view detail', open: true })
      }}
      >View Details</p>,
      key: '0',
    },
    {
      label: <p onClick={() => setActionType({ ...actionType, type: 'edit' })}>Edit</p>,
      key: '1',
    },
    {
      label: <p onClick={() => setActionType({ ...actionType, type: 'cancel' })}>Cancel</p>,
      key: '3',
    },
  ];
  console.log(actionType);

  // const [open, setOpen] = useState(false);
  // const showDrawer = () => {
  //   setOpen(true);
  // };

  // const onClose = () => {
  //   setOpen(false);
  // };
  // const onFinish = (values: any) => {
  //   console.log('Success:', values);
  // };

  // const onFinishFailed = (errorInfo: any) => {
  //   console.log('Failed:', errorInfo);
  // };
  // const handleChange = (value: string) => {
  //   console.log(`selected ${value}`);
  // };
  return (
    <div className="main_view_detail">
      <Row className=' items-center'>
        <Col xs={24} md={12} lg={12}>
          <SearchBar className="SearchBar" handleChange={(e: any) => {
            console.log(e);
          }} />
        </Col>
        <Col xs={24} md={12} lg={12} >
          <div className='flex items-center justify-end view_history_button_wrapper'>
            <Button
              icon={<FilterIconLeave className="mr-2" />}
              label="Filters"
              upcomingIcon={<ChevronRight className="ml-2" />}
              onClick={() => setOpenDrawer({ type: 'filters', open: true })}
              shape="default"
              size="large"
              type="default"
              style={{ color: "#A0A3BD", background: "#E6F4F9", display: "flex", alignItems: "center", }}
              className="button_request_leave mr-5"
            />
            {/* <Dropdown menu={{ items }} trigger={['click']}> */}
            <Button
              icon={<DownloadIconLeave />}
              onClick={() => { }}
              shape="default"
              size="large"
              type="default"
              className="button_request_leave mr-5"
              style={{ background: "#E6F4F9", display: "flex", alignItems: "center", justifyContent: "center" }}
            />
            {/* </Dropdown> */}
            <Button
              icon={<CalendarWhiteIcon className="mr-1" />}
              label="Request Leave"
              onClick={() => { }}
              shape="default"
              size="large"
              type="default"
              style={{ color: "#fff", background: "#4A9D77", display: "flex", alignItems: "center", justifyContent: "center" }}
              className="button_request_leave"
            />
          </div>
        </Col>
        <Divider />
      </Row>
      <BoxWrapper>
        <GlobalTable columns={columns} tableData={data} pagination={true} />
      </BoxWrapper>
      <DrawerComp
        title={"Filters"}
        open={openDrawer.open}
        closeIcon={<CloseCircleFilled style={{ color: "#A3AED0", fontSize: '20px', right: "0" }} />}
        onClose={() => setOpenDrawer({ type: '', open: false })}
      >
        <div>
          {openDrawer.type === 'filters' ? <FilterDrawerForm /> : "hello"
            // <CalendarDrawerInner
            //   img={extendedPropsData?.img}
            //   name={extendedPropsData?.name}
            //   designation={extendedPropsData?.designation}
            //   email={extendedPropsData?.email}
            //   requestedOn={eventRange?.start}
            //   aprover={extendedPropsData?.aprover}
            //   ApprovedBy={extendedPropsData?.ApprovedBy}
            //   backgroundColor={events?.title === "Sick" ?
            //     "rgba(76, 164, 253, 0.25)" : events?.title === "Casual" ?
            //       "rgba(255, 193, 93, 0.25)" : events?.title === "Work from home" ? "rgba(233, 111, 124, 0.25)" : "rgba(106, 173, 142, 0.25)"}
            //   spanBG={events?.title === "Sick" ?
            //     "rgba(76, 164, 253, 1)" : events?.title === "Casual" ?
            //       "rgba(255, 193, 93, 1)" : events?.title === "Work from home" ? "rgba(233, 111, 124, 1)" : "rgba(106, 173, 142, 1)"}
            //   title={events?.title}
            //   dateFrom={eventRange?.start}
            //   dateTo={eventRange?.end}
            //   timeFrom={eventRange?.start}
            //   timeTo={eventRange?.end}
            //   leaveTypeDay={extendedPropsData?.leaveTypeDay === "half day"}
            //   hours={extendedPropsData?.hours}
            //   dur={extendedPropsData?.dur}
            //   reqStatus={extendedPropsData?.status}
            //   description={extendedPropsData?.description}


            // />
          }
        </div>
      </DrawerComp>
    </div>
  )
}

export default index