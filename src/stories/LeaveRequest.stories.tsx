
import { ComponentStory } from '@storybook/react'
import { CloseCircleFilled } from '@ant-design/icons';
import { object } from 'prop-types';
import LeaveRequest from '../components/LeaveRequest';

export default {
    title: 'Components/LeaveRequest',
    componenet: LeaveRequest
}

const Template: ComponentStory<typeof LeaveRequest> = (args) => <LeaveRequest {...args} ></LeaveRequest>

export const CustomModal = Template.bind({})
CustomModal.args = {
    title: 'Leave Request Model',
 
}
