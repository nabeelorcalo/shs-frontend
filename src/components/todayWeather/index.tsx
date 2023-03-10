import React from 'react';
import { Card } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

interface CheckboxProps {
  label: string
  disabled?: boolean,
  style?: any,
  onChange?: () => void,
}

const TodayWeather: any = (props: CheckboxProps) => {
  return (
    <Card style={{ width: 300 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  );
}

export default TodayWeather