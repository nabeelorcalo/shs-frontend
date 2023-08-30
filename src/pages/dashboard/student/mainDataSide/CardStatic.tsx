import React, { useEffect } from 'react'
import { Row, Col, Typography } from 'antd';
import { Apply, InterView, LocationSun, Sun } from '../../../../assets/images';
import { TodayWeather } from '../../../../components';
import useCustomHook from '../../actionHandler';
import { useRecoilState } from 'recoil';
import { dashboardWidgetState } from '../../../../store/dashboard/student';

const CardStatic = () => {
  const action = useCustomHook();
  const studentDashboardWidget = useRecoilState<any>(dashboardWidgetState);

  useEffect(() => {
    action.getStudentWidget()
  }, [])

  return (
    <div className='card-stat'>
      <Row gutter={[15, 15]}>
        <Col xxl={8} xl={10} lg={12} md={24} sm={24} xs={24}>
          <div className='card-static '>
            <div className='card-upper'>
              <div className='bg-[#4783FF0D] h-[50px] p-2 rounded-[10.909px]'>
              <Apply />
              </div>
              <div>
                <Typography className='card-head'>Apply</Typography>
                <Typography className='card-number'>{studentDashboardWidget[0]?.apply}</Typography>
              </div>
              <div className='absolute right-[-22px] bottom-[-105px]  opacity-[0.2]'>
                <Apply className='h-[150px] w-[150px]' />
              </div>
            </div>
          </div>
        </Col>
        <Col xxl={8} xl={10} lg={12} md={24} sm={24} xs={24}>
          <div className='card-static '>
            <div className='card-upper'>
              <div className='bg-[#FFC15D0D] h-[50px] p-2 rounded-[10.909px]'>
              <InterView />
              </div>
              <div>
                <Typography className='card-head'>Interviews</Typography>
                <Typography className='card-number'>{studentDashboardWidget[0]?.interviews}</Typography>
              </div>
              <div className='absolute right-[-23px] bottom-[-105px] opacity-[0.2]'>
                <InterView className='h-[150px] w-[150px]' />
              </div>
            </div>
          </div>
        </Col>
        <Col xxl={8} xl={10} lg={12} md={12} sm={24} xs={24}>
          <TodayWeather isStudent />
        </Col>
      </Row>
    </div>
  )
}

export default CardStatic