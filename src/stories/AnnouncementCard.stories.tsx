import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import AnnouncementCard from '../components/AnnouncementCard';

export default {
  title: 'Components/AnnouncementCard',
  component: AnnouncementCard,
} as ComponentMeta<typeof AnnouncementCard>;

const Template: ComponentStory<typeof AnnouncementCard> = (args) => <AnnouncementCard {...args} />

export const Primary = Template.bind({})
Primary.args = { 
  text: 'We are excited to announce that, due to our remarkable growth over the last 2 of years, we are expanding!',
  avatar: 'https://cdn-icons-png.flaticon.com/512/219/219977.png',
  author: 'Amelia Clark',
  dateTime: '2023-03-09T10:00:00',
}
