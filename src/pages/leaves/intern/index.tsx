import { Button, Col, Divider, Row } from 'antd'
import { HeartIcon, LeavesIcon, MedicalHeart, WorkFromHom } from '../../../assets/images'
import { LeaveCard } from '../../../components'
import {BoxWrapper} from '../../../components/BoxWrapper/BoxWrapper';
import Calendar from "./calendar/calendar"
import action from "../actionHandler"
import "./style.scss"
import { useNavigate } from 'react-router-dom';
import { ROUTES_CONSTANTS } from '../../../config/constants';
// import {LeaveRequest} from '../../../components';
import { leaveCardData, upcomingHolidayData } from './internMockdata';
import UpcomingHolidayComp from './upcomingHoliday';
const CardIcon = [
  { Icon: HeartIcon, bg: "rgba(76, 164, 253, 0.1)" },
  { Icon: LeavesIcon, bg: "rgba(255, 193, 93, 0.1)" },
  { Icon: WorkFromHom, bg: "rgba(233, 111, 124, 0.1)" },
  { Icon: MedicalHeart, bg: "rgba(106, 173, 142, 0.1)" }
]
const index = () => {
  const navigate = useNavigate()

  return (
    <div className='intrne_main'>
      <Row className=' items-center'>
        <Col xs={24} md={12} lg={12}>
          <h3 className='m-0 font-semibold '>Leave</h3>
        </Col>
        <Col xs={24} md={12} lg={12} >
          <div className='flex items-center justify-end view_history_button_wrapper'>
            <Button className='button font-semibold' onClick={() => navigate(`/${ROUTES_CONSTANTS.VIEWLEAVEHISTORY}`)}>View History</Button>
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
         <UpcomingHolidayComp upcomingHolidayData={upcomingHolidayData}/>
        </Col>
      </Row>
    </div>
  )
}
export default index