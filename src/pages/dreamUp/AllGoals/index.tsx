
import { Col, Row } from 'antd/es/grid';
import { useEffect, useState } from 'react'
import { AddGoalIcon, AddGoalPlusIcon, CircleMinusIcon, CirclePlusIcon, GoalHeaderCalanderIcon, MoreIcon, TaskSquareIcon, TickCircleGrayIcon, TickCircleGreenIcon } from '../../../assets/images';
import { Alert, BoxWrapper, Button, PageHeader, SearchBar } from '../../../components'
import useCustomHook from '../actionHandler';
import { SetGoal } from './addGoalModal';
import { goalsData } from './allGoalMockData';
import "./style.scss";
import { Collapse, Divider, Dropdown, MenuProps, Progress } from 'antd';
import { AddEditGoalTaskModal } from './addEditGoalTaskModal';
const { Panel } = Collapse;
const AllGoals = () => {
  const {getGoalState,getGolas,addGoalTask}:any = useCustomHook();

  // const myGoalData = useState(getGoalState?.response)
  const [openAdGoal, setOpenAddGoal] = useState(false);
  const [openAddGoalTask, setOpenAddGoalTask] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState<any>(getGoalState?.response ? getGoalState?.response?.[0]?.tasks:[]);
  const [mainGoalId, setMainGoalId] = useState<any>(getGoalState?.response? getGoalState?.response[0]?.id:"");
  console.log(selectedGoal, "completedcompleted");
  console.log(mainGoalId, "mainGoalId ");
  const newArr: any = []
  selectedGoal.map((data: any) => data.completed ? newArr.push(data) : []) 
  const calculatePercentage = Math.floor(((newArr.length) / selectedGoal.length) * 100);
  const [deletaAlert, setDeleteAlertModal] = useState({ isToggle: false, id: '' })
  const [dropdownDataRecord, setDropDownDataRecord] = useState<any>({})
  useEffect(() => {
    getGolas();
  }, [])
  
  const customExpandIcon = ({ isActive }: any) => {
    const icon = isActive ? <CircleMinusIcon /> : <CirclePlusIcon />;
    return <span className="custom-expand-icon">{icon}</span>;
  };
  const handleCompleted = () => {
    const newArr1 = [...selectedGoal];
    const find = newArr1.find((goal) => goal.id === dropdownDataRecord.id);
    if (!find.isCompleted) {
      find.isCompleted = true
    }
    console.log(find);
    setSelectedGoal(newArr1);
  }
  const items: MenuProps['items'] = [
    {
      label: <span onClick={handleCompleted} >Mark as Completed</span>,
      key: '0',
      disabled: dropdownDataRecord.completed ? true : false,
    },
    {
      label: <span onClick={() => { setOpenAddGoalTask(true) }} >Edit</span>,
      key: '1',
    },
    {
      label: <span onClick={() => setDeleteAlertModal({ isToggle: true, id: dropdownDataRecord.id })}>Delete</span>,
      key: '3',
    },
  ];
  return (
    <>
      <div className='allGoals_main'>
        <PageHeader
          actions
          bordered
          title={<div>All Goals | <span className="text-base text-[#363565]">Dream Up</span></div>}
        />
        <Row className='items-center' gutter={[10, 10]}>
          <Col  xs={24} sm={14}>
            <SearchBar className="SearchBar" handleChange={(e: any) => {
              console.log(e);
            }} />
          </Col>
          <Col xs={24} sm={10}  className="flex justify-end gap-4">
            <div className='flex items-center justify-end view_history_button_wrapper'>
              <Button
                icon={<AddGoalIcon className="mr-1" />}
                label="Add Goal"
                onClick={() => setOpenAddGoal(true)}
                size="middle"
                className="Request_leave flex items-center justify-center"
              />
            </div>
          </Col>
        </Row>
        <Row gutter={[20, 20]} className="mt-8">
          <Col xs={24} lg={11} xl={7}>
            <BoxWrapper boxShadow=' 0px 0px 8px 1px rgba(9, 161, 218, 0.1)' className='Goals_tab wrapper' >
              <h1 className='font-medium text-xl mb-5 '>My Goals</h1>
              {getGoalState?.response && getGoalState?.response?.length === 0 ?
                <div className='h-full flex items-center justify-center Goals_tab_no_task'>
                  <p>You haven't added any goal yet.</p>
                </div>
                :
                <div className='goals_main_wrapper overflow-y-auto '>
                  {getGoalState?.response && getGoalState?.response.map((data: any) => (
                    <div className='goal_card rounded-lg px-[20px] py-[18px] cursor-pointer mb-3' key={data?.id} onClick={() => {setSelectedGoal(data?.tasks);setMainGoalId(data?.id)}}>
                      <div className='date_status flex items-center justify-between'>
                        <span className='date text-sm'>{data?.createdAt}</span>
                        <span className='status_wraper px-3 py-1 rounded-lg capitalize ' style={{ backgroundColor: data?.status === "active" ? "#4783FF" : "#4ED185" }}>{data?.status}</span>
                      </div>
                      <p className='Goal_name mt-[] capitalize'>{data?.name}</p>
                    </div>
                  ))}
                </div>
              }
            </BoxWrapper>
          </Col>
          <Col lg={13} xl={17} xs={24}>
            <BoxWrapper boxShadow=' 0px 0px 8px 1px rgba(9, 161, 218, 0.1)' className='Goals_tab_details wrapper'>
              <div className='top_header_tasksInfo_info flex items-center justify-between flex-wrap'>
                <div className="flex flex-wrap gap-[20px] sm:gap[50px] md:gap-[25px] lg:gap-[22px]   lg:basis-[70%] basis-[100%] ">
                  <p className='heading '>Create Balance in life</p>
                  <div className='task_count'>
                    <TaskSquareIcon className='mr-2' /><span>Tasks: {selectedGoal.length}</span>
                  </div>
                  <div className='Date_wrapper'>
                    <GoalHeaderCalanderIcon className='mr-2' />
                    <span>10/05/2023</span>
                  </div>
                </div>
                <div className='progres_wrapper basis-[100%] lg:basis-[30%] '><Progress className='flex' percent={calculatePercentage} /></div>
              </div>
              <Divider />
              <div className='flex items-center justify-end Add_new_task mb-5'>
                <Button
                  icon={<AddGoalPlusIcon className="mr-1" />}
                  label="Add New Task"
                  onClick={() => setOpenAddGoalTask(true)}
                  size="middle"
                  className="Request_leave flex items-center justify-center"
                />
              </div>
              {selectedGoal?.length === 0 || getGoalState?.response?.length === 0 ?
                <>
                  {/* <h1 className='font-medium text-xl '>hello</h1>  */}
                  <div className='h-full flex items-center justify-center'>
                    <div className=' text-center Goals_tab_details_no_task'>
                      <p className='main font-semibold text-xs'>Your task list is empty</p>
                      <p>You haven't added any goal yet.</p>
                    </div>
                  </div>
                </>
                :
                <>
                  {
                    selectedGoal?.map((goalDetail: any, i: number) => {
                      return <div className="flex gap-4" key={i}>
                        <span className='mt-5' >{goalDetail?.completed ? <TickCircleGreenIcon /> : <TickCircleGrayIcon />}</span>
                        <Collapse accordion className='collaps_main flex-1' expandIcon={customExpandIcon} bordered={false} collapsible={'icon'}>
                          <Panel key={i}
                            header={<div className='goals_task_Accordion flex items-center justify-between'>
                              <span className='heading_date flex flex-col'>
                                <span className='Heading'>{goalDetail?.name}</span>
                                <span className='date text-sm'>{goalDetail?.startingDate}</span>
                              </span>
                              <Dropdown
                                menu={{ items }}
                                trigger={['click']}
                              >
                                <MoreIcon className='cursor-pointer' style={{ transform: 'rotate(90deg)' }} onClick={() => setDropDownDataRecord(goalDetail)} />
                              </Dropdown>
                            </div>
                            } className='mb-5'>
                            <p>{goalDetail?.note}</p>
                          </Panel>
                        </Collapse>
                      </div>
                    })
                  }
                </>
              }
            </BoxWrapper>
          </Col >
        </Row >
      </div >
      {openAdGoal && <SetGoal
        title={"Set a Goal"}
        open={openAdGoal}
        setOpenAddGoal={setOpenAddGoal}
        // submitAddGoal={addGoals}
      />}
      <AddEditGoalTaskModal
        title={"Add Goal Task"}
        open={openAddGoalTask}
        setOpenAddEditGoalTask={setOpenAddGoalTask}
        submitGoalTask={addGoalTask}
        mainGoalId= {mainGoalId}
      />
      {deletaAlert.isToggle && <Alert
        type={"error"}
        state={deletaAlert.isToggle}
        setState={() => setDeleteAlertModal({ isToggle: false, id: '' })}
        cancelBtntxt={"Cancle"}
        okBtntxt={"Delete"}
        okBtnFunc={() => { alert("alert") }}
        children={<p>Are you sure you want to delete this task? {deletaAlert.id}</p>}
      />}
    </>
  )
}
export default AllGoals