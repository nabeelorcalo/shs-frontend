import { Col, Dropdown, Row, Space } from "antd"
import { useNavigate } from "react-router-dom"
import {MoreIcon } from "../../../assets/images"
import { BoxWrapper, Button, GlobalTable, HorizonalLineCard, LifeAssessmentGraph, LifeBalanceGraph, SearchBar } from "../../../components"
import { ROUTES_CONSTANTS } from "../../../config/constants"
import "./style.scss"
const LineGraphData = [
  {
    content: '6 of 10 tasks completed',
    icon: '/src/assets/images/AddEventInCalendar/GoalIcon.svg',
    progressbarColor: '#FFC15D',
    progressbarValue: 60,
    storage: '128GB',
    subTitle: 'Create Balance in Life',
    title: 'Main Goal'
  },
  {
    content: '10 of 10 tasks completed',
    icon: '/src/assets/images/AddEventInCalendar/AchivmentIcon.svg',
    progressbarColor: '#4A9D77',
    lastAchivmentTime: "1 week ago",
    progressbarValue: 100,
    storage: '128GB',
    subTitle: 'Save Money For a Trip',
    title: 'Last Achievement'
  }
]
const data: any = [
  {
    key: '1',
    goalName: "Create Balance in life",
    datecreated: "2023-03-04T09:22:00",
    totalTasks: "half day",
    completedTasks: "01 day",
    dueDate: "2023-03-04T09:22:00",
    status: "Active",
    Actions: "",
  },
  {
    key: '2',
    goalName: "Create Balance in life",
    datecreated: "2023-03-04T09:22:00",
    totalTasks: "half day",
    completedTasks: "01 day",
    dueDate: "2023-03-04T09:22:00",
    status: "Completed",
    Actions: "",
  },
  {
    key: '3',
    goalName: "Create Balance in life",
    datecreated: "2023-03-04T09:22:00",
    totalTasks: "half day",
    completedTasks: "01 day",
    dueDate: "2023-03-04T09:22:00",
    status: "Pending",
    Actions: "",
  },
];
const columData = [
  {
    title: 'No.',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Goal Name',
    dataIndex: 'goalName',
    key: 'goalName',
  },
  {
    title: 'Date Created ',
    dataIndex: 'datecreated',
    key: 'datecreated',
  },
  {
    title: 'Total Tasks',
    dataIndex: "totalTasks",
    key: 'totalTasks',
  },
  {
    title: 'Completed Tasks',
    key: 'completedTasks',
    dataIndex: 'completedTasks',
  },
  {
    title: 'Due Date',
    key: 'dueDate',
    dataIndex: 'dueDate',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: 100,
    render: (_: any, data: any) => (
      <span
        className="status_container px-[10px] py-[3px] rounded-lg "
        style={{
          backgroundColor: data.status === "Active" ?
            "#4783FF" : data.status === "Completed" ?
              "#4ED185" : " #D83A52",
          color: "#fff",
          textAlign: "center",
        }}>
        {data.status}
      </span>
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
              <p onClick={() => { }}
                className="my-2 cursor-pointer">
                View Details
              </p>
              <p onClick={() => { }}
                className="cursor-pointer">
                Delete
              </p>
            </BoxWrapper>
          }}
          trigger={['click']}
          overlayClassName='menus_dropdown_main'
          placement="bottomRight"
        // onOpenChange={setVisibale}
        >
          <MoreIcon className=" cursor-pointer " onClick={() => { }} />
        </Dropdown >
      </Space >
    ),
  },
];


const DreamUp = () => {
  const navigate = useNavigate()
  return (
    <div className="Dram_upMain">
      <Row gutter={[20, 20]}>
        <Col xs={24} md={24}  lg={10} xl={8}>
          <HorizonalLineCard
            arraydata={LineGraphData}
          />
        </Col>
        <Col  xs={24} md={24} lg={14} xl={8}>
          <BoxWrapper boxShadow=' 0px 0px 8px 1px rgba(9, 161, 218, 0.1)' className="h-full Life_balanceGraph">
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-medium  ">Life Balance</h4>
            </div>
            <LifeBalanceGraph monthName="Jan" />
          </BoxWrapper>
        </Col>
        <Col  xs={24} md={24} lg={24} xl={8}>
          <BoxWrapper boxShadow=' 0px 0px 8px 1px rgba(9, 161, 218, 0.1)' className="h-full Life_assesment">
            <div className="flex items-center justify-between Life_assesment_inner_main_heading_wraper">
              <h4 className="text-xl font-medium  ">Life Assessment</h4>
            </div>
            <LifeAssessmentGraph monthName="Jan" />
          </BoxWrapper>
        </Col>
      </Row>
      <Row gutter={[20,20]} className=' items-center my-8'>
        <Col xs={24} md={24} lg={6} xl={6}>
          <SearchBar className="SearchBar" handleChange={(e: any) => {
            console.log(e);
          }} />
        </Col>
        <Col xs={24} md={24} lg={18} xl={18} >
          <div className='flex items-center lg:justify-end view_history_button_wrapper'>
            <Button
              label="View History"
              className="button font-semibold"
              onClick={() => navigate(`/${ROUTES_CONSTANTS.ALL_GOALS}`)}
              type="primary"
            />
          </div>
        </Col>
      </Row>
      <BoxWrapper boxShadow=' 0px 0px 8px 1px rgba(9, 161, 218, 0.1)' className="Table_wrapper">
        <GlobalTable
          columns={columData}
          tableData={data}
          pagination={false}
        />
      </BoxWrapper>
    </div>
  )
}

export default DreamUp