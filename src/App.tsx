import { Space, TabsProps } from "antd";
import { useState } from "react";
import { Button } from "./components";
import TimeTracking from "./components/timeTRacking/TimeTracking";

function App() {
  const [vartical, setVartical] = useState<any>(true)
  return (
    <div className="p-10">
      <Space>
        <TimeTracking type={vartical}/>
      </Space>
    </div>
  );
}

export default App;
