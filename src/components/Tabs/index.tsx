import { UpCircleOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import React from "react";
import "./Tabs.scss";

interface TabProps {
  items: any;
  onChange?: any;
}

const AppTabs = (props: TabProps) => {
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
