import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AttendanceAndListingGraph, DropDown } from '../components';

const yourDropDwonOptions = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'Novemeber',
  'Decemebr'
];

const clickHandler = (event: any) => {
  alert('Change your state');
}

export default {
  title: 'Components/Graph/Attendance And Listing',
  component: AttendanceAndListingGraph,
} as ComponentMeta<typeof AttendanceAndListingGraph>;

const Template: ComponentStory<typeof AttendanceAndListingGraph> = (args) => <AttendanceAndListingGraph {...args} />

export const Attendance = Template.bind({})
Attendance.args = {
  graphName: 'attendance',
  title: "Graph Title",
  level: 3,
}

export const AttendanceGraphWithButton = Template.bind({})
Attendance.args = {
  graphName: 'attendance',
  title: "Graph With Button",
  level: 3,
  action: true,
  childrens: <DropDown
    name="Select"
    options={yourDropDwonOptions}
    setValue={() => clickHandler(event)}
    value={yourDropDwonOptions[0]}
  />
}

export const Listings = Template.bind({})
Listings.args = {
  graphName: 'listings',
  title: "Graph Title",
  level: 3,
}
