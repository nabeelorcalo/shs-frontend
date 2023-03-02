import { Space, TabsProps } from "antd";
import { useState } from "react";
import { Button } from "./components";
import AppTabs from "./components/Tabs";
import TimeTracking from "./components/TimeTracking";

function App() {
  const [vartical, setVartical] = useState<any>(true);
  const [varticales, setVarticales] = useState<any>(false);

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

  return (
    <div className="p-10">
      <Space>
        <TimeTracking vartical={vartical} />
        <TimeTracking vartical={varticales} />
        <AppTabs items={items} />
      </Space>
    </div>
  );
}

export default App;
