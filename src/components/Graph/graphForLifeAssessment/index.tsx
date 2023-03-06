import React, { useState, useEffect } from 'react';
import { registerMemeberData, resolutionFeedbackData } from './data';
import { FinanceIcon } from '../../../assets/images';
import constants from '../../../config/constants';
import { Col, Divider, Row } from 'antd';

const Graph = () => {
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col className="gutter-row bg-red-100" span={2}>
        <div className='py-2'>
          <p>Finance</p>
        </div>
      </Col>
      <Col className="gutter-row bg-amber-500" span={2}>
        <div className='py-2'>
          <FinanceIcon />
        </div>
      </Col>
      <Col className="gutter-row bg-green-400" span={8}>
        <div className='py-2'>col-6</div>
      </Col>
    </Row>
  )
};

export default Graph;