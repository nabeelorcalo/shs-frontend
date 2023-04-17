import { BoxWrapper } from "../../components";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Components/charts/BoxWrapper",
  component: BoxWrapper,
} as ComponentMeta<typeof BoxWrapper>;

const Template: ComponentStory<typeof BoxWrapper> = (args) => (
  <BoxWrapper {...args} />
);

export const BoxWrapperData = Template.bind({});

BoxWrapperData.args = {
  className: "",
};
