import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { LeaveDetails } from '../components';

export default {
  title: 'Components/Leave Details',
  component: LeaveDetails,
} as ComponentMeta<typeof LeaveDetails>;

const Template: ComponentStory<typeof LeaveDetails> = (args) => <LeaveDetails {...args} />

export const Primary = Template.bind({})
Primary.args = { 
  sickLeaves: '02',
  casualLeaves: '03',
  medicalLeaves: '04',
  workFromHome: '01'
}