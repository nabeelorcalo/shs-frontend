import React from 'react';
import { Avatar, Button, Dropdown, Typography } from 'antd';
import { BoxWrapper, } from '../../components';
import { ThreeDots } from '../../assets/images';
import { useRecoilValue } from 'recoil';
import { currentUserRoleState } from '../../store';
import constants from '../../config/constants';
import { useNavigate } from 'react-router-dom';

interface AttendanceProps {
  height?: any
  index?: any
  item: any
  menu?: any
  payrollCycle?: any
}

export const AttendanceCardDetail: any = (props: AttendanceProps) => {
  const { index, item, menu, payrollCycle, height } = props;
  const { avatar, name, profession, status, companyDetails, id } = item;
  const role = useRecoilValue(currentUserRoleState);
  const navigate = useNavigate();
  return (
    <div className={!payrollCycle ? `shs-col-5` : `max-sm:w-full sm:w-1/2 lg:w-1/3 2xl:w-1/6  px-4 mb-8`}>
      <BoxWrapper key={index} className={`card payroll-card ${height}`}>
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
        {/* <Typography.Title level={3} className='flex justify-center text-primary-title-color'>
          {name}
        </Typography.Title> */}
        <h3 className='text-2xl text-primary-title-color font-medium flex justify-center'>{name}</h3>
        <Typography.Text className='flex justify-center text-sm font-normal text-center'>
          {profession}
        </Typography.Text>
        {role === constants.UNIVERSITY && <Typography.Text className='flex justify-center'>
          <p className='text-sm'>Company: <span className='font-medium'>{companyDetails?.businessName}</span></p>
        </Typography.Text>}
        {
          payrollCycle ?
            <p className='text-center m-0 text-sm'>{payrollCycle}</p>
            :
            <div className="flex flex-row justify-around mt-6">
              <Button
                // size={40}
                shape="circle"
                disabled={status === 'present' ? false : true}
                className={`${status === 'present' ? 'text-success-bg-color' : 'text-input-bg-color text-white font-semibold text-base'} align-middle`}
              >
                <span className={`text-base font-semibold ${status === 'present' ? 'text-white' : ''}`}>P</span>
              </Button>

              <Button
                // size={40}
                shape="circle"
                disabled={status === 'absent' ? false : true}
                className={`${status === 'absent' ? 'text-error-bg-color ' : 'text-input-bg-color text-white font-semibold text-base'} align-middle`}
              >
                <span className={`text-base font-semibold ${status === 'absent' ? 'text-white' : ''}`}>A</span>
              </Button>

              <Button
                // size={40}
                shape="circle"
                disabled={status === 'leave' ? false : true}
                className={`${status === 'leave' ? 'text-warning-bg-color' : 'text-input-bg-color text-secondary-color font-semibold text-base'} align-middle`}
              >
                <span className={`text-base font-semibold ${status === 'leave' ? 'text-white' : ''}`}>L</span>
              </Button>
            </div>
        }
      </BoxWrapper>
    </div>
  )
}
