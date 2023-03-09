import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import LifebalanceGraph  from '../components/Graph/graphForLifeAssessmentAndLifeBalance/lifeBalance';

export default  {
  title: 'Components/Graph/LifeBalance',
  component: LifebalanceGraph,
} as ComponentMeta<typeof LifebalanceGraph>;

const Template: ComponentStory<typeof LifebalanceGraph> = (args) => <LifebalanceGraph {...args} />

export const Primary = Template.bind({})
Primary.args = { 
  monthName: 'Jan',
}
