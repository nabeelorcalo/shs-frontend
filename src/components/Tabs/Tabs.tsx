import React from "react";
import type { TabsProps } from "antd";
import { Tabs, theme } from "antd";

const items = new Array(3).fill(null).map((_, i) => {
  const id = String(i + 1);
  return {
    label: `Tab ${id}`,
    key: id,
    children: `Content of Tab Pane ${id}`,
    style: i === 0 ? { height: 200 } : undefined,
  };
});

const AppTabs: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const renderTabBar: TabsProps["renderTabBar"] = (props, DefaultTabBar) => (
    <div className="">
      <DefaultTabBar {...props} style={{ background: colorBgContainer }} />
    </div>
  );
  return (
    <Tabs defaultActiveKey="1" renderTabBar={renderTabBar} items={items} />
  );
};

export default AppTabs;
