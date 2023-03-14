import React, { useMemo, useState } from 'react'
import { InfoCircleFilled } from '@ant-design/icons';
import { Col, Row, Tooltip, Typography } from 'antd'
import { BoxWrapper } from '../../../../components/BoxWrapper/boxWrapper';
import GraphThree from '../../../../components/Graph/graphForRegisterAgentsAndRewards'
import constants from '../../../../config/constants';
import { cardDelegate } from './dalegateMock';

const Dashboard = () => {
  const [arrow, setArrow] = useState<any>('Show');

  const mergedArrow = useMemo(() => {
    if (arrow === 'Hide') {
      return false;
    }

    if (arrow === 'Show') {
      return true;
    }

    return {
      pointAtCenter: true,
    };
  }, [arrow]);
  return (
    <div className='dashbaord-delegate'>
      <Row gutter={[10,10]}>
      {cardDelegate.map((item, index) => {
          return (
            <>
              <Col xxl={6} xl={12} lg={12} md={12} sm={12} xs={24}>
                <div className="card-main">
                  <div className='flex justify-end mr-2 mt-1'>
                  <Tooltip placement="bottom" title='Agents Data' >
                      <InfoCircleFilled className='text-lg text-info-color' /> 
                      </Tooltip>
                  </div>
                  <div className="flex  p-2">
                    <div className="img-bg">
                      <img src={item.img} alt="" />
                    </div>

                    <div className="ml-5">
                      <Typography className="card-title">
                        {item.cardTitle}
                      </Typography>
                      <Typography className="card-number">
                        {item.cardNumber}
                      </Typography>
                    </div>
                  </div>
                 
                </div>
              </Col>
            </>
          );
        })}
      </Row>
      <Row gutter={[10,10]} className='mt-2'>
        <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
        <BoxWrapper >
        <GraphThree graphName={constants.REGISTER_AGENTS} />
      </BoxWrapper>
        </Col>
        <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
        <BoxWrapper >
        <GraphThree graphName={constants.REWARDS} />
      </BoxWrapper>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard