import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "../components";
import { DownloadOutlined } from "@ant-design/icons";

export default {
  title: "Components/Button",
  component: Button,
  docs: {
    source: {
      type: "code",
    },
  },
  argTypes: {
    color: {
      control: { type: "color" },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  type: "primary",
  label: "Button",
  block: false,
  loading: false,
  disabled: false,
};

export const Icon = Template.bind({});
Icon.args = {
  icon: <DownloadOutlined />,
  type: "primary",
  shape: "circle",
  block: false,
  loading: false,
  disabled: false,
};

export const IconText = Template.bind({});
IconText.args = {
  label: "Click Me",
  icon: <DownloadOutlined />,
  type: "primary",
  block: false,
  loading: false,
  disabled: false,
};

export const Pill = Template.bind({});
Pill.args = {
  type: "primary",
  label: "Button",
  shape: "round",
  block: false,
  loading: false,
  disabled: false,
};
