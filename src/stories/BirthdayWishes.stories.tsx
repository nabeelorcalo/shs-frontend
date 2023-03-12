import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { BirthdayWishes } from '../components';

export default {
  title: 'Components/Birthday Wishes',
  component: BirthdayWishes,
} as ComponentMeta<typeof BirthdayWishes>;

const Template: ComponentStory<typeof BirthdayWishes> = (args) => <BirthdayWishes {...args} />

export const Primary = Template.bind({})
Primary.args = { 
  wishList: [
    {id: 1, name: "Jennie Duncan", date: "Jennie Duncan", avatar: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png"},
    {id: 2, name: "Duncan", date: "Jennie Duncan", avatar: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png"},
    {id: 3, name: "Jennien", date: "Jennie Duncan", avatar: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png"},
  ],
}