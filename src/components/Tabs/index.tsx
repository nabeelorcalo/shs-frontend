import { UpCircleOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import "./style.scss";

interface TabProps {
  items: any;
}

const AppTabs = (props: TabProps) => {
  const { items } = props;

  return (
    <div>
      <Tabs size="large" defaultActiveKey="1" items={items} />
    </div>
  );
};

export default AppTabs;
