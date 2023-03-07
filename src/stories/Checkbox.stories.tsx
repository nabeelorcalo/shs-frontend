import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CheckBox } from '../components/Checkbox'

export default {
  title: 'Components/Checkbox',
  component: CheckBox,
} as ComponentMeta<typeof CheckBox>;

const Template: ComponentStory<typeof CheckBox> = (args) => <CheckBox {...args} />

export const Primary = Template.bind({})
Primary.args = { 
  label: 'checkbox',
  disabled: false,
  onChange: () => console.log("Change")
}

export const Disable = Template.bind({})
Disable.args = {
  label: 'I m disabled', 
  disabled: true,
}