import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Notifications } from '../components'

export default {
  title: 'Components/Notifications',
  component: Notifications,
} as ComponentMeta<typeof Notifications>;

const Template: ComponentStory<typeof Notifications> = (args) => <Notifications {...args} />

export const Primary = Template.bind({})
Primary.args = { 
  title:'Success',
  description:'List Downloaded',
  icon:''
}