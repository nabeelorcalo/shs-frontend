import { ComponentStory } from '@storybook/react'
import { PopUpModal } from '../components/Model';
import { object } from 'prop-types';

export default {
  title: 'Components/PopupModal',
  componenet: PopUpModal
}

const okBtnFunc = ()=> {
  console.log("Modal submit button clicked")
}

const Template: ComponentStory<typeof PopUpModal> = (args) => <PopUpModal {...args} ><p>Write your JSX here / Import Components</p></PopUpModal>

export const CustomPopupModal = Template.bind({})
CustomPopupModal.args = {
  title: "Modal Title Customizable",
  width: 800,
  state: true,
  setState: {},
  cancelBtntxt: "Cancel",
  okBtntxt: "Submit",
  okBtnFunc: okBtnFunc,

}

