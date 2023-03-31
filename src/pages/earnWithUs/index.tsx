import { useState } from "react";
import {PageHeader} from "../../components/PageHeader";
import AppTabs from "../../components/Tabs";
import WithDrawalRequest from "./studentWithDrawalRequest";
import Dashboard from "./dashboard";
import DelegateMembers from "./delegateMembers";
import Withdrawals from "./withdrawals"
import "./style.scss";


const items = [
  {
    key: "1",
    label: "Dashboard",
    children: <Dashboard />
  },
  {
    key: "2",
    label: "Delegate Members ",
    children: <DelegateMembers />
  },
  {
    key: "3",
    label: "Withdrawals",
    children: <Withdrawals />
  },
  {
    key: "4",
    label: "Withdrawal Requests",
    children:<WithDrawalRequest/>
  }
]

const EarnWithUs = () => {
  return (
    <div className="earn-with-us-container">
      <PageHeader title='Earn With Us' bordered={true} />
      <AppTabs items={ items} />
    </div>
  )
}

export default EarnWithUs