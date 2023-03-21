import { ComponentStory, ComponentMeta } from '@storybook/react'
import { TextArea } from '../components';

export default {
  title: 'Components/TextArea',
  component: TextArea,
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => <TextArea {...args} />

export const Enabled = Template.bind({})
Enabled.args = {
  rows: 4,
  defaultValue: 'Hello world',
}

export const Disable = Template.bind({})
Disable.args = {
  rows: 4,
  defaultValue: 'I m disabled, disablity is not working in storybook. But works in your page file',
  disable: true,
  className: 'light-blue-bg-color'
}


