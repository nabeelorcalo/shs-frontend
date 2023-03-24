import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import {RegisterAgentsAndRewardGraph}  from '../components';

export default {
  title: 'Components/Graph/RegisterAgentAndReward',
  component: RegisterAgentsAndRewardGraph,
} as ComponentMeta<typeof RegisterAgentsAndRewardGraph>;

const Template: ComponentStory<typeof RegisterAgentsAndRewardGraph> = (args) => <RegisterAgentsAndRewardGraph {...args} />

export const RegisterAgents = Template.bind({})
RegisterAgents.args = { 
  graphName: 'registerAgents',
}

export const Rewards = Template.bind({})
Rewards.args = {
  graphName: 'rewards', 
}
