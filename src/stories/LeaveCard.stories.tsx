import { ComponentStory, ComponentMeta } from '@storybook/react'
import { LeaveCard } from '../components'
import { DownloadOutlined } from '@ant-design/icons';


export default {
  title: 'Components/LeaveCard',
  component: LeaveCard,
  docs: {
    source: {
      type: 'code'
    }
  },
  argTypes: {
    // color: {
    //   control: { type: 'color' },
    // }
  }
} as ComponentMeta<typeof LeaveCard>

const Template: ComponentStory<typeof LeaveCard> = (args) => <LeaveCard {...args} />

export const Sick = Template.bind({})
Sick.args = { 
  title:"Sick",
  total : '27',
  pending :"0",
  approved:"0",
  declined:"0",
}
