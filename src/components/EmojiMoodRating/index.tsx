import React, { useState } from 'react';
import { Rate } from 'antd';
import { BoxWrapper } from '../BoxWrapper/BoxWrapper';
import './style.scss';
import { Terrible, Sad, Neutral, Happy, Awesome } from '../../assets/images';

const EmojiMoodRating = ({ title, data }: any) => {
  console.log(data)
  return (
    <BoxWrapper>
      <div className="flex flex-col gap-2 w-full h-full">
        <h3>{title}</h3>
        <div>
          <div className="flex flex-row justify-start xl:justify-center">
            {
              data.map((item: any, idx: any) => {
                return (
                  <div className='text-[#363565]'>
                    <div key={idx} className='flex flex-col gap-2 items-center' onClick={() => console.log(item.name)}>
                      {<item.comp className='svgIcon' />}
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