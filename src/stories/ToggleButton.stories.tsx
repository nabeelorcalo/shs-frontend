import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ToggleButton } from '../components';
import { CardViewIcon, TableViewIcon } from '../assets/images';

let isToggle = false;

export default {
  title: 'Components/Toggle Button',
  component: ToggleButton,
} as ComponentMeta<typeof ToggleButton>;

const Template: ComponentStory<typeof ToggleButton> = (args) => <ToggleButton {...args} />

export const Primary = Template.bind({})
Primary.args = { 
  isToggle: isToggle,
  onTogglerClick: () => {isToggle = !isToggle;},
  FirstIcon: {CardViewIcon},
  LastIcon: {TableViewIcon},
  className: 'w-[88px]'
}