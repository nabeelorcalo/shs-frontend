import React, { useState, useEffect } from 'react';
import { registerMemeberData, resolutionFeedbackData } from './data';
import { Finance, Relationship, Health, Education, Development, Family, Social, Recreation } from '../../../assets/images';
import constants from '../../../config/constants';
import { Col, Row, Slider } from 'antd';


const Graph = () => {
  const assessmentsName = ["Finance", "Relationships", "Health", "Education", "Development", "Family", "Social Life", "Recreation"];

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Finance':
        return <Finance />;
      case 'Relationships':
        return <Relationship />;
      case 'Health':
        return <Health />;
      case 'Education':
        return <Education />;
      case 'Development':
        return <Development />;
      case 'Family':
        return <Family />;
      case 'Social Life':
        return <Social />;
      case 'Recreation':
        return <Recreation />;
      default:
        return <></>;
    }
  }

  return (
    <>
      {assessmentsName.map((item, index) => (
        <>
          <Row className='flex flex-row items-center' >
            <Col xs={6} sm={6} md={2} lg={2} xl={2}>
              <div className=''>
                <p>{item}</p>
              </div>
            </Col>
            <Col xs={2} sm={2} md={1} lg={1} xl={1}>
              <div className=''>
                {renderIcon(item)}
              </div>
            </Col>
            <Col xs={4} sm={4} md={8} lg={8} xl={8}>
              <Slider
                disabled
                min={1}
                max={5}
                defaultValue={index > 4 ? 5 : index + 1}
                tooltip={{
                  open: true,
                  formatter: (value: any) => `0${value}`,
                }}
                trackStyle={{ background: 'transparent' }}
                className="life-assessment-slider"
              />
            </Col>
          </Row>

          {index === 7 &&
            <Row className='flex flex-row items-center' >
              <Col className="gutter-row" span={2} />
              <Col className="gutter-row" span={1} />
              <Col className="gutter-row text-xs txtColor" span={2}>
                1
              </Col>
              <Col className="gutter-row text-xs txtColor" span={2}>
                2
              </Col>
              <Col className="gutter-row text-xs txtColor" span={2}>
                3
              </Col>
              <Col className="gutter-row text-xs txtColor" span={2}>
                4
              </Col>
              <Col className="gutter-row text-xs txtColor" span={2}>
                5
              </Col>
            </Row>
          }
        </>
      ))}
    </>
  )
};

export default Graph;