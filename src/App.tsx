import { Space } from "antd";
import { Button } from "./components";
import DashboardTimeTracking from "./components/DashboardTimeTracking/DashboardTimeTracking";
import AppTabs from "./components/Tabs/Tabs";
import TimeTracking from "./components/timeTRacking/TimeTracking";

function App() {
  return (
    <div className="p-10">
      <Space>
        {/* <Button type="dashed" label="new" />
        <Button type="primary" label="stuff" /> */}
        {/* <TimeTracking />
        <DashboardTimeTracking /> */}
        <AppTabs />
      </Space>
    </div>
  );
}

export default App;
