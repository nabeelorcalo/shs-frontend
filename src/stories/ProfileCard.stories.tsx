import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ProfileCard } from '../components';

export default {
  title: 'Components/Profile Card',
  component: ProfileCard,
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />

export const Primary = Template.bind({})
Primary.args = {
  name: "Mino Marina",
  profession: "Data Researcher",
  email: "minomarina@gmail.com",
  phone: "+44 7700 900077",
  address: "263 Eversholt St, London NW11NB, UK",
  avatar: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
}