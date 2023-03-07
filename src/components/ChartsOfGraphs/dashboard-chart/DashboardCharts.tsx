import { Progress } from '@ant-design/plots';
import { Col, Row } from 'antd';
import { InfoIcon } from '../../../assets/images';
import BoxWrapper from '../../BoxWrapper/BoxWrapper';

const DashboardCharts = (props: any) => {
  const { height = 65, percent = 0.3, bgColor = "#ABAFB1", barColor = '#363565', memoryUsed = "45.5", memoryFree = "55.5", heading, usedSpace, freeSpace } = props
  const config = {
    height: height,
    autoFit: false,
    percent: percent,
    color: [barColor, bgColor],
  };
  return (
    <Row>
      <Col lg={12} md={12} sm={20} xs={24} >
        <BoxWrapper>
          <div className='flex justify-between mt-5'>
            {heading && <span className='text-secondary-color text-base font-medium'>{heading}</span>}
            <img src={InfoIcon} alt="infoIcon" />
          </div>
          <div className='flex justify-between mt-7'>
            {usedSpace && <span className='text-base font-medium '>{memoryUsed} {usedSpace}</span>}
            {freeSpace && <span className='text-base font-medium ' >{memoryFree} {freeSpace}</span>}
          </div>
          <div style={{ borderRadius: "28%", overflow: "hidden", marginTop: "-10px" }} >
            <Progress {...config} />
          </div>
        </BoxWrapper>
      </Col>
    </Row>
  )


}

export default DashboardCharts 