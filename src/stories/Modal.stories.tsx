import { Button, Modal } from 'antd';
import { ComponentStory } from '@storybook/react'
import { CloseCircleFilled } from '@ant-design/icons';
import { object } from 'prop-types';


export default {
    title: 'Components/Modal',
    componenet: Modal
}

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} ></Modal>

export const CustomModal = Template.bind({})
CustomModal.args = {
    open: false,
    title: 'Customizable Modal',
    width: 720,
    closeIcon: <CloseCircleFilled style={{color: "#A3AED0",fontSize: '20px'}} />,
    footer:[
        <Button key="Cancel" style={{ border: '1px solid #4a9d77', color:'#4a9d77', padding:'0px 20px' }}>
          Cancel
        </Button>,
        <Button key="submit" style={{ backgroundColor: '#4a9d77', color:'#fff', border: '1px solid #4a9d77', padding:'0px 20px'}}>
          Submit
        </Button>,
      ],
    
}

