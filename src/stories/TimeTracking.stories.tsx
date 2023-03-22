import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TimeTracking } from "../components";

export default {
  title: "Components/TimeTracking",
  component: TimeTracking,
} as ComponentMeta<typeof TimeTracking>;

const Template: ComponentStory<typeof TimeTracking> = (args) => (
  <TimeTracking {...args} />
);

export const Vertical = Template.bind({});
Vertical.args = {
  vartical: true,
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  vartical: false,
};
