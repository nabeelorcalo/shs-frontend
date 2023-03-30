
import { Col, Row } from 'antd/es/grid';
import { useState } from 'react'
import { AddGoalIcon, AddGoalPlusIcon, CircleMinusIcon, CirclePlusIcon, MoreIcon } from '../../../assets/images';
import { BoxWrapper, Button, PageHeader, SearchBar } from '../../../components'
import useCustomHook from '../actionHandler';
import { SetGoal } from './addGoalModal';
import { goalsData } from './allGoalMockData';
import "./style.scss";
import { Collapse, Divider, Dropdown, MenuProps } from 'antd';
const { Panel } = Collapse;
const AllGoals = () => {
  const action = useCustomHook();
  const [openAdGoal, setOpenAddGoal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<any>(goalsData[0]?.details);
  const customExpandIcon = ({ isActive }: any) => {
    const icon = isActive ? <CircleMinusIcon /> : <CirclePlusIcon />;
    return <span className="custom-expand-icon">{icon}</span>;
  };
  const items: MenuProps['items'] = [
    {
      label: <a>Mark as Completed</a>,
      key: '0',
    },
    {
      label: <a>Edit</a>,
      key: '1',
    },
    {
      label: <a>Delete</a>,
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
        <Row className=' items-center' gutter={[10, 10]}>
          <Col xs={24} md={12} lg={12}>
            <SearchBar className="SearchBar" handleChange={(e: any) => {
              console.log(e);
            }} />
          </Col>
          <Col xs={24} md={12} lg={12} >
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
          <Col lg={7}>
            <BoxWrapper boxShadow=' 0px 0px 8px 1px rgba(9, 161, 218, 0.1)' className='Goals_tab h-screen' >
              <h1 className='font-medium text-xl mb-5 '>My Goals</h1>
              {goalsData.length === 0 ?
                <div className='h-full flex items-center justify-center Goals_tab_no_task'>
                  <p>You haven't added any goal yet.</p>
                </div>
                :
                <div className='goals_main_wrapper overflow-y-auto '>
                  {goalsData.map((data: any) => (
                    <div className='goal_card rounded-lg px-[20px] py-[18px] cursor-pointer mb-3' key={data.id} onClick={() => setSelectedGoal(data?.details)}>
                      <div className='date_status flex items-center justify-between'>
                        <span className='date text-sm'>{data.date}</span>
                        <span className='status_wraper px-3 py-1 rounded-lg capitalize ' style={{ backgroundColor: data.status === "Active" ? "#4783FF" : "#4ED185" }}>{data.status}</span>
                      </div>
                      <p className='Goal_name mt-[]'>{data.goalName}</p>
                    </div>
                  ))}
                </div>
              }
            </BoxWrapper>
          </Col>
          <Col lg={17}>
            <BoxWrapper boxShadow=' 0px 0px 8px 1px rgba(9, 161, 218, 0.1)' className='Goals_tab_details h-screen'>
              <Divider />
              <div className='flex items-center justify-end Add_new_task mb-5'>
                <Button
                  icon={<AddGoalPlusIcon className="mr-1" />}
                  label="Add New Task"
                  onClick={() => alert("AddGoal Modal")}
                  size="middle"
                  className="Request_leave flex items-center justify-center"
                />
              </div>
              {selectedGoal?.length === 0 ?
                <>
                  <h1 className='font-medium text-xl '>hello</h1>
                  <div className='h-full flex items-center justify-center'>
                    <div className=' text-center Goals_tab_details_no_task'>
                      <p className='main font-semibold text-xs'>Your task list is empty</p>
                      <p>You haven't added any goal yet.</p>
                    </div>
                  </div>
                </>
                :

                <>
                  <Collapse accordion className='collaps_main' expandIcon={customExpandIcon} bordered={false} collapsible={'icon'}>
                    {
                      selectedGoal?.map((goalDetail: any, i: number) => (
                        <Panel key={i}
                          header={<div className='goals_task_Accordion flex items-center justify-between'>
                            <span className='heading_date flex flex-col'>
                              <span className='Heading'>{goalDetail?.title}</span>
                              <span className='date text-sm'>{goalDetail?.date}</span>
                            </span>
                            <Dropdown menu={{ items }} trigger={['click']}>
                              <a onClick={(e) => e.preventDefault()}>
                                <MoreIcon className='' style={{ transform: 'rotate(90deg)' }} />
                              </a>
                            </Dropdown>
                          </div>
                          } className='mb-5'>
                          <p>{goalDetail?.description}</p>
                        </Panel>
                      ))
                    }
                  </Collapse>
                </>
              }

            </BoxWrapper>
          </Col>
        </Row>
      </div>
      <SetGoal
        title={"Set a Goal"}
        open={openAdGoal}
        setOpenAddGoal={setOpenAddGoal}
        submitAddGoal={action.addGoals}
      />
    </>
  )
}
export default AllGoals