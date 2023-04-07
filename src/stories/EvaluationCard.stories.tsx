import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { EvaluationCard } from '../components'

export default {
  title: 'Components/Evaluation Card',
  component: EvaluationCard,
} as ComponentMeta<typeof EvaluationCard>;

const Template: ComponentStory<typeof EvaluationCard> = (args) => <EvaluationCard {...args} />

export const Primary = Template.bind({})
Primary.args = { 
  name: 'Calvin Grayson',
  profession: 'Manager',
  avatar: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png'
}