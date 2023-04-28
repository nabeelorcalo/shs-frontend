import { Col, Progress, Row } from 'antd';
import { BoxWrapper } from '../../../components';
import "./OverAllPerfomance.scss"

export const OverAllPerfomance = (props: any) => {
  const { lg, md, sm, xs, trailColor = "#E6F4F9", strokeWidth = 10, width = 140, type = "circle", data, heading } = props
  return (
    <BoxWrapper className='overall-performance'>
      {
        heading && <p className='mb-14 font-medium text-xl text-secondary-color overall-performance-txt'>
          {heading}
        </p>
      }
      <Row className='max-sm:gap-0 lg:gap-5 justify-around'>
        {data.map((item: any, i: any) => (
          <Col key={i} lg={lg} md={md} sm={sm} xs={xs} className="text-center">
            <Progress trailColor={trailColor}
              strokeWidth={strokeWidth} width={width}
              type={type} percent={item.percent}
              strokeColor={item.strokeColor} />
            <p className='mt-4 text-center text-base font-medium '>{item.title}</p>
          </Col>
        ))}
      </Row>
    </BoxWrapper>
  )
}

{/* <div className='relative'> */ }
{/* <div className='circle-div absolute top-11'></div> */ }
{/* </div> */ }