import { Col, Divider, Row, Typography } from "antd";
import { useState } from "react";
import AppTabs from "../../components/Tabs";
import Rewards from "./delegateAgentTabs/delegateReawards";
import WithDrawalRequest from "./delegateAgentTabs/delegateWithDrawlRequest";
import Dashboard from "./delegateAgentTabs/delelgatedashboard";
import DelegateMain from "./delegateAgentTabs/delegateMain";
import "./style.scss";
import { PageHeader } from "../../components";

const items = [
  {
    key: "1",
    label: "Dashboard",
    children: <Dashboard />,
  },
  {
    key: "2",
    label: "Delegate Agents",
    children: <DelegateMain />,
  },
  {
    key: "3",
    label: "Withdrawal Requests",
    children: <WithDrawalRequest />,
  },
  {
    key: "4",
    label: "Rewards",
    children: <Rewards />,
  },
];

const DelegateAgent = () => {
  const [currentKey, setCurrentKey] = useState("1");

  const onTabChange = (key: string) => {
    setCurrentKey(key);
  };

  return (
    <div className="delegate-agent">
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div>
            {
              currentKey === "1" ? <PageHeader title='Delegate Agent' bordered={true} />
                :
                <PageHeader title="Agent Management" bordered={true} />
            }
          </div>
        </Col>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <AppTabs items={items} onChange={onTabChange} />
        </Col>
      </Row>
    </div>
  );
};

export default DelegateAgent;
