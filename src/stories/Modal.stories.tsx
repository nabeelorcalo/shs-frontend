import { Modal } from 'antd';
import { ComponentStory } from '@storybook/react'
import { CloseCircleFilled } from '@ant-design/icons';


export default {
    title: 'Components/Modal',
    componenet: Modal
}

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />

export const CustomModal = Template.bind({})
CustomModal.args = {
    open: false,
    title: 'Customizable Modal',
    width: 720,
    okText: 'Submit',
    cancelText: 'Cancel',
    closeIcon: <CloseCircleFilled />,
}

