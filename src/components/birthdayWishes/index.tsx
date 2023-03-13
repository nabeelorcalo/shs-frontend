import React from 'react';
import { Carousel, Avatar, Image } from 'antd';
import { Button } from '../Button';
import { BoxWrapper } from '../BoxWrapper/BoxWrapper';
import './style.scss';

interface BirthdayProps {
  wishList: any,
  onClick?: () => void,
}

export const BirthdayWishes = (props: BirthdayProps) => {
  const { wishList } = props;

  const onWishClick = (id: number) => {
    alert(id);
  }

  return (
    <BoxWrapper className='birthday-wishes my-4'>
      <Carousel autoplay>
        {
          wishList.map((item: any) => (
            <div className='flex flex-col a-wish'>
              <div className='flex flex-row'>
                <Avatar
                  size={48}
                  alt="avatar"
                  src={<img src={item.avatar} />}
                />

                <div className='flex flex-col px-4'>
                  <p className='text-primary-color'>
                    {item.name}
                  </p>
                  <p className='font-normal text-sm text-secondary-color'>
                    Has birthday today.
                  </p>
                  <p className='font-normal text-sm light-grey-color'>
                    {item.date}
                  </p>
                </div>

                <Image
                  alt="birthday"
                  width={108}
                  height={108}
                  preview={false}
                  src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/6b3fe963030867.5aa3707f0c627.gif"
                />
              </div>

              <div className='flex flex-row mt-4'>
                <Button
                  label="Wish Now"
                  type="primary"
                  block={true}
                  className='wish-now-btn page-header-secondary-bg-color'
                  onClick={() => onWishClick(item.id)}
                />
              </div>
            </div>
          ))
        }
      </Carousel>
    </BoxWrapper>
  )
}