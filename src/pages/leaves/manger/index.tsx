import Button from 'antd/es/button'
import { Col, Row } from 'antd/es/grid'
import { useNavigate } from 'react-router-dom'
import {LeaveCard, PageHeader, UpcomingHolidayComp } from '../../../components'
import { ROUTES_CONSTANTS } from '../../../config/constants'
import { HeartIcon, LeavesIcon, MedicalHeart, WorkFromHom } from '../../../assets/images'
import { leaveCardDataManager, upcomingHolidayDataManager } from './managerMockData'
import { BoxWrapper } from '../../../components/BoxWrapper/BoxWrapper'
// import Calendar from '../../calendar'
import "./style.scss"
import MAnagerCalendar from './ManagerCalendar'
const CardIcon = [
  { Icon: HeartIcon, bg: "rgba(76, 164, 253, 0.1)" },
  { Icon: LeavesIcon, bg: "rgba(255, 193, 93, 0.1)" },
  { Icon: WorkFromHom, bg: "rgba(233, 111, 124, 0.1)" },
  { Icon: MedicalHeart, bg: "rgba(106, 173, 142, 0.1)" }
]
const index = () => {
  const navigate = useNavigate()
  return (
    <div className='manager_main'>
    <PageHeader
        actions
        bordered
        title="Leave"
      >
        <div className='flex items-center justify-end view_history_button_wrapper'>
          <Button className='button font-semibold' onClick={() => navigate(`/${ROUTES_CONSTANTS.VIEWLEAVEHISTORY}`)}>View History</Button>
        </div>
      </PageHeader>
      <Row gutter={[20, 20]} >
        {leaveCardDataManager.map((data: any, index: number) => (
          <Col className="gutter-row" xs={24} sm={12} md={12} lg={8} xl={6} >
            <LeaveCard Icon={CardIcon[index].Icon} bg={CardIcon[index].bg} title={data.leavType} total={data.leaveLength} pending={data.pending} approved={data.approved} declined={data.declined} />
          </Col>
        ))}
      </Row>
      <Row className='mt-[30px] second_row h-full' gutter={[20, 20]}>
        <Col xs={24} md={12} xl={17}>
          <BoxWrapper boxShadow=' 0px 0px 8px 1px rgba(9, 161, 218, 0.1)' className='h-full'>
            <MAnagerCalendar />
          </BoxWrapper>
        </Col>
        <Col xs={24} md={12} xl={7} >
          <UpcomingHolidayComp upcomingHolidayData={upcomingHolidayDataManager} />
        </Col>
      </Row>
    </div>
  )
}

export default index