// import Button from 'antd/es/button'
import { Col, Row } from 'antd/es/grid'
import { useNavigate } from 'react-router-dom'
import "./style.scss"
import { LeaveCard, PageHeader, UpcomingHolidayComp, Button } from '../../../components'
import constants, { ROUTES_CONSTANTS } from '../../../config/constants'
import { HeartIcon, LeaveProfileImg, LeavesIcon, MedicalHeart, WorkFromHom } from '../../../assets/images'
import { BoxWrapper } from '../../../components/BoxWrapper/BoxWrapper'
import { leaveCardDataManager, LeaveTypeData, upcomingHolidayDataManager } from './managerMockData'
import ManagerCalendar from './ManagerCalendar'
// import ManagerCalendar from './ManagerCalendar'
const CardIcon = [
  { Icon: HeartIcon, bg: "rgba(76, 164, 253, 0.1)" },
  { Icon: LeavesIcon, bg: "rgba(255, 193, 93, 0.1)" },
  { Icon: WorkFromHom, bg: "rgba(233, 111, 124, 0.1)" },
  { Icon: MedicalHeart, bg: "rgba(106, 173, 142, 0.1)" }
]
const index = (props: any) => {
  const { userRole, hideTopBar } = props;
  const navigate = useNavigate()
  return (
    <div className='manager_main'>
      <PageHeader
        actions
        bordered
        title="Leave"
      >
        <div className='flex items-center justify-end view_history_button_wrapper'>
          <Button
            className='button font-semibold'
            onClick={() => navigate(`/${ROUTES_CONSTANTS.VIEWLEAVEHISTORY}`)}
            label='View History'
            size="small"
          />
        </div>
      </PageHeader>
      {constants.USER_ROLE === "CompanyAdmin" &&
        <Row gutter={[20, 20]} className="mb-5">
          {[1, 2, 3, 4].map((data: any) => (
            <Col xl={6} lg={12} md={12} sm={12} xs={24}>
              <BoxWrapper boxShadow=' 0px 0px 8px 1px rgba(9, 161, 218, 0.1)' className='LeaveRequest_card_main'>
                <div className='user_intro flex items-center justify-center flex-col mb-5'>
                  <div className='w-[64px] h-[64px] rounded-full mb-5'>
                    <img src={LeaveProfileImg} className=" rounded-full w-full h-full object-cover " />
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
            </Col>
          ))}
        </Row>}
      <Row gutter={[20, 20]} >
        {leaveCardDataManager.map((data: any, index: number) => (
          <Col className="gutter-row" xs={24} sm={12} md={12} lg={12} xl={6} >
            <LeaveCard Icon={CardIcon[index].Icon} bg={CardIcon[index].bg} title={data.leavType} total={data.leaveLength} pending={data.pending} approved={data.approved} declined={data.declined} />
          </Col>
        ))}
      </Row>
      <Row className='mt-[30px] second_row h-full' gutter={[20, 20]}>
        <Col xs={24} md={24} lg={16} xl={17}>
          <BoxWrapper boxShadow=' 0px 0px 8px 1px rgba(9, 161, 218, 0.1)' className='h-full'>
            <div className='how_is_away'>
              <h4 className='font-medium text-[28px] capitalize'>Who's Away</h4>
              <Row gutter={[10, 10]}>
                <Col xs={24} xxl={14}>
                  <p>{12} people are away this week</p>
                </Col>
                <Col xs={24} xxl={10}>

                  <div className='statue_highligter flex items-center justify-between flex-wrap'>
                    {LeaveTypeData.map((data: any) => {
                      return (
                        <div className='flex items-center'>
                          <p className='w-[10px] h-[10px] rounded-full mr-[10px]'
                            style={{
                              backgroundColor: data === "Sick" ?
                                "rgba(76, 164, 253, 1)" : data === "Casual" ?
                                  "rgba(255, 193, 93, 1)" : data === "Medical" ?
                                    "rgba(74, 157, 119, 1)" : "rgba(233, 111, 124, 1)"
                            }}></p>
                          <p>{data}</p>
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
          <UpcomingHolidayComp upcomingHolidayData={upcomingHolidayDataManager} />
        </Col>
      </Row>
    </div>
  )
}

export default index