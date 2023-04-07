import React from 'react';
import { Avatar, Dropdown, Typography } from 'antd';
import { BoxWrapper, } from '../BoxWrapper/BoxWrapper';
import { ThreeDots } from '../../assets/images';

interface AttendanceProps {
  index?: any
  item: any
  menu?: any
  payrollCycle?: any
}

export const AttendanceCardDetail: any = (props: AttendanceProps) => {
  const { index, item, menu, payrollCycle } = props;
  const { avatar, name, profession, status } = item;

  return (
    <div className={!payrollCycle?`shs-col-5`:`max-sm:w-full sm:w-1/2 lg:w-1/3 2xl:w-1/6  px-4 mb-8 `}>
      <BoxWrapper key={index} className="card payroll-card">
        <div className="flex flex-row justify-center relative my-2">
          <Avatar
            size={64}
            src={avatar}
          />

          <Dropdown
            overlay={menu}
            trigger={['click']}
            placement="bottomRight"
            className="attendance-menu"
          >
            <ThreeDots className="absolute right-0 cursor-pointer" />
          </Dropdown>
        </div>

        <Typography.Title level={3} className='flex justify-center'>
          {name}
        </Typography.Title>

        <Typography.Text className='flex justify-center'>
          {profession}
        </Typography.Text>
        {
          payrollCycle ?
              <p className='text-center m-0 text-sm'>{payrollCycle}</p>
            :
            <div className="flex flex-row justify-around mt-6">
              <Avatar
                size={40}
                className={`${status === 'present' ? 'text-success-bg-color' : 'text-input-bg-color text-secondary-color font-semibold text-base'} align-middle`}
              >
                P
              </Avatar>

              <Avatar
                size={40}
                className={`${status === 'absent' ? 'text-error-bg-color ' : 'text-input-bg-color text-secondary-color font-semibold text-base'} align-middle`}
              >
                A
              </Avatar>

              <Avatar
                size={40}
                className={`${status === 'leave' ? 'text-warning-bg-color' : 'text-input-bg-color text-secondary-color font-semibold text-base'} align-middle`}
              >
                L
              </Avatar>
            </div>
        }
      </BoxWrapper>
    </div>
  )
}