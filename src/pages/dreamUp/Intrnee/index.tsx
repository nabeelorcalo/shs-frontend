import { Col, Row } from "antd"
import { HorizonalLineCard } from "../../../components"

const DreamUp = () => {
  return (
    <div className="Dram_upMain">
      <Row>
        <Col xs={24} lg={8}>
          <HorizonalLineCard
            arraydata={[
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
            ]}
          />
        </Col>
      </Row>
    </div>
  )
}

export default DreamUp