import { Col, Divider, Row, Typography } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import AppTabs from "../../components/Tabs";
import Rewards from "./delegateAgentTabs/delegateReawards";
import WithDrawalRequest from "./delegateAgentTabs/delegateWithDrawlRequest";
import Dashboard from "./delegateAgentTabs/delelgatedashboard";
import "./style.scss";
import DelegateMain from './delegateAgentTabs/delegateMain';

const items = [
  {
      key: '1',
      label: "Dashboard",
      children:<Dashboard/>,
  },
  {
      key: '2',
      label: "Delegate Agents",
      children:<DelegateMain/>,
  },
  {
      key: '3',
      label: "Withdrawal Requests",
      children:<WithDrawalRequest/>,
  },
  {
      key: '4',
      label: "Rewards",
      children:<Rewards/>,
  },
]


const DelegateAgent = () => {
  return (
    <div className="delegate-agent">
 <Row>
    <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
        <Typography className="main-title">Delegate Agent</Typography>
    </Col>
    <Divider/>
    <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
    <AppTabs items={items} />
    </Col>
</Row>
    </div>
   
  )
}

export default DelegateAgent