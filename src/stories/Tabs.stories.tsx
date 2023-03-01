import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Tabs from "../components/Tabs/AppTabs";
import { TabsProps } from "antd";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: `Tabs1`,
    children: "Components1",
  },
  {
    key: "2",
    label: `Tabs2`,
    children: "Components2",
  },
  {
    key: "3",
    label: `Tabs3`,
    children: "Components3",
  },
];

export default {
  title: "Components/Tabs",
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const AppTabs = Template.bind({});
AppTabs.args = {
  item: items,
  onchange: () => console.log("change"),
};
