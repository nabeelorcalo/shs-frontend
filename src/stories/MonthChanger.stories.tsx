import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { MonthChanger } from '../components'

export default {
  title: 'Components/Month Changer',
  component: MonthChanger,
} as ComponentMeta<typeof MonthChanger>;

const Template: ComponentStory<typeof MonthChanger> = (args) => <MonthChanger {...args} />

export const Primary = Template.bind({})
Primary.args = { 
  month: 'Mar',
  onClick: () => console.log("Month Change")
}