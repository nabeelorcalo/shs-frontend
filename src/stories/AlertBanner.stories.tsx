import { Button } from 'antd';
import AlertBanner from '../components/AlertBanner';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/AlertBanner',
  component: AlertBanner,
} as ComponentMeta<typeof AlertBanner>

const Template: ComponentStory<typeof AlertBanner> = (args) => <AlertBanner {...args} />


export const AlertInfo = Template.bind({})
AlertInfo.args = {
  className: 'className',
  message: 'Any demo message here',
  type: 'info',
  showIcon: true,
  closable: true,
  actions: <Button>More</Button>,
  hasAction: true

}
export const AlertError = Template.bind({})
AlertError.args = {
  className: 'className',
  message: 'Any demo message here',
  type: 'error',
  showIcon: true,
  closable: true,
  actions: <Button>More</Button>,
  hasAction: true

}
export const AlertSuccess = Template.bind({})
AlertSuccess.args = {
  className: 'className',
  message: 'Any demo message here',
  type: 'success',
  showIcon: true,
  closable: true,
  actions: <Button>More</Button>,
  hasAction: true

}
export const AlertWarning = Template.bind({})
AlertWarning.args = {
  className: 'className',
  message: 'Any demo message here',
  type: 'warning',
  showIcon: true,
  closable: true,
  actions: <Button>More</Button>,
  hasAction: true

}