import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import RegisteredMembersAndFeedback  from '../components/Graph/graphForRegisteredMembersAndFeedback';

export default {
  title: 'Components/Graph/RegisteredMembersAndFeedback',
  component: RegisteredMembersAndFeedback,
} as ComponentMeta<typeof RegisteredMembersAndFeedback>;

const Template: ComponentStory<typeof RegisteredMembersAndFeedback> = (args) => <RegisteredMembersAndFeedback {...args} />

export const Primary = Template.bind({})
Primary.args = { 
  graphName: 'registerMember',
}

export const Feedback = Template.bind({})
Feedback.args = {
  graphName: 'feedback', 
}
