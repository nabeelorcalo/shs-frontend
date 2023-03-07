import { Button, Col, Divider, Row, Typography } from 'antd'
import { HeartIcon, LeavesIcon, MedicalHeart, WorkFromHom } from '../../../assets/images'
import { LeaveCard } from '../../../components'
import BoxWrapper from '../../../components/BoxWrapper/boxWrapper';
import Calendar from "./calendar/calendar"
import action from "../actionHandler"
import "./style.scss"
const leaveCardData: any = [
  {
    leavType: "Sick",
    leaveLength: 27,
    pending: 10,
    approved: 5,
    declined: 10,
  },
  {
    leavType: "Casual ",
    leaveLength: 17,
    pending: 6,
    approved: 5,
    declined: 9,
  },
  {
    leavType: "Work From Home",
    leaveLength: 17,
    pending: 11,
    approved: 10,
    declined: 8,
  },
  {
    leavType: "Medical",
    leaveLength: 19,
    pending: 12,
    approved: 11,
    declined: 5,
  },
]
const upcomingHolidayData: any = [
  { id: "1", day: "Monday", date: "1 january", holidayType: "New Year's Day" },
  { id: "2", day: "Monday", date: "2 january", holidayType: "New Year's Day" },
  { id: "3", day: "Monday", date: "3 january", holidayType: "New Year's Day" },
  { id: "4", day: "Monday", date: "4 january", holidayType: "New Year's Day" },
  { id: "5", day: "Monday", date: "5 january", holidayType: "New Year's Day" },
  { id: "6", day: "Monday", date: "6 january", holidayType: "New Year's Day" },
  { id: "7", day: "Monday", date: "7 january", holidayType: "New Year's Day" },
  { id: "8", day: "Monday", date: "8 january", holidayType: "New Year's Day" },
  { id: "9", day: "Monday", date: "9 january", holidayType: "New Year's Day" },
  { id: "10", day: "Monday", date: "10 january", holidayType: "New Year's Day" },
]
const CardIcon = [
  { Icon: HeartIcon, bg: "rgba(76, 164, 253, 0.1)" },
  { Icon: LeavesIcon, bg: "rgba(255, 193, 93, 0.1)" },
  { Icon: WorkFromHom, bg: "rgba(233, 111, 124, 0.1)" },
  { Icon: MedicalHeart, bg: "rgba(106, 173, 142, 0.1)" }
]
const index = () => {
  return (
    <div className='intrne_main'>
      <Row className=' items-center'>
        <Col xs={24} md={12} lg={12}>
          <h3 className='m-0 font-semibold '>Leave</h3>
        </Col>
        <Col xs={24} md={12} lg={12} >
          <div className='flex items-center justify-end view_history_button_wrapper'>
          <Button className='button font-semibold'>View History</Button>

          </div>
        </Col>
        <Divider />
      </Row>
      <Row gutter={[20, 20]} >
        {leaveCardData.map((data: any, index: number) => (
          <Col className="gutter-row" xs={24} sm={12} md={12} lg={8} xl={6} >
            <LeaveCard Icon={CardIcon[index].Icon} bg={CardIcon[index].bg} title={data.leavType} total={data.leaveLength} pending={data.pending} approved={data.approved} declined={data.declined} />
          </Col>
        ))}
      </Row>
      <Row className='mt-[30px] second_row h-full' gutter={[20, 20]}>
        <Col xs={24} md={12} xl={17}>
          <BoxWrapper className='h-full'>
            <Calendar />
          </BoxWrapper>
        </Col>
        <Col xs={24} md={12} xl={7} >
          <BoxWrapper className="left_upcoming_holiudays">
            <h4 className='upcomming_Holiday font-medium text-xl mb-4 '>Upcoming Holidays</h4>
            <ul className='upcoming_holidayList p-0 m-0  list-none h-[470px] overflow-y-auto'>
              {upcomingHolidayData.map((data: any) => (
                <li key={data.id} className='List_item_wrapper'>
                  <div className='List_item_main flex items-center justify-between '>
                    <div className='left_side'>
                      <p className='light_text text-sm font-norma '>{data.day}</p>
                      <p className='date_text text-base font-normal'>{data.date}</p>
                    </div>
                    <p className='holiday_typeText text-base font-normal'>{data.holidayType}</p>
                  </div>
                  <Divider style={{ margin: "10px 0", borderColor: "#D9DBE9" }} />
                </li>
              ))}
            </ul>
          </BoxWrapper>
        </Col>
      </Row>
    </div>
  )
}
export default index