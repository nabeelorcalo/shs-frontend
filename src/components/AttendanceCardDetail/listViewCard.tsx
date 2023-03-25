import React from 'react';
import { Avatar, Dropdown, Typography } from 'antd';
import { BoxWrapper, } from '../BoxWrapper/BoxWrapper';
import { ThreeDots } from '../../assets/images';

interface AttendanceProps {
  index?: any
  item: any
  menu?: any
}

export const AttendanceListViewCard: any = (props: AttendanceProps) => {
  const { index, item, menu } = props;
  const { avatar, name, profession, status } = item;

  return (
    <BoxWrapper key={index} className="flex flex-row items-center">
      <div className="flex items-center gap-4 w-[30%]">
        <Avatar
          size={48}
          src={avatar}
        />
        <Typography.Title level={4}>
          {name}
        </Typography.Title>
      </div>

      <div className="w-[30%]">
        <p className="">
          {profession}
        </p>
      </div>

      <div className="flex gap-10 w-[30%]">
        <Avatar
          size={40}
          className={`${status === 'present' ? 'text-success-bg-color' : 'text-input-bg-color'} align-middle`}
        >
          P
        </Avatar>

        <Avatar
          size={40}
          className={`${status === 'absent' ? 'text-error-bg-color ' : 'text-input-bg-color'} align-middle`}
        >
          A
        </Avatar>

        <Avatar
          size={40}
          className={`${status === 'leave' ? 'text-warning-bg-color' : 'text-input-bg-color'} align-middle`}
        >
          L
        </Avatar>
      </div>

      <div className="flex justify-center w-[10%]">
        <Dropdown
          overlay={menu}
          trigger={['click']}
          placement="bottomRight"
          className="attendance-menu"
        >
          <ThreeDots className="cursor-pointer" />
        </Dropdown>
      </div>
    </BoxWrapper>
  )
}