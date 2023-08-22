import { Typography } from 'antd';
import { BoxWrapper, Loader } from '../../components';
import { AvgHoursIcon, ClockInIcon, ClockOutIcon } from '../../assets/images';
import './style.scss';
import { FC } from 'react';

interface AttendanceProps {
  label: string,
  time: string,
  colorClass: string,
  isLoading?: boolean
}

export const AttendanceDetail: FC<AttendanceProps> = (props) => {
  const { label, time, colorClass, isLoading } = props;

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Avg Clock In':
        return <ClockInIcon className='ml-auto' />;
      case 'Avg Clock Out':
        return <ClockOutIcon className='ml-auto' />;
      case 'Avg Hours':
        return <AvgHoursIcon className='ml-auto' />;
      default:
        return <></>;
    }
  }

  return (
    <BoxWrapper className='flex flex-col attendance-card min-w-[232px] min-h-[182px] wrapper-shadow'>
      {
        isLoading ? <Loader /> :
          <>
            {renderIcon(label)}
            <p className='mt-10 light-grey-color'>
              {label}
            </p>
            <Typography.Title level={3} className={colorClass}>
              {time}
            </Typography.Title>
          </>
      }
    </BoxWrapper>
  )
}