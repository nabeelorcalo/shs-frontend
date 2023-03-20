import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { IconButton } from '../components';
import { DownloadIconWithBg } from '../assets/images';

export default {
  title: 'Components/Icon Button',
  component: IconButton,
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = (args) => <IconButton {...args} />

export const Primary = Template.bind({})
Primary.args = {
  icon: <DownloadIconWithBg />,
  className: 'icon-btn',
  onClick: () =>console.log("Btn click"),
}
