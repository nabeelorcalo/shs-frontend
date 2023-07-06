import React from 'react';
import { Avatar, Typography } from 'antd';
import { BoxWrapper } from '../../components';
import './style.scss';

interface EvaluationProps {
  avatar: string
  avatarPlaceholder?: string
  name: string,
  profession: string,
  className?: any,
}

export const EvaluationCard: any = (props: EvaluationProps) => {
  const { avatar, avatarPlaceholder, name, profession, className } = props;
  return (
    <BoxWrapper className='evaluation-person-card mt-4'>
      <div className='flex items-center gap-4'>

        <Avatar size={64} src={avatar} alt={name}>
          {avatarPlaceholder}
        </Avatar>

        <div className='evaluation-person-content flex flex-col gap-0'>
          <p className='evaluation-person-name text-primary-color font-medium text-2xl'>
            {name}
          </p>

          <p className='font-medium text-secondary-color'>
            {profession}
          </p>
        </div>
        
      </div>
    </BoxWrapper>
  )
}