import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Typography } from 'antd';
import { BoxWrapper } from '../BoxWrapper/BoxWrapper';
import { EmailImg, LocationImg, PhoneIcon } from '../../assets/images';
import { ROUTES_CONSTANTS } from '../../config/constants';

interface ProfileProps {
  avatar: string
  size?: number
  name: string
  profession: string
  email: string
  phone: string
  address: string
  className?: string
}

export const ProfileCard: any = (props: ProfileProps) => {
  const {avatar, size=64, name, profession, email, phone, address, className=''} = props;

  return (
    <BoxWrapper className={`flex flex-col w-full ${className}`} >
      <Avatar
        size={size}
        className="m-auto"
        src={avatar}
      />

      <Typography.Title
        className="name"
        level={3}
      >
        {name}
      </Typography.Title>

      <Typography.Text
        className="m-auto"
      >
        {profession}
      </Typography.Text>

      <div className="user-detail">
        <div className="flex flex-row gap-4">
          <EmailImg />
          <p className="text-sm">
            {email}
          </p>
        </div>

        <div className="flex flex-row gap-4">
          <PhoneIcon />
          <p className="text-sm">
            {phone}
          </p>
        </div>

        <div className="flex flex-row gap-4">
          <LocationImg />
          <p className="text-sm">
            {address}
          </p>
        </div>
      </div>

      <Link
        to={`/${ROUTES_CONSTANTS.ATTENDANCE}`}
        className="profile-btn"
      >
        View Profile
      </Link>
    </BoxWrapper>
  )
}