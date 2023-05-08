import React from 'react';
import { Avatar, Typography } from 'antd';
import { BoxWrapper } from '../../components';
import './style.scss';

interface EvaluationProps {
  avatar: string
  name: string,
  profession: string,
  className?: any,
}

export const EvaluationCard: any = (props: EvaluationProps) => {
  const { avatar, name, profession, className } = props;

  return (
    <BoxWrapper className='mt-4'>
      <div className='flex items-center gap-4'>

        <Avatar
          size={64}
          alt="avatar"
          src={<img src={avatar} />}
        />

        <div className='flex flex-col gap-0'>
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