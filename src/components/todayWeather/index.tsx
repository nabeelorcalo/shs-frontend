import React from 'react';
import { Card, Typography } from 'antd';
import { SunIcon } from '../../assets/images';
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
      <Typography.Title level={4} className="text-white">Today's Weather</Typography.Title>
      <div className='flex flex-row items-center'>
        <SunIcon />
        <p className='ml-6 my-[20px] text-[36px]'>23° C</p>
      </div>
      <p>Card content</p>
    </Card>
  );
}

export default TodayWeather