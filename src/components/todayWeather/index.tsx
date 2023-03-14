import React from 'react';
import { Card, Typography } from 'antd';
import { SunIcon, LocationIcon } from '../../assets/images';
import './style.scss';

export const TodayWeather: any = () => {
  return (
    <Card className='w-full my-2 today-weather-container'>
      <Typography.Title level={4} className="text-white">
        Today's Weather
      </Typography.Title>

      <div className='flex flex-row items-center'>
        <SunIcon />
        <p className='ml-4 xl:ml-4 my-[16px] text-[22px] xl:text-[36px]'>
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