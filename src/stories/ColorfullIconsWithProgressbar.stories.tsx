import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ColorfullIconsWithProgressbar } from "../components/ColorfullIconsWithProgressbar";
import icon from "../assets/images/ColorfullIconsProgressbar/media.svg";

const arraydata = [
  {
    icon: icon,
    progressbarColor: "red",
    progressbarValue: 50,
    storage: "128GB",
    title: "Media",
  },
  {
    icon: icon,
    progressbarColor: "yellow",
    progressbarValue: 50,
    storage: "128GB",
    title: "Media",
  },
];

export default {
  title: "Components/ColorfullIconsWithProgressbar",
  component: ColorfullIconsWithProgressbar,
} as ComponentMeta<typeof ColorfullIconsWithProgressbar>;

const Template: ComponentStory<typeof ColorfullIconsWithProgressbar> = (
  args
) => <ColorfullIconsWithProgressbar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  arraydata: arraydata,
};
