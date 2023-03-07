import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
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
  title: "Add Event",
  zoomVideoLink: "https://zoom.com/call/0234",
  open: true,
  
 
};
