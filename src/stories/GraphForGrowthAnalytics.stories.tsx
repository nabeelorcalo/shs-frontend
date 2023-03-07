import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import GrowthAnalyticGraph  from '../components/Graph/graphForGrowthAnalytics';

export default  {
  title: 'Components/Graph/GrowthAnalytics',
  component: GrowthAnalyticGraph,
} as ComponentMeta<typeof GrowthAnalyticGraph>;

const Template: ComponentStory<typeof GrowthAnalyticGraph> = (args) => <GrowthAnalyticGraph {...args} />

export const Primary = Template.bind({})
