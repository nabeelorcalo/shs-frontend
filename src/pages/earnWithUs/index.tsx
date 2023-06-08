import { useState, useEffect } from "react";
import {PageHeader} from "../../components/PageHeader";
import AppTabs from "../../components/Tabs";
import WithDrawalRequest from "./studentWithDrawalRequest";
import Dashboard from "./dashboard";
import DelegateMembers from "./delegateMembers";
import Withdrawals from "./withdrawals"
import "./style.scss";
import { earnWithUsTabsState } from "../../store";
import { useRecoilState } from "recoil";



const EarnWithUs = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const [tabKey, setTabKey] = useRecoilState(earnWithUsTabsState)
  const items = [
    {
      key: "earnWithUsDashboard",
      label: "Dashboard",
      children: <Dashboard />
    },
    {
      key: "earnWithUsMembers",
      label: "Delegate Members",
      children: <DelegateMembers />
    },
    {
      key: "earnWithUsWithdrawals",
      label: "Withdrawals",
      children: <Withdrawals />
    },
    {
      key: "earnWithUsWithdrawalsRequest",
      label: "Withdrawal Requests",
      children:<WithDrawalRequest/>
    }
  ]

  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    
  }, [])


  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleTabChange = (key:any) => {
    setTabKey(key)
  }


  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <div className="earn-with-us-container">
      <PageHeader title='Earn With Us' bordered={true} />
      <AppTabs items={ items} onChange={handleTabChange} />
    </div>
  )
}

export default EarnWithUs