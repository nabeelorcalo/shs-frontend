import { useState } from "react";
import { Outlet } from "react-router-dom";
import WithDrawalRequest from "./delegateAgentWithdrawal/withDrawalRequest";
import "./style.scss";

const WithdrawalRequest = () => {
  return (
    <p><WithDrawalRequest/></p>
  )
}

export default WithdrawalRequest