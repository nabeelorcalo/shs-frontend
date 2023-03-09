import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import LifeAssessmentGraph  from '../components/Graph/graphForLifeAssessmentAndLifeBalance/lifeAssessment';

export default  {
  title: 'Components/Graph/LifeAssessment',
  component: LifeAssessmentGraph,
} as ComponentMeta<typeof LifeAssessmentGraph>;

const Template: ComponentStory<typeof LifeAssessmentGraph> = (args) => <LifeAssessmentGraph {...args} />

export const Primary = Template.bind({})
Primary.args = { 
  monthName: 'Jan',
}
