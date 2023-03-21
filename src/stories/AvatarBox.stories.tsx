import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AvatarBox } from '../components';

export default {
  title: 'Components/Avatar Box',
  component: AvatarBox,
} as ComponentMeta<typeof AvatarBox>;

const Template: ComponentStory<typeof AvatarBox> = (args) => <AvatarBox {...args} />

export const WithLabel = Template.bind({})
WithLabel.args = { 
  label: 'Label Name',
  name: "Mino Marina",
  size: 24,
  avatar: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
}

export const WithOutLabel = Template.bind({})
WithLabel.args = { 
  name: "Mino Marina",
  size: 24,
  avatar: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
}