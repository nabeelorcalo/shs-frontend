import React from 'react';
import { Card, Typography } from 'antd';
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
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  );
}

export default TodayWeather