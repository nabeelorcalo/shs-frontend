import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TopPerformanceCard } from '../components';

export default {
  title: 'Components/Peformance Percantage Card',
  component: TopPerformanceCard,
} as ComponentMeta<typeof TopPerformanceCard>;

const Template: ComponentStory<typeof TopPerformanceCard> = (args) => <TopPerformanceCard {...args} />

export const Primary = Template.bind({})
Primary.args = {
  id: 1,
  name: "Maria Sanoid",
  profession: "UI UX Designer",
  percentage: "95%",
  avatar: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
}