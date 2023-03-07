import { ComponentStory, ComponentMeta } from "@storybook/react";
import { HorizonalLineCard } from "../components/HorizontalLineCard";
import icon from "../assets/images/AddEventInCalendar/icon.svg";
const arraydata = [
  {
    icon: icon,
    progressbarColor: "red",
    progressbarValue: 50,
    storage: "128GB",
    title: "Main Goal",
    content: "10 of 10 tasks completed",
    subTitle: "Create Balance in Life",
  },
  {
    icon: icon,
    progressbarColor: "green",
    progressbarValue: 50,
    storage: "128GB",
    title: "Last Achievement",
    content: "10 of 10 tasks completed",
    subTitle: "Create Balance in Life",
  },
];

export default {
  title: "Components/HorizonalLineCard",
  component: HorizonalLineCard,
} as ComponentMeta<typeof HorizonalLineCard>;

const Template: ComponentStory<typeof HorizonalLineCard> = (args) => (
  <HorizonalLineCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  arraydata: arraydata,
};
