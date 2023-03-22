import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Graph  from '../components/Graph/graphForLifeAssessmentAndLifeBalance/lifeBalance';

export default  {
  title: 'Components/Graph/LifeBalance',
  component: Graph,
} as ComponentMeta<typeof Graph>;

const Template: ComponentStory<typeof Graph> = (args) => <Graph {...args} />

export const Primary = Template.bind({})
Primary.args = { 
  monthName: 'Jan',
}
