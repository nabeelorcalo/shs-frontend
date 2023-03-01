import { Space, TabsProps } from "antd";
import { Button } from "./components";
import DashboardTimeTracking from "./components/DashboardTimeTracking/DashboardTimeTracking";
import AppTabs from "./components/Tabs/AppTabs";

import TimeTracking from "./components/timeTRacking/TimeTracking";

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

function App() {
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <div className="p-10">
      <Space>
        {/* <Button type="dashed" label="new" />
        <Button type="primary" label="stuff" /> */}
        <TimeTracking />
        <DashboardTimeTracking />
        <AppTabs onChange={onChange} items={items} />
      </Space>
    </div>
  );
}

export default App;
