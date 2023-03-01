import { ComponentStory, ComponentMeta } from "@storybook/react";
import { HorizonalLineCard } from "../components/HorizontalLineCard";
import icon from "../assets/images/AddEventInCalendar/icon.svg";

export default {
  title: "Components/HorizonalLineCard",
  component: HorizonalLineCard,
} as ComponentMeta<typeof HorizonalLineCard>;

const Template: ComponentStory<typeof HorizonalLineCard> = (
  args
) => <HorizonalLineCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: "Media",
  content: "128GB",
  icon: icon,
  progressbarValue: 50,
  progressbarColor: "red",
  subTitle:"Create Balance in Life"
};
