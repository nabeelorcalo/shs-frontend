import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ColorfullIconsWithProgressbar } from "../components/ColorfullIconsWithProgressbar";
import icon from "../assets/images/AddEventInCalendar/icon.svg";

export default {
  title: "Components/ColorfullIconsWithProgressbar",
  component: ColorfullIconsWithProgressbar,
} as ComponentMeta<typeof ColorfullIconsWithProgressbar>;

const Template: ComponentStory<typeof ColorfullIconsWithProgressbar> = (
  args
) => <ColorfullIconsWithProgressbar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: "Media",
  storage: "128GB",
  icon: icon,
  progressbarValue: 50,
  progressbarColor: "red",
};
