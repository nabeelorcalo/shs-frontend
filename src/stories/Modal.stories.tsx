import { Button } from 'antd';
import { ComponentStory } from '@storybook/react'
import { PopUpModal } from '../components';

export default {
  title: 'Components/Modal',
  componenet: PopUpModal
}

const Template: ComponentStory<typeof PopUpModal> = (args) => <PopUpModal {...args} ><p>Write your JSX here / Import Components</p></PopUpModal>

export const ModalDefault = Template.bind({})
ModalDefault.args = {
  title: "Modal Title Customizable",
  width: 700,
  open: true, 
  close: () => console.log('set modal state to false'),
  footer: [<Button type='ghost'>Cancel</Button>, <Button type='primary'>Submit</Button>], 
  wrapClassName: 'modal-wrapper'
}

export const NoCloseButton = Template.bind({})
NoCloseButton.args = {
  title: "Modal Title Customizable",
  width: 700,
  open: true, 
  close: () => console.log('set modal state to false'),
  footer: [<Button type='ghost'>Cancel</Button>, <Button type='primary'>Submit</Button>], 
  wrapClassName: 'modal-wrapper',
  closable: false
}

export const NoTitle = Template.bind({})
NoTitle.args = {
  width: 700,
  open: true, 
  close: () => console.log('set modal state to false'),
  footer: [<Button type='ghost'>Cancel</Button>, <Button type='primary'>Submit</Button>], 
  wrapClassName: 'modal-wrapper',
  closable: false
}

export const NoFooter = Template.bind({})
NoFooter.args = {
  width: 700,
  open: true, 
  close: () => console.log('set modal state to false'),
  wrapClassName: 'modal-wrapper',
}

