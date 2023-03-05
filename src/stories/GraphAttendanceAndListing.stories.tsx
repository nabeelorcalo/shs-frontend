import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import AttendanceAndListingGraph  from '../components/Graph/graphForAttendanceAndListings';

export default  {
  title: 'Components/Graph/AttendanceAndListing',
  component: AttendanceAndListingGraph,
} as ComponentMeta<typeof AttendanceAndListingGraph>;

const Template: ComponentStory<typeof AttendanceAndListingGraph> = (args) => <AttendanceAndListingGraph {...args} />

export const Attendance = Template.bind({})
Attendance.args = { 
  graphName: 'attendance',
}

export const Listings = Template.bind({})
Listings.args = {
  graphName: 'listings', 
}
