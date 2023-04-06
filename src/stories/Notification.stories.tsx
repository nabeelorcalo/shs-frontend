import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Notifications } from '../components'

export default {
  title: 'Components/Notifications',
  component: Notifications,
} as ComponentMeta<typeof Notifications>;

const Template: ComponentStory<typeof Notifications> = (args) => <Notifications {...args} />

export const Success = Template.bind({})
Success.args = {
  type:'success',
  title:'Success',
  description:'List Downloaded',
}

export const Warning = Template.bind({})
Warning.args = {
  type:'warning',
  title:'Warning',
  description:'List Downloaded',
}

export const Info = Template.bind({})
Info.args = {
  type:'info',
  title:'Info',
  description:'List Downloaded',
}

export const Error = Template.bind({})
Error.args = {
  type:'error',
  title:'Error',
  description:'List Downloaded',
}