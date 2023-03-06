import { Col, Row, Typography } from 'antd'
import { LeaveCard } from '../../../components'
import BoxWrapper from '../../../components/BoxWrapper/boxWrapper'
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
    approvedLeaves: 11,
    declined: 5,
  },
]
const index = () => {
  return (
    <div className='intrne_main'>
      <Row gutter={16}>
        {leaveCardData.map((data: any) => (
          <Col className="gutter-row" span={6}>
            <LeaveCard icon="" title={data.leavType} total={data.leaveLength} pending={data.pending} approved={data.approved} declined={data.declined} />
          </Col>
        ))}
      </Row>
      <Row className='mt-[30px] second_row'>
        <Col span={17}>
          <h1>uwgeyrgfweu</h1>
        </Col>
        <Col span={7}>
          <BoxWrapper className="left_upcoming_holiudays">
            <h4 className='upcomming_Holiday'>Upcoming Holidays</h4>
            <ul className='upcoming_holidayList'>
              <li className='List_item_wrapper'>
                <div className='List_item_main flex items-center justify-between '>
                  <div className='left_side'>
                    <p className=''>Monday</p>
                    <p className=''>2 January</p>
                  </div>
                  <p>New Year’s Day</p>
                </div>
              </li>
            </ul>
          </BoxWrapper>
        </Col>

      </Row>


    </div>
  )
}

export default index