import { Col, Progress, Row } from 'antd';
import BoxWrapper from '../../BoxWrapper/BoxWrapper';
import "./OverAllPerfomance.scss"

const OverAllPerfomance = (props: any) => {
  const { trailColor = "#E6F4F9", strokeWidth = 10, width = 140, type = "circle", data } = props
  return (
    <BoxWrapper>
      <p className='font-medium text-xl'>Overall Performance</p>
      <Row className='gap-5 justify-center'>
        {data.map((item: any, i: any) => (
          <Col key={i} lg={5} md={12} sm={24} xs={24} className="text-center">
            <Progress trailColor={trailColor} strokeWidth={strokeWidth} width={width} type={type} percent={item.percent1} strokeColor={item.strokeColor} />
            <p className='text-center text-base font-medium '>{item.title}</p>
          </Col>
        ))}
      </Row>
    </BoxWrapper>
  )
}
export default OverAllPerfomance
{/* <div className='relative'> */ }
{/* <div className='circle-div absolute top-11'></div> */ }
{/* </div> */ }