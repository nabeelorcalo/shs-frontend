import { useState, useEffect } from "react";
import { useRecoilValue } from 'recoil'
import { Col, Row } from 'antd/es/grid'
import { useNavigate } from 'react-router-dom'
import dayjs from "dayjs"
import usecustomHook from '../actionHandler'
import { currentUserRoleState } from '../../../store'
import constants, { ROUTES_CONSTANTS } from '../../../config/constants'
import { LeaveCard, PageHeader, UpcomingHolidayComp, Button, BoxWrapper, MonthChanger } from '../../../components'
import { HeartIcon, LeaveProfileImg, LeavesIcon, MedicalHeart, WorkFromHom } from '../../../assets/images'
import { LeaveTypeData } from './managerMockData'
import ManagerCalendar from './ManagerCalendar'
import "./style.scss"

const index = (props: any) => {
  // Variable declaration block
  // ------------------------------------------------
  const navigate = useNavigate();
  const role = useRecoilValue(currentUserRoleState);

  const {
    leaveStats, getLeaveStats,
    leaveHistory, getLeaveHistoryList,
    upcomingHolidays, getUpcomingHolidaysList
  } = usecustomHook();

  const cardIcon = [
    { Icon: <HeartIcon />, bg: "rgba(76, 164, 253, 0.1)" },
    { Icon: <LeavesIcon />, bg: "rgba(255, 193, 93, 0.1)" },
    { Icon: <WorkFromHom />, bg: "rgba(233, 111, 124, 0.1)" },
    { Icon: <MedicalHeart />, bg: "rgba(106, 173, 142, 0.1)" }
  ];

  const [state, setState] = useState({
    currentDate: dayjs().locale("en"),
  });

  // React Hooks defination block
  // ------------------------------------------------
  useEffect(() => {
    const params = { page: 1, limit: 5 };
    getLeaveStats();
    getUpcomingHolidaysList();
    if (role === constants.COMPANY_ADMIN)
      getLeaveHistoryList(params);
  }, []);

  // Custom functions defination block
  // ------------------------------------------------
  const changeMonth = (event: any) => {
    let newDate: any;
    let btn = event.target.parentElement.name ?
      event.target.parentElement.name : event.target.name ?
        event.target.name : event.target.parentElement.parentElement.name;

    if (btn === "next") newDate = state.currentDate.add(1, "month");
    else if (btn === "prev") newDate = state.currentDate.subtract(1, "month");

    setState((prevState) => ({
      ...prevState,
      currentDate: newDate,
    }));
  };

  // Return block
  // ------------------------------------------------
  return (
    <div className='manager_main'>
      <PageHeader
        actions
        bordered
        title="Leaves"
      >
        <div className='flex items-center justify-end view_history_button_wrapper'>
          <Button
            className='button font-semibold px-8'
            onClick={() => navigate(`/${ROUTES_CONSTANTS.VIEWLEAVEHISTORY}`)}
            label='View History'
          // size="small"
          />
        </div>
      </PageHeader>
      {
        role === constants.COMPANY_ADMIN &&
        <div className="Leave_request_card_wrapper mb-5 flex items-center justify-between flex-wrap gap-5">
          {
            leaveHistory.map((data: any) => (
              <BoxWrapper boxShadow=' 0px 0px 8px 1px rgba(9, 161, 218, 0.1)' className='LeaveRequest_card_main max-w-[100%]  w-full'>

                <div className='user_intro flex items-center justify-center flex-col mb-5'>

                  <div className='w-[64px] h-[64px] rounded-full mb-5'>
                    <img
                      className=" rounded-full w-full h-full object-cover "
                      src="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png"
                    />
                  </div>

                  <h4 className='user_name mb-1'>Maren Press</h4>
                  <p className='designation'>Data Researcher</p>

                </div>

                <div className='about_leave_info flex items-center justify-around p-3 rounded-lg mb-5 '>

                  <div className='info_inner text-center'>
                    <p className='Name_of_cat text-sm font-normal capitalize '>Days</p>
                    <p className='count_of_cat text-sm font-normal capitalize'>1</p>
                  </div>

                  <div className='info_inner text-center'>
                    <p className='Name_of_cat text-sm font-normal capitalize '>Leave Type</p>
                    <p className='count_of_cat text-sm font-normal capitalize'>casual</p>
                  </div>

                </div>

                <div className='LeaveAplicationCardBtns_wraper flex items-center justify-between'>
                  <Button className="Declin_btn" label='Decline' size="small" type='primary' />
                  <Button className="Approve_btn" label='Approve' size="small" type='primary' />
                </div>

              </BoxWrapper>
            ))}
        </div>
      }

      {
        role !== constants.INTERN ?
          <MonthChanger
            hasDatePicker
            setState={setState}
            datePickerClassName="min-w-0"
            onClick={() => changeMonth(event)}
            month={state.currentDate.format("ddd, DD MMMM YYYY")}
          /> :
          <></>
      }

      <Row gutter={[20, 20]} >
        {
          leaveStats.map((data: any, index: number) => {
            const { type, leaveLength, pending, approved, declined } = data;

            return (
              <Col className="gutter-row" xs={24} sm={12} md={12} lg={12} xl={6} >
                <LeaveCard
                  Icon={cardIcon[index]?.Icon}
                  bg={cardIcon[index]?.bg}
                  title={type}
                  total={leaveLength}
                  pending={pending}
                  approved={approved}
                  declined={declined}
                />
              </Col>
            )
          })}
      </Row>

      <Row className='mt-[30px] second_row h-full' gutter={[20, 20]}>
        <Col xs={24} md={24} lg={16} xl={17}>
          <BoxWrapper boxShadow=' 0px 0px 8px 1px rgba(9, 161, 218, 0.1)' className='h-full'>
            <div className='how_is_away'>
              <h4 className='font-medium text-[20px] capitalize'>Who's Away</h4>

              <Row gutter={[10, 10]}>
                <Col xs={24} xxl={14}>
                  <p>{12} people are away this week</p>
                </Col>

                <Col xs={24} xxl={10}>
                  <div className='statue_highligter flex items-center justify-between flex-wrap'>
                    {
                      LeaveTypeData.map((data: any) => {
                        return (
                          <div className='flex items-center'>

                            <p className='w-[10px] h-[10px] rounded-full mr-[10px]'
                              style={{
                                backgroundColor: data === "Sick" ?
                                  "rgba(76, 164, 253, 1)" : data === "Casual" ?
                                    "rgba(255, 193, 93, 1)" : data === "Medical" ?
                                      "rgba(74, 157, 119, 1)" : "rgba(233, 111, 124, 1)"
                              }}>
                            </p>

                            <p className='font-medium'>{data}</p>
                          </div >
                        )
                      })}
                  </div>
                </Col>

              </Row>
            </div>

            <ManagerCalendar />
          </BoxWrapper>
        </Col>

        <Col xs={24} md={24} lg={8} xl={7} >
          <UpcomingHolidayComp upcomingHolidayData={upcomingHolidays} />
        </Col>
      </Row>
    </div>
  )
}

export default index