import { Tabs } from "antd";
import "./style.scss";
interface TabProps {
  items: any;
  onChange?: any;
  activeTab?: any;
  setActiveTab?: any
}

export const AppTabs = (props: TabProps) => {
  const { items, onChange ,activeTab , setActiveTab} = props;

  return (
    <div>
      <Tabs
        size="large"
        defaultActiveKey="1"
        items={items}
        activeKey={activeTab}
        onChange={onChange}
      />
    </div>
  );
};

export default AppTabs;
