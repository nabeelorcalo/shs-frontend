import { Tabs, TabsProps } from "antd";
import React from "react";
import "./Tabs.scss";

const AppTabs = (props: any) => {
  const { items, onChange } = props;

  return (
    <div>
      <Tabs
        size="large"
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
    </div>
  );
};

export default AppTabs;
