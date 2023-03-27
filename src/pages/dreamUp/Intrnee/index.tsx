import { Col, Row } from "antd"
import { BoxWrapper, HorizonalLineCard } from "../../../components"
import Graph from "../../../components/Graph"
// import Graph from "../../../components/Graph/graphForLifeAssessmentAndLifeBalance/lifeBalance"
const LineGraphData = [
  {
    content: '10 of 10 tasks completed',
    icon: '/src/assets/images/AddEventInCalendar/icon.svg',
    progressbarColor: 'red',
    progressbarValue: 50,
    storage: '128GB',
    subTitle: 'Create Balance in Life',
    title: 'Main Goal'
  },
  {
    content: '10 of 10 tasks completed',
    icon: '/src/assets/images/AddEventInCalendar/icon.svg',
    progressbarColor: 'green',
    progressbarValue: 50,
    storage: '128GB',
    subTitle: 'Create Balance in Life',
    title: 'Last Achievement'
  }
]

const DreamUp = () => {
  return (
    <div className="Dram_upMain">
      <Row gutter={[20, 20]}>
        <Col xs={24} lg={8}>
          <HorizonalLineCard
            arraydata={LineGraphData}
          />
        </Col>
        <Col lg={8}>
          <Graph monthName="Jan" />
        </Col>
        <Col lg={8}>
        </Col>
      </Row>
    </div>
  )
}

export default DreamUp