import { Col, Dropdown, Row, Space } from "antd"
import { useNavigate } from "react-router-dom"
import useCustomHook from '../actionHandler';
import { MoreIcon } from "../../../assets/images"
import { Alert, BoxWrapper, Button, DropDown, GlobalTable, HorizonalLineCard, LifeAssessmentGraph, LifeBalanceGraph, Loader, SearchBar } from "../../../components"
import { ROUTES_CONSTANTS } from "../../../config/constants"
import "./style.scss"
import { useRecoilValue } from "recoil";
import { barsDataState, dashGoalsDataState, lifeAssessmentState } from "../../../store";
import { useEffect, useState } from "react";

const DreamUp = () => {

  const action = useCustomHook();
  const goalsData: any = useRecoilValue(dashGoalsDataState);
  const LineGraphData: any = useRecoilValue(barsDataState);
  const lifeAssesmentData: any = useRecoilValue(lifeAssessmentState);
  const [searchValue, setSearchValue] = useState(null);
  const [deletaAlert, setDeleteAlertModal] = useState({ isToggle: false, data: {} })
  const [month, setMonth] = useState('March')
  
  const navigate = useNavigate();


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
          <Dropdown
            // open={visibale}
            dropdownRender={() => {
              return <BoxWrapper className=" action_dropDown">
                <p onClick={() => { }}
                  className="my-2 cursor-pointer">
                  View Details
                </p>
                <p onClick={() => setDeleteAlertModal({ isToggle: true, data: data })}
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
  const yourDropDwonOptions = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'Novemeber',
    'Decemebr'
  ];
  const getGoals = async (searchValue: any) => {
    await action.getGoalsData(searchValue || '');
  }
  const getBarsData = async () => {
    await action.getBarsData();
  }
  const getLifeAssessment = async (month: any) => {
    await action.getLifeAssessment(month || '');
  }
  useEffect(() => {
    getGoals(searchValue);
  }, [searchValue]);

  useEffect(() => {
    getLifeAssessment(month);
    getBarsData(); 
  }, []);

  useEffect(()=>{
    getLifeAssessment(month);
  }, [month]);
  
  const clickHandler = (event: any) => {
    setMonth(event);
    console.log(`Change your state ${event}`);
  }

  return (
    <>
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
                {lifeAssesmentData && 
                  <>
                    <LifeBalanceGraph monthName={month} />
                  </>
                }
              </BoxWrapper>
            </Col>
            <Col xs={24} md={24} lg={24} xl={8}>
              <BoxWrapper boxShadow=' 0px 0px 8px 1px rgba(9, 161, 218, 0.1)' className="h-full Life_assesment">
                <div style={{float: 'right'}} className="flex items-center justify-between"> 
                  <DropDown
                    name="Select"
                    options={yourDropDwonOptions}
                    setValue={(event: any) => clickHandler(event)}
                    value={month}
                  />
                </div>
                <div className="flex items-center justify-between Life_assesment_inner_main_heading_wraper">
                  <h4 className="text-xl font-medium  ">Life Assessment</h4>
                </div>
                <LifeAssessmentGraph monthName={month} />
              </BoxWrapper>
            </Col> 
        </Row>
        <Row gutter={[20, 20]} className=' items-center my-8'>
          <Col xl={6} lg={9} md={24} sm={24} xs={24}>
            <SearchBar handleChange={(e: any) => { setSearchValue(e) }} />
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
        { goalsData && goalsData.length !== 0 && 
          <>
            <GlobalTable
              columns={columData}
              tableData={goalsData}
              pagination={false}
            />        
          </>  
        }
        </BoxWrapper>
      </div>

      {deletaAlert.isToggle && <Alert
        type={"error"}
        state={deletaAlert.isToggle}
        setState={() => setDeleteAlertModal({ isToggle: false, data: deletaAlert.data })}
        cancelBtntxt={"Cancle"}
        okBtntxt={"Delete"}
        okBtnFunc={async ()=> await action.deleteGoal(deletaAlert.data)}
        children={<p>Are you sure you want to delete this task? {}</p>}
      />}
    </>

  )
}

export default DreamUp