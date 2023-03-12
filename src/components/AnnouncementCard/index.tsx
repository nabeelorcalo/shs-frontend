import React from 'react';
import { Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

interface AnnouncementProps {
  text: string,
  author: string,
  avatar: string,
  dateTime: string,
  style?: any,
}

dayjs.extend(relativeTime);

const AnnouncementCard: any = (props: AnnouncementProps) => {
  const { text, author, avatar, dateTime } = props;

  return (
    <Card className='flex flex-col mb-4 rounded-2xl light-sky-blue-bg'>
      <p className='text-sm text-secondary-color '>
        {text}
      </p>

      <div className='flex flex-row items-center mt-4 gap-2'>
        <Avatar
          size={32}
          src={<img src={avatar} alt="avatar" />}
        />

        <p className='light-grey-color text-[14px]'>
          {author}
        </p>

        <p className='ml-auto light-grey-color text-[14px]'>
          {dayjs(dateTime).fromNow()}
        </p>
      </div>
    </Card>
  )
}

export default AnnouncementCard;