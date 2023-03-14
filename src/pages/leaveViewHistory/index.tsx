
import { Col, Divider, Drawer, Dropdown, Form, Row, Select, Space } from "antd";
import type { MenuProps } from 'antd';
import { BoxWrapper } from "../../components/BoxWrapper/BoxWrapper";
import GlobalTable from "../../components/Table/Table"
import "./style.scss"
import { CalendarWhiteIcon, ChevronRight, DownloadIconLeave, FilterIconLeave, LeaveProfileImg, MoreIcon } from "../../assets/images";
import { Button, DropDown, SearchBar } from "../../components";
import { useState } from "react";
import { CloseCircleFilled } from "@ant-design/icons";
import DrawerComp from "./DrawerComp";
import FilterDrawerForm from "./FilterDrawerForm";
import CalendarDrawerInner from "../leaves/intern/calendar/CalendarDrawerInner";
import FiltersButton from "../../components/FiltersButton";
import LeaveRequest from "../../components/LeaveRequest";
interface DataType {
  key: string,
  title: string,
  eventType: string,
  requestDate: string,
  start: string,
  end: string,
  leaveTypeDay: string,
  dur: string,
  hours: string,
  img: any,
  name: string,
  designation: string,
  email: string,
  aprover: string,
  ApprovedBy: string,
  status: string,
  fulldescription: string
  leaveType: string,
  description: string,
  Actions: string,
}
const data: any = [
  {
    key: '01',
    title: "Sick",
    eventType: "sick",
    requestDate: '2023-03-03',
    start: "2023-03-03T05:21:00",
    end: "2023-03-04T09:22:00",
    leaveTypeDay: "half day",
    dur: "01 day",
    hours: "04:00",
    img: LeaveProfileImg,
    name: "Maria Sanoid",
    designation: "UI UX Designer",
    email: "maria@Student Help Squad.com",
    aprover: "Amelia Clark",
    ApprovedBy: "Amelia Clark",
    status: "Pending",
    fulldescription: "As you know I don't have a car, and as it was announced there will be a strike the entire day within the public Transportation.",
    leaveType: 'sick',
    description: "High fever",
    Actions: "",
  },
  {
    key: "2",
    title: "Casual",
    eventType: "casual",
    requestDate: '2023-03-03',
    start: "2023-03-04T01:21:00",
    end: "2023-03-05T05:22:00",
    leaveTypeDay: "full day",
    dur: "01 day",
    hours: "",
    img: LeaveProfileImg,
    name: "Maria Sanoid",
    designation: "UI UX Designer",
    email: "maria@Student Help Squad.com",
    aprover: "Amelia Clark",
    ApprovedBy: "Amelia Clark",
    status: "Declined",
    fulldescription: "As you know I don't have a car, and as it was announced there will be a strike the entire day within the public Transportation.",
    leaveType: 'casual',
    description: "Casual",
    Actions: "",
  },
  {
    key: "3",
    title: "Work from home",
    eventType: "work from home",
    requestDate: '2023-03-03',
    start: "2023-03-06T06:21:00",
    end: "2023-03-08T07:22:00",
    leaveTypeDay: "half day",
    dur: "01 day",
    hours: "04:00",
    img: LeaveProfileImg,
    name: "Maria Sanoid",
    designation: "UI UX Designer",
    email: "maria@Student Help Squad.com",
    aprover: "Amelia Clark",
    ApprovedBy: "Amelia Clark",
    status: "Approved",
    fulldescription: "As you know I don't have a car, and as it was announced there will be a strike the entire day within the public Transportation.",
    leaveType: 'work from home',
    description: "work from home",
    Actions: "",
  },
  {
    key: "4",
    title: "Medical",
    eventType: "medical",
    requestDate: '2023-03-03',
    start: "2023-03-09T09:21:00",
    end: "2023-03-11T11:22:00",
    leaveTypeDay: "full day",
    dur: "01 day",
    hours: "",
    img: LeaveProfileImg,
    name: "Maria Sanoid",
    designation: "UI UX Designer",
    email: "maria@Student Help Squad.com",
    aprover: "Amelia Clark",
    ApprovedBy: "Amelia Clark",
    status: "Pending",
    fulldescription: "As you know I don't have a car, and as it was announced there will be a strike the entire day within the public Transportation.",
    leaveType: 'medical',
    description: "medical leave",
    Actions: "",
  }
];

const index = () => {
  // const items: MenuProps['items'] = [
  //   {
  //     label: <p onClick={() => {
  //       setActionType({ ...actionType, type: 'view detail' });
  //       setOpenDrawer({ type: 'view detail', open: true })
  //     }}
  //     >View Details</p>,
  //     key: '0',
  //   },
  //   {
  //     label: <p onClick={() => setActionType({ ...actionType, type: 'edit' })}>Edit</p>,
  //     key: '1',
  //   },
  //   {
  //     label: <p onClick={() => setActionType({ ...actionType, type: 'cancel' })}>Cancel</p>,
  //     key: '3',
  //   },
  // ];
  const [actionType, setActionType] = useState({ type: '', id: '' });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [openDrawer, setOpenDrawer] = useState({ open: false, type: '' })
  // const [openModal, setOpenModal] =useState()
  const columns = [
    {
      title: 'No',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Request Date',
      dataIndex: 'requestDate',
      key: 'requestDate',
    },
    {
      title: 'Date From',
      dataIndex: 'start',
      key: 'start',

    },
    {
      title: 'Date  To',
      dataIndex: 'end',
      key: 'end',
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
            dropdownRender={(menu: any) => {
              return <BoxWrapper className=" action_dropDown">
                <p onClick={() => {
                  setActionType({ ...actionType, type: 'view detail' });
                  setOpenDrawer({ type: 'view detail', open: true })
                  setSelectedRow(data)
                }}
                  className="cursor-pointer"
                >View Details</p>
                {data.status === "Pending" &&
                  <>
                    <p onClick={() => {
                      setActionType({ ...actionType, type: 'edit' });
                      setOpenDrawer({ type: 'edit', open: true });
                      setSelectedRow(data)
                    }}
                      className="my-4 cursor-pointer">
                      Edit
                    </p>
                    <p onClick={() => {
                      setActionType({ ...actionType, type: 'cancel' });
                      setOpenDrawer({ type: 'cancel', open: true });
                      setSelectedRow(data)
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
            <MoreIcon className=" cursor-pointer " onClick={() => setActionType({ ...actionType, id: data.key })} />
          </Dropdown >
        </Space >
      ),
    },
  ];

  console.log(actionType);
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
            <div className="mr-4">
              <FiltersButton
                label="Filters"
                onClick={() => setOpenDrawer({ type: 'filters', open: true })}
              />
            </div>
            <div className="mr-4">
              <DropDown
                options={[
                  'pdf',
                  'excel'
                ]}
                requiredDownloadIcon
                setValue={() => { }}
                value=""
              />
            </div>
            <Button
              color="red"
              icon={<CalendarWhiteIcon className="mr-1" />}
              label="Request Leave"
              onClick={() => setIsAddModalOpen(true)}
              size="middle"
              style={{ color: "#fff", background: "#4A9D77", display: "flex", alignItems: "center", justifyContent: "center" }}
              className="Request_leave"
            />
          </div>
        </Col>
        <Divider />
      </Row>
      <BoxWrapper>
        <GlobalTable columns={columns} tableData={data} pagination={true} />
      </BoxWrapper>

      <DrawerComp
        title={openDrawer.type === 'filters' ? "Filters" : ""}
        open={openDrawer.open}
        className={openDrawer.type === 'filters' ? "" : "Record_data"}
        closeIcon={openDrawer.type === 'filters' ? <CloseCircleFilled style={{ color: "#A3AED0", fontSize: '20px', right: "0" }} /> : false}
        onClose={() => setOpenDrawer({ type: '', open: false })}
      >
        <div>
          {openDrawer.type === 'filters' ? <FilterDrawerForm /> :
            <CalendarDrawerInner
              img={selectedRow?.img}
              name={selectedRow?.name}
              designation={selectedRow?.designation}
              email={selectedRow?.email}
              requestedOn={selectedRow?.requestDate}
              aprover={selectedRow?.aprover}
              ApprovedBy={selectedRow?.ApprovedBy}
              backgroundColor={selectedRow?.title === "Sick" ?
                "rgba(76, 164, 253, 0.25)" : selectedRow?.title === "Casual" ?
                  "rgba(255, 193, 93, 0.25)" : selectedRow?.title === "Work from home" ? "rgba(233, 111, 124, 0.25)" : "rgba(106, 173, 142, 0.25)"}
              spanBG={data?.title === "Sick" ?
                "rgba(76, 164, 253, 1)" : selectedRow?.title === "Casual" ?
                  "rgba(255, 193, 93, 1)" : selectedRow?.title === "Work from home" ? "rgba(233, 111, 124, 1)" : "rgba(106, 173, 142, 1)"}
              title={selectedRow?.title}
              dateFrom={selectedRow?.start}
              dateTo={selectedRow?.end}
              timeFrom={selectedRow?.start}
              timeTo={selectedRow?.end}
              leaveTypeDay={selectedRow?.leaveTypeDay === "half day"}
              hours={selectedRow?.hours}
              dur={selectedRow?.dur}
              reqStatus={selectedRow?.status}
              description={selectedRow?.fulldescription}
            />
          }
        </div>
      </DrawerComp>
      <LeaveRequest
        title="Leave Request"
        open={openDrawer.type === 'edit' && openDrawer.open}
        setIsAddModalOpen={setIsAddModalOpen}
        subMitLeaveBtn={() => (alert("Submit Leave Function goes here"))}
        changeLeaveTyp={(() => (alert("On Change To half or Full Day Concept goes here ")))}
      />
    </div>
  )
}

export default index