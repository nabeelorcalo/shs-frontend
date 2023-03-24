import React from 'react';
import { Avatar, Dropdown, Typography } from 'antd';
import { BoxWrapper, } from '../BoxWrapper/BoxWrapper';
import { ThreeDots } from '../../assets/images';

interface AttendanceProps {
  index?: any
  item: any
  menu?: any
}

export const AttendanceCardDetail: any = (props: AttendanceProps) => {
  const {index, item, menu} = props;
  const {avatar, name, profession, status} = item;

  return (
    <BoxWrapper key={index} className="shs-col-5">
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

      <div className="flex flex-row justify-around mt-6">
        <Avatar
          size={40}
          style={{
            backgroundColor: status === "present" ? '#3DC575' : '#E6F4F9',
            verticalAlign: 'middle'
          }}
        >
          P
        </Avatar>

        <Avatar
          size={40}
          style={{
            backgroundColor: status === "absent" ? '#D83A52' : '#E6F4F9',
            verticalAlign: 'middle'
          }}
        >
          A
        </Avatar>

        <Avatar
          size={40}
          style={{
            backgroundColor: status === "leave" ? '#FFC15D' : '#E6F4F9',
            verticalAlign: 'middle'
          }}
        >
          L
        </Avatar>
      </div>
    </BoxWrapper>
  )
}