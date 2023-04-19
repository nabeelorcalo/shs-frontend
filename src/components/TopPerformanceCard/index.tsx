import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Typography, Divider } from 'antd';
import { ClockInImg, LateComingIcon } from '../../assets/images';
import './style.scss';

interface TopPerformanceProps {
  avatar: string,
  size?: any,
  name: string,
  nameClassName: string,
  icon?: string,
  className?: string,
  profession?: string,
  percentage?: string
  btnTxt?: string,
  url?: string,
  isLate?: boolean,
  checkInTime: string,
}

export const TopPerformanceCard: any = (props: TopPerformanceProps) => {
  const {
    avatar,
    name,
    nameClassName,
    size = 32,
    profession,
    percentage,
    className,
    url = '',
    icon,
    btnTxt,
    checkInTime,
    isLate = false,
  } = props;

  const renderIcon = (isLate: boolean) => {
    switch (isLate) {
      case true:
        return <LateComingIcon />;
      case false:
        return <ClockInImg />;
      default:
        return <></>;
    }
  }

  return (
    <div className='flex flex-col top-performance-card-container'>
      <div className='flex flex-row items-center gap-4'>
        <Avatar
          size={size}
          alt="avatar"
          src={<img src={avatar} />}
        />

        <div className='flex flex-col'>
          <p className={nameClassName}>
            {name}
          </p>

          <p className='text-sm'>
            {profession}
          </p>
        </div>

        {
          percentage &&
          <Typography.Title
            level={3}
            className='ml-auto performance-percentage-txt'
          >
            {percentage}
          </Typography.Title>
        }

        {
          btnTxt &&
          <Link
            to={url}
            className={className}
          >
            {icon}
            {btnTxt}
          </Link>
        }

        {
          checkInTime &&
          <div className='flex flex-row items-center gap-2 ml-auto'>
            {renderIcon(isLate)}
            <p className='text-sm'>
              {checkInTime}
            </p>
          </div>
        }
      </div>

      {
        (percentage || checkInTime) && <Divider />
      }
    </div>
  )
}