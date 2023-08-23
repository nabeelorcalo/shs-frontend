import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Button, Typography } from 'antd';
import { BoxWrapper } from '../../components';
import { EmailImg, LocationImg, PhoneIcon } from '../../assets/images';
import { ROUTES_CONSTANTS } from '../../config/constants';
import './style.scss';
import useCustomHook from "../../pages/interns/actionHandler";
interface ProfileProps {
  avatar: string
  size?: number
  name: string
  profession: string
  email: string
  phone: string
  address: string
  className?: string
  internId: number
  internData: any
  userId: number
}

export const ProfileCard: any = (props: ProfileProps) => {
  const {avatar, size=64, name, profession, email, phone, address, internId, internData, userId, className=''} = props;
  const navigate = useNavigate()
  const { getProfile }: any = useCustomHook()

const handleProfile = async () => {
  if(userId) await getProfile(userId);
}

  return (
    <BoxWrapper className={`flex flex-col w-full profile-card ${className}`} >
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
        <div className="flex flex-row items-center gap-4">
          <EmailImg />
          <p className="text-sm">
            {email}
          </p>
        </div>

        <div className="flex flex-row items-center gap-4">
          <PhoneIcon />
          <p className="text-sm">
            {phone}
          </p>
        </div>

        <div className="flex flex-row items-center gap-4">
          <LocationImg />
          <p className="text-sm">
            {address}
          </p>
        </div>
      </div>

      {/* STORYBOOK IS CRASHING ON BELOW CODE */}
      {/* BUT WORKING FINE IN THE REUSABLE COMPONENT */}

      <Button
        onClick={handleProfile}
        className="profile-btn font-medium"
      >
        View Profile
      </Button>
    </BoxWrapper>
  )
}
