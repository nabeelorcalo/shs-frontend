import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import {RegisterMemberAndFeddbackGraph}  from '../components';

export default {
  title: 'Components/Graph/RegisteredMembersAndFeedback',
  component: RegisterMemberAndFeddbackGraph,
} as ComponentMeta<typeof RegisterMemberAndFeddbackGraph>;

const Template: ComponentStory<typeof RegisterMemberAndFeddbackGraph> = (args) => <RegisterMemberAndFeddbackGraph {...args} />

export const Primary = Template.bind({})
Primary.args = { 
  graphName: 'registerMember',
}

export const Feedback = Template.bind({})
Feedback.args = {
  graphName: 'feedback', 
}
