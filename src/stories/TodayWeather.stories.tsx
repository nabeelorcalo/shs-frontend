import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TodayWeather  from '../components/todayWeather';

export default {
  title: 'Components/TodayWeather',
  component: TodayWeather,
} as ComponentMeta<typeof TodayWeather>;

const Template: ComponentStory<typeof TodayWeather> = (args) => <TodayWeather {...args} />

export const Primary = Template.bind({});
Primary.args = { 
}