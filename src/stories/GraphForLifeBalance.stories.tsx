import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { LifeBalanceGraph } from '../components';

export default {
  title: 'Components/Graph/Life Balance',
  component: LifeBalanceGraph,
} as ComponentMeta<typeof LifeBalanceGraph>;

const Template: ComponentStory<typeof LifeBalanceGraph> = (args) => <LifeBalanceGraph {...args} />

export const Primary = Template.bind({})
Primary.args = {
  monthName: 'Jan',
}
