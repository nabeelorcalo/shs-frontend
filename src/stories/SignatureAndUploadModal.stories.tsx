import { ComponentStory } from '@storybook/react'
import MyProfileDocUpload from '../components/MyProfileDocUpload'
import UploadDocument from '../components/UploadDocument'
import SignatureAndUploadModal from '../components/SignatureAndUploadModal'
import { Button } from 'antd'

export default {
  title: 'Components/SignatureAndUploadModal',
  componenet: SignatureAndUploadModal
}

const okBtnFunc = () => {
  console.log("Signature Modal callback function is called on OK button")
}

const Template: ComponentStory<typeof SignatureAndUploadModal> = (args) => <SignatureAndUploadModal {...args} />

export const CustomModal = Template.bind({})
CustomModal.args = {
  title: "Signature",
  width: 500,
  state: true,
  setState: {},
  cancelBtntxt: "Cancel",
  okBtntxt: "Upload",
  okBtnFunc: okBtnFunc,
  footer: [
    <Button
      className='bg-[#fff] text-[#4A9D77] border-[#4A9D77]'
    >
      Cancel
    </Button>,
    <Button
      type='primary'
      className='bg-[#4A9D77] text-[#fff] border-[#4A9D77]'
    >Submit</Button>
  ]

}
