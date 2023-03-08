import React, { useState, useEffect } from 'react';
import data from './data';
import { Finance, Relationship, Health, Education, Development, Family, Social, Recreation } from '../../../assets/images';
import constants from '../../../config/constants';
import { Col, Row, Slider } from 'antd';


const Graph = ({monthName}: any) => {
  const assessmentsName = ["Finance", "Relationships", "Health", "Education", "Development", "Family", "Social Life", "Recreation"];
  const filteredArray = data.filter(obj => obj.month === monthName);

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
        <div className="flex items-center">
          <div className='flex-none w-[120px]'>
            {item}
          </div>

          <div className='flex-none w-20'>
            {renderIcon(item)}
          </div>

          <div className='flex-initial w-full'>
            <Slider
              disabled
              min={1}
              max={5}
              defaultValue={filteredArray[index].value}
              tooltip={{
                open: true,
                formatter: (value: any) => `0${value}`,
              }}
              trackStyle={{ background: 'transparent' }}
              className="life-assessment-slider"
            />
          </div>
        </div>
      ))}
      <div className="flex items-center">
        <div className='flex-none w-[120px]'></div>
        <div className='flex-none w-20'></div>
        <div className='flex-initial w-[345px] text-sm txtColor'>
          1
        </div>
        <div className='flex-initial w-[343px] text-sm txtColor'>
          2
        </div>
        <div className='flex-initial w-[345px] text-sm txtColor'>
          3
        </div>
        <div className='flex-initial w-[345px] text-sm txtColor'>
          4
        </div>
        <div className='flex-initial w-2 text-sm txtColor'>
          5
        </div>
      </div>
    </>
  )
};

export default Graph;