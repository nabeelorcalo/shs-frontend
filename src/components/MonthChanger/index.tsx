import React from 'react';
import { IconButton } from '../IconButton';
import { ArrowToLeft, ArrowToRight1 } from '../../assets/images';

interface MonthChangerProps {
  month: string,
  onClick?: () => void
}

export const MonthChanger: any = (props: MonthChangerProps) => {
  const {month, onClick} = props;

  return (
    <div className='flex items-center'>
      <p className='mx-2'>{month}</p>
      <IconButton
        name="prev"
        className="icon-btn left-radius"
        icon={<ArrowToLeft />}
        onClick={onClick}
      />

      <IconButton
        name="next"
        className="icon-btn right-radius"
        icon={<ArrowToRight1 />}
        onClick={onClick}
      />
    </div>
  )
}