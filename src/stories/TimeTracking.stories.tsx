import { ComponentStory, ComponentMeta } from "@storybook/react";
import TimeTracking from "../components/timeTRacking/TimeTracking";

export default {
  title: "Components/TimeTracking",
  component: TimeTracking,
} as ComponentMeta<typeof TimeTracking>;

const Template: ComponentStory<typeof TimeTracking> = (args) => (
  <TimeTracking {...args} />
);

export const Vertical = Template.bind({});
Vertical.args = {
  type: true,
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  type: false,
};
