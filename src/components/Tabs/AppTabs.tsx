import { Tabs, TabsProps } from "antd";
import React from "react";
import "./Tabs.scss";

const AppTabs = (props: any) => {
  const { items, onChange } = props;

  console.log("---=-=-=-=", items);

  // const onChange = (key: string) => {
  //   console.log(key);
  // };

  // const items: TabsProps["items"] = [
  //   {
  //     key: "1",
  //     label: `Tabs1`,
  //     children: "Components1",
  //   },
  //   {
  //     key: "2",
  //     label: `Tabs2`,
  //     children: "Components2",
  //   },
  //   {
  //     key: "3",
  //     label: `Tabs3`,
  //     children: "Components3",
  //   },
  // ];
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
