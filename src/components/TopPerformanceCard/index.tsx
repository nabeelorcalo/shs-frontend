import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Typography, Divider } from 'antd';
import { ClockInImg, LateComingIcon } from '../../assets/images';
import './style.scss';
import { ButtonThemePrimary } from '../ButtonThemePrimary';

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
  url?: any,
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
  const navigate = useNavigate();
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
        <Avatar size={size} src={avatar}>
          {name?.charAt(0)}
        </Avatar>

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
          <ButtonThemePrimary
            onClick={() => navigate(url)}
            className={className}
          >
            {icon}
            {btnTxt}
          </ButtonThemePrimary>
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