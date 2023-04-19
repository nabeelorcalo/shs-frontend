import React from 'react';
import { Avatar, Dropdown, Typography } from 'antd';
import { BoxWrapper, } from '../../components';
import { ThreeDots } from '../../assets/images';
import { useRecoilValue } from 'recoil';
import { currentUserRoleState } from '../../store';
import constants from '../../config/constants';

interface AttendanceProps {
  index?: any
  item: any
  menu?: any
  payrollCycle?: any
}

export const AttendanceCardDetail: any = (props: AttendanceProps) => {
  const { index, item, menu, payrollCycle } = props;
  const { avatar, name, profession, status, company } = item;
  const role = useRecoilValue(currentUserRoleState);

  return (
    <div className={!payrollCycle ? `shs-col-5` : `max-sm:w-full sm:w-1/2 lg:w-1/3 2xl:w-1/6  px-4 mb-8 `}>
      <BoxWrapper key={index} className="card payroll-card">
        <div className="flex flex-row justify-center relative my-2">
          <Avatar
            size={64}
            src={avatar}
          />

          <Dropdown
            overlay={menu}
            overlayStyle={{ width: 180 }}
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
        <Typography.Text className='flex justify-center text-sm font-normal'>
          {profession}
        </Typography.Text>
        {role === constants.UNIVERSITY && <Typography.Text className='flex justify-center'>
          Company: {company}
        </Typography.Text>}
        {
          payrollCycle ?
            <p className='text-center m-0 text-sm'>{payrollCycle}</p>
            :
            <div className="flex flex-row justify-around mt-6">
              <Avatar
                size={40}
                className={`${status === 'present' ? 'text-success-bg-color' : 'text-input-bg-color text-secondary-color font-semibold text-base'} align-middle`}
              >
                <span className='text-base font-semibold'>P</span>
              </Avatar>

              <Avatar
                size={40}
                className={`${status === 'absent' ? 'text-error-bg-color ' : 'text-input-bg-color text-secondary-color font-semibold text-base'} align-middle`}
              >
               <span className='text-base font-semibold'>A</span>
              </Avatar>

              <Avatar
                size={40}
                className={`${status === 'leave' ? 'text-warning-bg-color' : 'text-input-bg-color text-secondary-color font-semibold text-base'} align-middle`}
              >
                <span className='text-base font-semibold'>L</span>
              </Avatar>
            </div>
        }
      </BoxWrapper>
    </div>
  )
}