import { Button } from 'antd';
import { ComponentStory } from '@storybook/react'
import { CloseCircleFilled } from '@ant-design/icons';
import { PopUpModal } from '../components/Model';
import { object } from 'prop-types';


export default {
  title: 'Components/Modal',
  componenet: PopUpModal
}

const Template: ComponentStory<typeof PopUpModal> = (args) => <PopUpModal {...args} ><p>Write your JSX here / Import Components</p></PopUpModal>

export const CustomModal = Template.bind({})
CustomModal.args = {
  title: "Modal Title Customizable",
  width: 800,
  showHide: true,
  cancelBtntxt: "Cancel",
  okBtntxt: "Submit"

}

