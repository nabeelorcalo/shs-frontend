import React, { useState, useEffect } from 'react';
import { Slider } from 'antd';
import data from './data';
import constants from '../../../config/constants';
import { Finance, Relationship, Health, Education, Development, Family, Social, Recreation } from '../../../assets/images';


export const LifeAssessmentGraph = ({monthName}: any) => {
  const assessmentsName = ["Finance", "Relationship", "Health", "Education", "Development", "Family", "Social Life", "Recreation"];
  const filteredArray = data.filter(obj => obj.month === monthName);

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Finance':
        return <Finance />;
      case 'Relationship':
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

  const sliderMoved = (data: any, sliderValue: any) => {
    // it won't show changes in Life Balance graph.
    // But when we implement recoil then
    // we'll update the store data value
    data.value = sliderValue;
  }

  return (
    <>
      {assessmentsName.map((item, index) => (
        <div className="flex max-sm:flex-col items-center lifeAssesment_main max-sm:gap-6 gap-0">
          <div className="main-head flex">
          <div className='flex-none w-[120px]'>
            {item}
          </div>

          <div className='flex-none w-20'>
            {renderIcon(item)}
          </div>
          </div>
          <div className='flex-initial w-full'>
            <Slider
              min={1}
              max={5}
              tooltip={{
                open: true,
                formatter: (value: any) => `0${value}`,
              }}
              onAfterChange = {(val) => sliderMoved(filteredArray[index], val)}
              defaultValue={filteredArray[index].value}
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