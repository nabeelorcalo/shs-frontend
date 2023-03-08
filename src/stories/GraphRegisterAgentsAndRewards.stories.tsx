import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import RegisterAgentAndRewardGraph  from '../components/Graph/graphForRegisterAgentsAndRewards';

export default {
  title: 'Components/Graph/RegisterAgentAndReward',
  component: RegisterAgentAndRewardGraph,
} as ComponentMeta<typeof RegisterAgentAndRewardGraph>;

const Template: ComponentStory<typeof RegisterAgentAndRewardGraph> = (args) => <RegisterAgentAndRewardGraph {...args} />

export const RegisterAgents = Template.bind({})
RegisterAgents.args = { 
  graphName: 'registerAgents',
}

export const Rewards = Template.bind({})
Rewards.args = {
  graphName: 'rewards', 
}
