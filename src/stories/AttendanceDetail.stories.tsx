import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AttendanceDetail } from '../components';

export default {
  title: 'Components/Attendance Detail',
  component: AttendanceDetail,
} as ComponentMeta<typeof AttendanceDetail>;

const Template: ComponentStory<typeof AttendanceDetail> = (args) => <AttendanceDetail {...args} />

export const ClockIn = Template.bind({})
ClockIn.args = { 
  label: 'Avg Clock In',
  time: '08:04am',
  colorClass: 'clock-in'
}

export const ClockOut = Template.bind({})
ClockOut.args = {
  label: 'Avg Clock Out', 
  time: '03:04pm',
  colorClass: 'clock-out'
}

export const AvgHours = Template.bind({})
AvgHours.args = {
  label: 'Avg Hours', 
  time: '05:48hrs',
  colorClass: 'avg-hours'
}