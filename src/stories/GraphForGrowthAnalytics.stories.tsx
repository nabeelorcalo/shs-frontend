import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import {GrowthAnalyticsGraph} from '../components';

export default  {
  title: 'Components/Graph/Growth Analytics',
  component: GrowthAnalyticsGraph,
} as ComponentMeta<typeof GrowthAnalyticsGraph>;

const Template: ComponentStory<typeof GrowthAnalyticsGraph> = (args) => <GrowthAnalyticsGraph {...args} />

export const Primary = Template.bind({})
