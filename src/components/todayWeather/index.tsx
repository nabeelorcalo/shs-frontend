import React from 'react';
import { Card, Typography } from 'antd';
import { SunIcon, LocationIcon } from '../../assets/images';
import './style.scss';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

interface CheckboxProps {
  label: string
  disabled?: boolean,
  style?: any,
  onChange?: () => void,
}

const TodayWeather: any = (props: CheckboxProps) => {
  return (
    <Card className='w-full today-weather-container'>
      <Typography.Title level={4} className="text-white">
        Today's Weather
      </Typography.Title>

      <div className='flex flex-row items-center'>
        <SunIcon />
        <p className='ml-4 xl:ml-4 my-[20px] text-[36px] lg:text-[22px]'>
          23° C
        </p>
      </div>

      <Typography.Title level={4} className="todayDateTxt">
        Monday, 21 September
      </Typography.Title>

      <p className='flex'>
        <LocationIcon className='mr-2'/>
        London
      </p>
    </Card>
  );
}

export default TodayWeather