import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { EvaluationStatsCard } from '../components';

export default {
  title: 'Components/Evaluation Stats Card',
  component: EvaluationStatsCard,
} as ComponentMeta<typeof EvaluationStatsCard>;

const Template: ComponentStory<typeof EvaluationStatsCard> = (args) => <EvaluationStatsCard {...args} />

export const Primary = Template.bind({})
Primary.args = { 
  name: 'Learning Objectives',
  percentage: 74,
  color: '#6AAD8E',
}
