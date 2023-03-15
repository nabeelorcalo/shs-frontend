import { Button } from 'antd';
import { ComponentStory } from '@storybook/react'
import { CloseCircleFilled } from '@ant-design/icons';
import { PopUpModal } from '../components/Model';
import { object } from 'prop-types';
import { useState } from 'react';




export default {
  title: 'Components/Modal',
  componenet: PopUpModal
}

const okBtnFunc = ()=> {
  console.log("Modal submit button clicked")
}

const Template: ComponentStory<typeof PopUpModal> = (args) => <PopUpModal {...args} ><p>Write your JSX here / Import Components</p></PopUpModal>

export const CustomModal = Template.bind({})
CustomModal.args = {
  title: "Modal Title Customizable",
  width: 800,
  state: true,
  setState: {},
  cancelBtntxt: "Cancel",
  okBtntxt: "Submit",
  okBtnFunc: okBtnFunc,

}

