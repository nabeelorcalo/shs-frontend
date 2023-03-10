import { ComponentStory } from '@storybook/react'
import MyProfileDocUpload from '../components/MyProfileDocUpload'
import UploadDocument from '../components/UploadDocument'

export default {
  title: 'Components/UploadFiles',
  componenet: MyProfileDocUpload
}

const Template: ComponentStory<typeof MyProfileDocUpload> = (args) => <MyProfileDocUpload {...args} ><UploadDocument /></MyProfileDocUpload>

export const CustomModal = Template.bind({})
CustomModal.args = {
  title: "Modal Title Customizablehgsa fa",
  width: 800,
  showHide: true,
  cancelBtntxt: "Cancel",
  okBtntxt: "Submit"

}
