import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AttendanceListViewCard } from '../components';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES_CONSTANTS } from '../config/constants';

//  Dummy Data
const dummyData = [
  { id: 1, name: 'Mino Marina', avatar: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png', profession: 'Data Researcher', status: 'present' },
  { id: 2, name: 'Mino Marina', avatar: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png', profession: 'Designer', status: 'leave' },
  { id: 3, name: 'Mino Marina', avatar: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png', profession: 'Business Analyst', status: 'present' },
];

// Menu items
const menu = (
  <Menu>
    <Menu.Item>
      <Link
        to={`${ROUTES_CONSTANTS.DETAIL}`}
      // className="attendance-detail-btn"
      >
        View Details
      </Link>
    </Menu.Item>
  </Menu>
);

export default {
  title: 'Components/List View - Attendance Card Detail',
  component: AttendanceListViewCard,
} as ComponentMeta<typeof AttendanceListViewCard>;

const Template: ComponentStory<typeof AttendanceListViewCard> = (args) => <AttendanceListViewCard {...args} />

export const Primary = Template.bind({})
Primary.args = { 
  index: 1,
  item: dummyData[0], // Using only one item for a story
  menu: menu
}