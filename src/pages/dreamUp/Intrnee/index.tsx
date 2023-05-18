import { Col, Dropdown, Row, Space } from "antd"
import { useNavigate } from "react-router-dom"
import { MoreIcon } from "../../../assets/images"
import { Alert, BoxWrapper, Button, GlobalTable, HorizonalLineCard, LifeAssessmentGraph, LifeBalanceGraph, SearchBar } from "../../../components"
import { ROUTES_CONSTANTS } from "../../../config/constants"
import "./style.scss"
import useCustomHook from "../actionHandler"
import { useRecoilValue } from "recoil"
import { getGoalsAtom } from "../../../store/dreamUP"
import { useEffect, useState } from "react"
import DropDownNew from "../../../components/Dropdown/DropDownNew"
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
const DreamUp = () => {
  const navigate = useNavigate()
  const { getGoalState, getGolas, deleteGoal }: any = useCustomHook();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [id, setID] = useState('');
  // const tableData = useRecoilValue(getGoalsSelector);
  useEffect(() => {
    getGolas();
  }, [])
  const data = getGoalState?.response
  const columData = [
    {
      title: 'No.',
      dataIndex: 'id',
      key: 'id',
      render: (_: any, data: any, index: any) => (
        <div>{index < 9 ? `0${index + 1}` : index + 1}</div>
      )
    },
    {
      title: 'Goal Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Date Created ',
      dataIndex: 'createdAt',
      key: 'createdAt',
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
      key: 'endDate',
      dataIndex: 'endDate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 100,
      render: (_: any, data: any) => (
        <span
          className="status_container px-[10px] py-[3px] rounded-lg capitalize "
          style={{
            backgroundColor: data.status === "active" ?
              "#4783FF" : data.status === "completed" ?
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
          <DropDownNew items={[
            { label: <p onClick={((e) => { alert("View Details") })}>View Details</p>, key: 'viewDetail' },
            { label: <p onClick={((e) => { setIsDeleteOpen(true); setID(data.id) })}>Delete</p>, key: 'delete' },
          ]}
            placement={'bottomRight'}
            className='absolute right-[20px] top-[20px] cursor-pointer'>
            <MoreIcon className=" cursor-pointer " onClick={() => { }} />
          </DropDownNew>
        </Space >
      ),
    },
  ];
  // console.log(getGoalState?.response,"getGoalState");
  // console.log(tableData,"tableData");
  return (
    <div className="Dram_upMain">
      <Row gutter={[20, 20]}>
        <Col xs={24} md={24} lg={10} xl={8}>
          <HorizonalLineCard
            arraydata={LineGraphData}
          />
        </Col>
        <Col xs={24} md={24} lg={14} xl={8}>
          <BoxWrapper boxShadow=' 0px 0px 8px 1px rgba(9, 161, 218, 0.1)' className="h-full Life_balanceGraph">
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-medium  ">Life Balance</h4>
            </div>
            <LifeBalanceGraph monthName="Jan" />
          </BoxWrapper>
        </Col>
        <Col xs={24} md={24} lg={24} xl={8}>
          <BoxWrapper boxShadow=' 0px 0px 8px 1px rgba(9, 161, 218, 0.1)' className="h-full Life_assesment">
            <div className="flex items-center justify-between Life_assesment_inner_main_heading_wraper">
              <h4 className="text-xl font-medium  ">Life Assessment</h4>
            </div>
            <LifeAssessmentGraph monthName="Jan" />
          </BoxWrapper>
        </Col>
      </Row>
      <Row gutter={[20, 20]} className=' items-center my-8'>
        <Col xl={6} lg={9} md={24} sm={24} xs={24}>
          <SearchBar handleChange={(e: any) => { console.log(e); }} />
        </Col>
        <Col xl={18} lg={15} md={24} sm={24} xs={24} >
          <div className='flex items-center lg:justify-end view_history_button_wrapper'>
            <Button
              label="All Goals"
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
      <Alert
        state={isDeleteOpen}
        setState={setIsDeleteOpen}
        type="error"
        okBtntxt="Delete"
        cancelBtntxt="Cancel"
        children={<p>Are you sure you want to delete this?</p>}
        okBtnFunc={() => deleteGoal(id)}
      />
    </div>
  )
}

export default DreamUp