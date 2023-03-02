import { Tabs } from "antd";
import React from "react";
import "./Tabs.scss";

interface TabProps {
  items: any;
}

const AppTabs = (props: TabProps) => {
  const { items } = props;

  return (
    <div>
      <Tabs
        size="large"
        defaultActiveKey="1"
        items={items}
      />
    </div>
  );
};

export default AppTabs;
