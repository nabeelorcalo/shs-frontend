import UserSelector from '../components/UserSelector';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { UserAvatar } from '../assets/images';

export default {
  title: 'Components/UserSelector',
  component: UserSelector,
} as ComponentMeta<typeof UserSelector>

const Template: ComponentStory<typeof UserSelector> = (args) => <UserSelector {...args} />


export const SimpleSelect = Template.bind({})
SimpleSelect.args = {
  className: 'className',
  label: 'label',
  value: 'value',
  setState: 'setState({})',
  options: [{ value: 1, label: '1' }, { value: 2, label: '2' }],
  placeholder: 'placeholder',
  onChange: () => { },
}

export const AvatarSelect = Template.bind({})
AvatarSelect.args = {
  className: 'className',
  label: 'label',
  value: 'value',
  setState: 'setState({})',
  options: [{ value: 1, label: '1', avatar: <UserAvatar /> }, { value: 2, label: '2', avatar: <UserAvatar /> }],
  placeholder: 'placeholder',
  onChange: () => { },
}

export const AvatarSearchSelect = Template.bind({})
AvatarSearchSelect.args = {
  className: 'className',
  label: 'label',
  value: 'value',
  setState: 'setState({})',
  options: [{ value: 1, label: '1', avatar: <UserAvatar /> }, { value: 2, label: '2', avatar: <UserAvatar /> }],
  placeholder: 'placeholder',
  onChange: () => { },
  handleSearch: '',
  hasSearch: true
}

