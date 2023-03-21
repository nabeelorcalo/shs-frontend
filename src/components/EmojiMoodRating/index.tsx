import React, { useState } from 'react';
import { Rate, Typography } from 'antd';
import { BoxWrapper } from '../BoxWrapper/BoxWrapper';
import './style.scss';

interface EmojiProps {
  title: string,
  data: any,
  size?: any,
  activeIconIndex?: number,
  onClick?: any,
}

const EmojiMoodRating = (props: EmojiProps) => {
  const { title, data, size = 3, activeIconIndex = -1, onClick } = props;

  return (
    <BoxWrapper className='my-2'>
      <div className="flex flex-col gap-2 w-full h-full emoji-mood-container">
        <Typography.Title className='emoji-heading' level={size}>
          {title}
        </Typography.Title>
        <div>
          <div className="flex flex-row justify-around py-[20px] emoji-wrapper">
            {
              data.map((item: any, idx: any) => {
                return (
                  <div className='emoji-container text-[#363565]'>
                    <div
                      key={idx}
                      className={`flex flex-col items-center ${idx}`}
                      onClick={onClick}
                    >
                      {
                        activeIconIndex === idx + 1 || activeIconIndex === -1 ?
                          <item.comp className='svgIcon' />
                          :
                          <item.colorLessComp className='svgIcon' />
                      }
                      <p className='name-font-size'>{item.name}</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </BoxWrapper>
  )
}

export default EmojiMoodRating