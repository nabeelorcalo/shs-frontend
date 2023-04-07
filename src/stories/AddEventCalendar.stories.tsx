import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import { Button, Modal } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import { AddEventInCalendar } from "../components/AddEventInCalendar";
export default {
  title: "Components/AddEventInCalendar",
  component: AddEventInCalendar,
} as ComponentMeta<typeof AddEventInCalendar>;

const Template: ComponentStory<typeof AddEventInCalendar> = (args) => (
  <AddEventInCalendar {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  open: false,
  title: 'Add Event',
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

  
 
};
