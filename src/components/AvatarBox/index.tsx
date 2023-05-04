import React from 'react';
import { Avatar } from 'antd';

interface AvatarBoxProps {
  label?: string,
  name: string,
  avatar?: string,
  size?: number,
}

export const AvatarBox: any = (props: AvatarBoxProps) => {
  const { label, name, avatar, size = 24 } = props;

  return (
    <div className='flex flex-col gap-2'>
      {
        label &&
        <p className='avatar-label'>
          {label}
        </p>
      }

      <div className='avatar-box'>
        <Avatar
          size={size}
          src={avatar}
        />

        <p className='px-2 text-primary-color'>
          {name}
        </p>
      </div>
    </div>
  )
}